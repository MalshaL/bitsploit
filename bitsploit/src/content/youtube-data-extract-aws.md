---
title: Extract and load YouTube data in S3 using AWS Lambda
date: 2024-12-11
path: /get-youtube-data-aws
excerpt: In this post, we load YouTube data into Amazon S3 using AWS Lambda.
image: https://github.com/user-attachments/assets/05e115e6-d836-4d8e-b8d6-887f5735bb6b
tags: 
    - Project
    - AWS
    - ETL
    - AWS Lambda
---

<img style="max-width: 50%; display: block; margin-left: auto; margin-right: auto" 
alt="1" src="https://github.com/user-attachments/assets/05e115e6-d836-4d8e-b8d6-887f5735bb6b"/>

In this post, let's build a project to use AWS Lambda functions to load data from YouTube, and store it in an S3 bucket.

This project can be found on [GitHub](https://github.com/MalshaL/youtube-data-analysis/tree/master) as well.

To make the project more interesting, let's define the problem we're trying to solve using YouTube data.

What are the key factors that influence video engagement (likes, comments, and shares) and audience retention (watch time and drop-off rates) on YouTube, and how can creators optimize their content to maximize these metrics?

The overall architecture of the solution we'll implement is outlined below.
In this post, we'll work on the first part of extracting raw data in to the S3 bucket.

![1-1](https://github.com/user-attachments/assets/62e136c7-0849-4efc-a885-8e37b365fa84)

It's worthwhile to have some idea about why we've chosen AWS Lambda and S3 among the many services available on the AWS platform.
Being serverless, Lambda functions are easy to build and deploy. Therefore, it's more suitable for a relatively shorter script to run as the one for getting and storing data. It also falls within the [15 minute maximum timeout value](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html#:~:text=maximum%20value%20of%20900%20seconds%20(15%20minutes).) for Lambda functions.

We're using an S3 bucket to store the raw data as it supports open data formats, and is scalable, durable, and cost-effective.


### 1. Getting started with YouTube API

The first step is to start using the YouTube API to get the data we are looking for using Python.

YouTube has a helpful [guide](https://developers.google.com/youtube/v3/getting-started) on getting started with the API. 

Create a new project in [Google Developers Console](https://console.developers.google.com/). Name the project, I've called it as `youtube-etl`.

![aws-yt-2](https://github.com/user-attachments/assets/66cae20e-af56-469a-918e-ca404e204468)

Create credentials for the project. Because we're not using private data, we're choosing to create an API key.

![aws-yt-3](https://github.com/user-attachments/assets/d1189edb-0d2b-46be-9f40-279ad1901d4e)

Head to API Console to enable the YouTube API.

![aws-yt-4](https://github.com/user-attachments/assets/5a3c0695-5776-484a-b7eb-d51a8737ee2f)

Enable the `YouTube Data API v3` for the project.

![aws-yt-5](https://github.com/user-attachments/assets/93ed2887-6bd1-4016-9fc6-8b7d3ca61b80)

It should now appear in the list of enabled APIs.

<img style="max-width: 50%; display: block; margin-left: auto; margin-right: auto" 
alt="6" src="https://github.com/user-attachments/assets/5959ffe2-e421-4ef5-b7aa-e9c009eda45b"/>

Back in the Credentials page, restrict the API key we created to only use the YouTube API.

<img style="max-width: 40%; display: block; margin-left: auto; margin-right: auto" 
alt="7" src="https://github.com/user-attachments/assets/a4c6e413-bd42-41a1-94be-634f094a7666"/>

YouTube API has a daily limit of 10000 quota units. You can see this limit on Enabled APIs and Services > Youtube Data API -> Quotas and system limits.

![aws-yt-8](https://github.com/user-attachments/assets/22dcae03-803b-454e-a2d4-7cf96d37941c)

###### *Data Model for the dashboard*

The [API Reference](https://developers.google.com/youtube/v3/docs/videos/list) has the quota used for each request.

![aws-yt-9](https://github.com/user-attachments/assets/263491e9-5b87-40e9-8de6-19fe38f556e8)

### 2. Using the YouTube API

Before using the API, there're a few terms to get to know in order to use the API effectively.

When an API request is sent, a list of items are returned. These items are referred to as `resources`.
Each resource has groups of properties which are known as `parts`. See the list of parts available for `video` resource [here](https://developers.google.com/youtube/v3/getting-started#partial).
Each part contains a set of properties known as `fields`.

When building your API request, you'll need to specify the `part` and `field` parameters, so that the response can be filtered. This helps to reduce latency with the request, and saves you from processing many properties which may not be used in your project.

Let's try using `curl` to send a simple request to get the video categories.
The YouTube API has a [`videoCategories:List`](https://developers.google.com/youtube/v3/docs/videoCategories/list) endpoint. 

You can use the API Explorer in the same page to help build your `curl` request. Click to view it in full screen mode.

![aws-yt-10](https://github.com/user-attachments/assets/0d21a30a-af5f-4d6e-b86b-1d4509d3bae9)

Use `snippet` for the `part` parameter and `US` as the region code. The API has different region codes for different countries, and we'll have a look based on `US` in this example.

![aws-yt-11](https://github.com/user-attachments/assets/3a7972cc-dcf5-4dc9-9652-977741ac85c0)

Run the curl command with your API Key in a terminal. You can remove the line for the access token as we aren't using any.

```
curl -X GET 'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=YOUR_API_KEY' --header 'Accept: application/json' 
```

The response will contain a list of video categories in list format.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="12" src="https://github.com/user-attachments/assets/2e9386e1-311d-4343-a9d0-087beefaa2f6"/>

### 3. Using the YouTube API to get data for the project

As we now have some idea about using the API, let's try to build the request for the data we want for this project. 

The project aims to track the daily growth rate and audience engagement of popular travel videos, while identifying trending content. To achieve this, we'll focus on gathering popular travel videos published within the last 24 hours. To limit the scope, we'll focus on videos based on traveling in Japan.

The YouTube API has a [search endpoint](https://developers.google.com/youtube/v3/docs/search/list) which allows us to get a list of videos. It's worth noting that one search request will cost 100 quota units.

```
curl -X GET \
'https://www.googleapis.com/youtube/v3/search?part=snippet&q=japan+travel&type=video&maxResults=50&publishedAfter=2024-12-11T00:00:00Z&publishedBefore=2024-12-12T00:00:00Z&order=viewCount&topic_id=/m/07bxq&videoDuration=medium&key=YOUR_API_KEY'
```

Let's have a look at the parameters in the request.
The `part` parameter is set to return the `snippet` which will contain the video id.
The `q` parameter allows querying for travel videos.
As we want the videos published in the last 24 hours, the `publishedAfter` is set to the day before, and the `publishedBefore` to the next day, to limit the response to 24 hours.
As we're looking for the most popular videos, we're ordering the result by `viewCount`.
The topic Id helps to filter results to travel topic. Topic Ids are defined [here](https://developers.google.com/youtube/v3/docs/search/list#:~:text=See%20topic%20IDs%20supported%20as%20of%20February%2015%2C%202017).
The `videoDuration` parameter has 4 possible values - short (<4 minutes), medium (between 4 and 20 minutes), long (>20 minutes) and any (default value). We'll execute two requests with `medium` and `long` values to exclude shorts content on YouTube. 

The response contains a list of videos with their ids and other metadata.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="13" src="https://github.com/user-attachments/assets/4b64682a-ed4d-405c-8f42-d13b88ca9e7c"/>

### 4. Use Python to build the API request

Now, let's use Python to build the above request. 

I've created a simple Python project in PyCharm, but you can use Jupyter Notebook as well.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="14" src="https://github.com/user-attachments/assets/010e8521-0041-4391-8f08-50426dc3745f"/>

Log in / Sign up to AWS Cloud Console. If you're creating a new account, you'll be able to use the free tier services.

<img style="max-width: 25%; display: block; margin-left: auto; margin-right: auto" 
alt="15" src="https://github.com/user-attachments/assets/b6bf975c-00e4-4eb0-af56-0cd24cede5a1"/>

In the AWS Console, search of Lambda service and click on `Create a Function`.
Add a function name and set the Runtime option to use Python. In addition to the function, an IAM role will be created with permission to write logs to the Amazon CloudWatch.

<img style="max-width: 50%; display: block; margin-left: auto; margin-right: auto" 
alt="16" src="https://github.com/user-attachments/assets/f8ff2fb7-1c7b-4741-ac63-ef17ce387514"/>

When you create the function, you'll see the code editor window where you can put in your code for the Lambda function. In the Runtime Settings section has the handler function defined as `lambda_function.lambda_handler`, which will be executed when the function is run.

![aws-yt-17](https://github.com/user-attachments/assets/0a5802ab-5601-411a-a949-56a041a94c9b)

Let's try running the sample function defined. Head to the `Test` tab and click on Test button to execute the function.
The function will execute and create CloudWatch logs. Expand to view the output and logs.

![aws-yt-18](https://github.com/user-attachments/assets/caea34a7-e9ae-4189-9994-2e1648eae0fc)

Let's head back to the IDE/Jupyter notebook and write the Python code to call the API.

``` python
import os
import json
from googleapiclient.discovery import build


def lambda_handler(event, context):
    # get the API key from Lambda environment variables
    youtube_api_key = os.environ['YOUTUBE_API_KEY']

    # define api variables
    api_name = 'youtube'
    api_version = 'v3'

    # initialise the API client
    youtube = build(api_name, api_version, developerKey=youtube_api_key)

    # execute search request for 50 videos with the highest view count
    search_response = youtube.search().list(
        part='id',
        q='japan + travel',
        type='video',
        maxResults=50,
        publishedAfter='2024-12-11T00:00:00Z',
        publishedBefore='2024-12-12T00:00:00Z',
        order='viewCount',
        topicId='/m/07bxq',
        videoDuration='medium'
    ).execute()

    # get video ids
    video_ids = [item['id']['videoId'] for item in search_response.get('items', [])]

    # get data for each video
    video_data_response = youtube.videos().list(
        part='snippet,content_details,statistics',
        id=','.join(video_ids)
    ).execute()

    # extract video data
    videos = []
    for item in video_data_response.get('items', []):
        # get() function allows a fallback value in case the element is not found in the video_data_response
        snippet = item.get('snippet', {})
        content_details = item.get('contentDetails', {})
        statistics = item.get('statistics', {})

        video = {
            "id": item.get('id', ''),
            "title": snippet.get('title', ''),
            "description": snippet.get('description', ''),
            "publishedAt": snippet.get('publishedAt'),
            "channelId": snippet.get('channelId', ''),
            "channelTitle": snippet.get('channelTitle', ''),
            "videoCategoryId": snippet.get('categoryId', 0),
            "tags": snippet.get('tags', []),
            "videoDuration": content_details.get('duration', ''),
            "videoDefinition": content_details.get('definition', ''),
            "initialViewCount": statistics.get('viewCount', '0'),
            "initialLikeCount": statistics.get('likeCount', '0'),
            "initialFavoriteCount": statistics.get('favoriteCount', '0'),
            "initialCommentCount": statistics.get('commentCount', '0'),
            "collectionDate": search_date
        }
        videos.append(video)

    # return list
    return {
        'statusCode': 200,
        'body': json.dumps(videos)
    }

```

Replace the code in Lambda function with the above.

Head to 'Environment Variables' in the 'Configuration' section and add a new variable to store the API key.

![aws-yt-19](https://github.com/user-attachments/assets/b7c1e7e0-dbed-43c3-9730-8c2fdc9d6d7a)

Since AWS Lambda doesn't include `googleapicleint` by default, we need to run the below command in local python environment to package it into a folder, zip and upload it in the Lambda environment. 

We'll use Lambda Layers to package this library separately from our code. Using layers allow the package to be used across multiple Lambda functions as well.
Note that all packages in a Lambda layer need to reside inside a `python` folder.

``` bash
mkdir -p layer/python
pip install google-api-python-client -t layer/python
cd layer
zip -r googleapiclient_layer.zip python
```

Go towards the bottom of the page and add a new Layer. Select 'Create a new layer'.

![aws-yt-20](https://github.com/user-attachments/assets/ee23f2cd-72ed-4a0e-abde-9e5699b0d934)

Add a layer name such as `googleapiclient`, choose the Python runtime, and upload the zip file created in the above steps.

Back in the Lambda function page, go towards the end and select 'Add a layer' again. Select the Layer we created to attach it to the function.

![aws-yt-21](https://github.com/user-attachments/assets/09a7d5ad-97d2-4340-bd2d-1a179f651813)

Now let's create a test event so that the function can be executed for testing.
Head to 'Test' tab and create a test event with an empty json input.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="22" src="https://github.com/user-attachments/assets/0fe0fcf8-5da7-4c5a-9670-53e61f10a442"/>

Back in the 'Code' tab, deploy the code, and run the test.

<img style="max-width: 50%; display: block; margin-left: auto; margin-right: auto" 
alt="23" src="https://github.com/user-attachments/assets/7a7cdaae-a103-4223-aa5c-9ae0f8e381e0"/>

The output will be displayed in the window.

![aws-yt-24](https://github.com/user-attachments/assets/cf1ec7da-3e96-434a-bdf4-7794fa3a0fbd)

### 5. Store the raw data in S3

Head to S3 in the AWS Console and create a new S3 bucket to store data.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="25" src="https://github.com/user-attachments/assets/6e974aad-060e-41ec-9401-be08d5e52f40"/>

In the Python code in the Lambda function, replace the json output with the below.
We're using partitions to store the data in S3 to make data reads more efficient. In this instance, we're using the `collection_date` to partition the 
data into separate folders. S3 will create folders as `collection_date=date` so that each file can be easily queried.

``` python
    # add new imports
    import os
    from io import BytesIO
    import pyarrow as pa
    import pyarrow.parquet as pq
    import boto3
    from datetime import datetime
    from zoneinfo import ZoneInfo
    from googleapiclient.discovery import build

    # ------------------------------------------

    # get column names 
    columns = videos[0].keys()

    # convert list of dicts to list of lists
    videos_list = {key:[item[key] for item in videos] for key in columns}

    # convert list to pyarrow table
    videos_tb = pa.table(videos_list)

    # init s3 client
    s3 = boto3.client('s3')

    # use collection_date to partition
    bucket_name = '<S3 Bucket name>'
    parquet_file_key = f'raw/videos/collection_date={search_date}/{search_date}.parquet'

    # write to parquet file in memory
    parquet_buffer = BytesIO()
    pq.write_table(videos_tb, parquet_buffer)

    # upload to s3
    s3.put_object(Bucket=bucket_name, Key=parquet_file_key, Body=parquet_buffer.getvalue())
    print(f'Parquet file uploaded to s3://{bucket_name}/{parquet_file_key}')
```

Before running the function, we need to add the pyarrow package into Lambda as well.
We could try the previous method we used for `googleapiclient`, but for `pyarrow` this will result in errors 
because some files are dependent on the OS (Mac, Windows or Linux) it is built on. For the pyarrow package to be usable on Lambda, 
it should be built on a Linux machine. Alternatively, you could make use of a public pre-built layer resource available [here](https://github.com/keithrozario/Klayers/tree/master/deployments).
Make sure to pick the correct Python version and AWS region and obtain the arn value for the resource.

In the Lambda function, select 'Add a Layer' and use the arn to attach the layer.
I've also updated the Python version of the Lambda function to match the Python version I picked for pyarrow.

![26](https://github.com/user-attachments/assets/87821e01-5a28-4cad-85d7-4bbf71583c7f)

Now, if you deploy changes and test the function, it will throw an error saying that the function has timed out after 3 seconds. 
Since writing parquet files need more time, let's update the timeout value to 1 minute.

![26-2](https://github.com/user-attachments/assets/dc7df723-a24a-44a8-9c54-d50dde25feb1)

When you execute the function now, it'll throw an error mentioning that permissions are missing.

``` bash
An error occurred (AccessDenied) when calling the PutObject operation
```

To resolve this error, we need to enable the IAM role associated with Lambda function to access the S3 bucket.

Go to the `Configuration` tab and select `Permissions`. Click on the role name to open it in IAM console.

![27](https://github.com/user-attachments/assets/6021c396-3fbc-42d8-afda-922f7e58f52b)

Select to edit the existing policy.

![28](https://github.com/user-attachments/assets/3931fce3-fa04-4bad-bf83-979de1ab7c79)

Select outside of statement to get the option `Add new statement` on the left side. 

![29](https://github.com/user-attachments/assets/5f601958-c759-47be-8aa8-87e56ab9e94c)

Then select `s3` as the service to add, and `s3:GetObject` and `s3:PutObject` as the allowed actions.
In the resource selection, select the S3 bucket created earlier. This should add a snippet similar to below.

``` json
        {
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject"
			],
			"Resource": [
				"arn:aws:s3:::<bucket_name>/*"
			]
		}
```

Rerun the Lambda function. If you followed all the steps, the parquet file should be created in the S3 bucket.

<img style="max-width: 30%; display: block; margin-left: auto; margin-right: auto" 
alt="30" src="https://github.com/user-attachments/assets/00a1a873-06c9-483b-8f71-72d6d34d7621"/>

Congratulations on reaching this point! You've done a great job!!

### 6. Enable the job to run daily using Amazon EventBridge

Before setting up the daily schedule for the Lambda function, we need to update the `publishedBefore` and `publishedAfter` dates to change dynamically in the first API call.

Assume we want to run the daily job at 12.30am AEDT (UTC +11), which is 1.30pm UTC.
We can get the videos published from 1.30pm on previous day to 1.30pm the next day.

``` python
    from datetime import datetime, timedelta

    # set datetime for search
    search_date = (datetime.now(ZoneInfo('Australia/Melbourne'))-timedelta(1)).strftime('%Y-%m-%d')
    previous_date = (datetime.now(ZoneInfo('Australia/Melbourne'))-timedelta(2)).strftime('%Y-%m-%d')
    utc_time = 'T13:30:00Z'
    search_date_utc = search_date + utc_time
    previous_date_utc = previous_date + utc_time
```

Once this is updated in the API request, we can set up the daily trigger to execute the function using Amazon EventBridge.

Head to EventBridge console and create a rule. 
Click on 'Continue to create rule'.

![31](https://github.com/user-attachments/assets/290b6cd4-84c9-4362-95b7-a6a445020507)

Set the cron expression to trigger the Lambda function. I've set it to 1.30pm UTC.

![32](https://github.com/user-attachments/assets/4bf34627-015f-4f45-9b22-aeb8cb6e75af)

Set the Lambda function as the target.

![33](https://github.com/user-attachments/assets/e833cf03-d1eb-4513-92f8-6e5ad498e4dc)

Head back to the Lambda function to verify that the trigger has been added.

![34](https://github.com/user-attachments/assets/722e4ba7-3a57-4785-b24d-9f92655f7d7d)

7. Read data from S3 to get data from API

Let's create a second Lambda function as `getYoutubeStats`. 
In the Lambda function, let's get all the data files stored in S3:

``` python
import boto3

def lambda_handler(event, context):

    # init s3 client
    s3 = boto3.client('s3')

    bucket_name = '<bucket_name>' 
    directory_prefix = 'raw/videos/'

    # get all files in raw/videos/
    all_files_response = s3.list_objects_v2(Bucket=bucket_name, Prefix=directory_prefix)
    print(all_files_response)
```

To run the process, update the IAM role related with this new Lambda function with the permissions to access S3.

``` json
        {
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:PutObject"
			],
			"Resource": [
				"arn:aws:s3:::<bucket_name>/*"
			]
		},
		{
			"Effect": "Allow",
			"Action": [
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<bucket_name>"
			]
		}
```

When the function is run, the response will have a `Contents` field, which contains the file names stored in S3. We can use this to get the data in the file.

The completed function is as below:

``` python
import os
from io import BytesIO
import pyarrow as pa
import pyarrow.parquet as pq
import boto3
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from googleapiclient.discovery import build


def lambda_handler(event, context):
    # get the API key from Lambda environment variables
    youtube_api_key = os.environ['YOUTUBE_API_KEY']

    # define api variables
    api_name = 'youtube'
    api_version = 'v3'

    # initialise the API client
    youtube = build(api_name, api_version, developerKey=youtube_api_key)

    # init s3 client
    s3 = boto3.client('s3')

    # set today's datetime for search
    search_date = (datetime.now(ZoneInfo('Australia/Melbourne')) - timedelta(1)).strftime('%Y-%m-%d')
    # get last 6 days for which data should be retrieved
    today = datetime.now(ZoneInfo('Australia/Melbourne'))
    search_date_list = [(today-timedelta(i)).strftime('%Y-%m-%d') for i in range(2,8)]

    # get the oldest date for which video data should be retrieved
    # convert string to datetime
    oldest_collection_date = datetime.strptime((today - timedelta(7)).strftime('%Y-%m-%d'), '%Y-%m-%d')

    # get data for last 7 days
    bucket_name = '<bucket_name>'
    videos = []

    for day in search_date_list:
        directory_prefix = 'raw/videos'
        partition_prefix = f'{directory_prefix}/collection_date={day}'

        # check if partition exists in S3
        file_response = s3.list_objects_v2(Bucket=bucket_name, Prefix=partition_prefix)

        # break loop if latest partition is not available - means previous partitions aren't available as well
        if 'Contents' not in file_response:
            break
        else:
            # file path
            file_key = file_response.get('Contents')[0].get('Key')
            # file date in datetime format
            file_date = datetime.strptime(day, '%Y-%m-%d') 
            search_date_dt = datetime.strptime(search_date, '%Y-%m-%d')
            # get object
            file_obj = s3.get_object(Bucket=bucket_name, Key=file_key)
            file_table = pq.read_table(BytesIO(file_obj['Body'].read()))
            video_ids = file_table.column('id').to_pylist()

            # get data for each video
            video_data_response = youtube.videos().list(
                part='statistics',
                id=','.join(video_ids)
            ).execute()

            for item in video_data_response.get('items', []):
                statistics = item.get('statistics', {})

                video = {
                    "id": item.get('id', ''),
                    "initialCollectionDate": file_date,
                    "collectionDate": search_date_dt,
                    "collectionCount": (file_date - oldest_collection_date).days + 2,
                    "viewCount": statistics.get('viewCount', '0'),
                    "likeCount": statistics.get('likeCount', '0'),
                    "favoriteCount": statistics.get('favoriteCount', '0'),
                    "commentCount": statistics.get('commentCount', '0')
                }
                videos.append(video)

    # save data in s3 if data is available
    if len(videos) > 0:
        # get column names
        columns = videos[0].keys()

        # convert list of dicts to list of lists
        videos_list = {key: [item[key] for item in videos] for key in columns}

        # convert list to pyarrow table
        videos_tb = pa.table(videos_list)

        # write to parquet file in memory
        parquet_buffer = BytesIO()
        pq.write_table(videos_tb, parquet_buffer)

        # upload to s3
        parquet_file_key = f'raw/video_stats/collection_date={search_date}/{search_date}.parquet'
        s3.put_object(Bucket=bucket_name, Key=parquet_file_key, Body=parquet_buffer.getvalue())
        print(f'Parquet file uploaded to s3://{bucket_name}/{parquet_file_key}')
    else:
        print(f'No data available before {search_date_list[0]}')

```

Before executing the function, make sure you have added environment variables, and attached the required layers similar to what we did for 'getYoutubeData' function.

Finally, add the new function to be triggered with the same EventBridge rule.

![35](https://github.com/user-attachments/assets/a5d6ccfc-2cd7-4a5d-ae94-b57bc7bb5c2e)

Now we have setup the data extract Lambda functions to get data using the YouTube API!

Congratulations on reaching this far!

Read the next steps of the project - using AWS Glue to transform data and store in Redshift - here in [Part 2](ttps://malshal.github.io/bitsploit/youtube-data-transform-aws).