---
title: Transform and Load YouTube data in S3 using AWS Glue
date: 2025-01-12
path: /youtube-data-transform-aws
excerpt: In this post, we transform YouTube data in Amazon S3 using AWS Glue.
image: https://github.com/user-attachments/assets/62e136c7-0849-4efc-a885-8e37b365fa84
tags: 
    - Project
    - AWS
    - ETL
    - AWS Glue
---
![1](https://github.com/user-attachments/assets/62e136c7-0849-4efc-a885-8e37b365fa84)

In the previous post [here](https://malshal.github.io/bitsploit/get-youtube-data-aws), we built AWS Lambda functions to get data from the YouTube API and store in an S3 bucket.

In this post, let's continue the project by transforming the raw data in S3 using AWS Glue, and store the data in RedShift, so that it can be used for anlysis. 

### 1. Use AWS Glue Crawler to build the Glue database in Glue Data Catalog

AWS Glue Crawler is used to build metadata tables for data tables in a data store. These metadata tables are then stored in a Glue database.
It's worthwhile noting that the crawler doesn't move the data itself from it's original location, but only creates a pointer to the data so that they can be referenced 
in AWS Glue scripts.

To get started, let's login to the AWS Console and head to AWS Glue Console.
Expand the left side menu to find 'Crawlers' and create a new crawler.

![2](https://github.com/user-attachments/assets/d98f1974-e7a8-4eb6-8e7a-ee2e40ff0bfa)

Add the S3 bucket with raw data as a new data source.

![3](https://github.com/user-attachments/assets/0729c87d-46d2-4d79-8152-606fc4acc1e0)

In the next step, create a new IAM Role to be associated with Glue services.

![4](https://github.com/user-attachments/assets/71735eb6-ae64-43ae-aa2a-a299401c783f)

In the next step, create a Glue database to store the metadata tables created by the Crawler.
Keep the crawler schedule `On demand` for now.

![5](https://github.com/user-attachments/assets/4b1b544c-1701-4522-a3fb-5e1ae8e54f18)

If you come across an error stating `One crawler failed to create. Account was denied access`, this is because your account 
may not have passed the minimum amount of usage required to be enabled to create a Gleu Crawler. This can be resolved by creating an EC2 instance 
(use a free-tier eligible option if you are on free tier) and run it for a few minutes. You'll get an email from AWS indicating that your account 
was validated for additional use. Make sure to terminate the EC2 instance and delete if not required.

Once the Crawler is created, click the crawler name and start a crawler run. Once completed, it'll display the status at the end of the page.

![6](https://github.com/user-attachments/assets/5aae5b65-85bc-4eb3-948d-4eb76410f90a)

Head to Databases and select the database created earlier to view the tables added by the crawler.

![7](https://github.com/user-attachments/assets/c59328a9-ba7a-43ee-b295-2a03051ba85e)

Each table will have the schema automatically inferred by the crawler.

![8](https://github.com/user-attachments/assets/7b090971-4de5-4805-b92c-e7ccd2508b71)

### 2. Build the ETL job using AWS Glue

Now that we have tables setup in the Glue Data Catalog, let's build the ETL job to transform the raw data into the format required for analysis.

On the left side pane, select 'Data Integration and ETL' and head to 'ETL Jobs'.
You'll notice that there are 3 ways provided to create a job - using the Visual tool, using notebook or using a script.

![9](https://github.com/user-attachments/assets/64fd768e-2177-4922-8556-0e24867291ac)

In this poject, we'll use the script option to build the job.

![10](https://github.com/user-attachments/assets/a68e7187-ee0d-47e1-8054-73cd6df38a67)

Because AWS Glue incurrs charges when using interactive sessions, I've written the code locally in VSCode and will only be testing on Glue itself.

As we execute the Lambda function daily, the Glue job will run after the Lambda functions daily to store the new data in the data store.

Initially we'll be reading data from newest partition in the S3 bucket, do some transformations to the data, and finally store back in S3 as csv files.

``` python

```

Head to AWS Glue, create a script and add the code. 

![11](https://github.com/user-attachments/assets/e116e2eb-eab5-4507-b57c-e061052343d3)

Click on the `Job Details` tab to create the IAM role for Glue.

![12](https://github.com/user-attachments/assets/08a4d824-2946-4edf-9fc1-e5c31f02c4b6)

Set the Glue settings as below. 

![13](https://github.com/user-attachments/assets/e852332f-9f1c-4aa8-b95d-3aa949eadc0f)

Next, head to IAM to edit the role we just created for Glue.
In the role, make sure the `AWSGlueServiceRole` policy is attached to the role.

![14](https://github.com/user-attachments/assets/a53ada57-60e0-456c-a827-372f845d13f4)

Create a new policy with below to give permission to Glue to access the S3 bucket.

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<bucket_name>/*"
            ]
        }
    ]
}
```

Head back to AWS Glue and run the job we created above. 

![15](https://github.com/user-attachments/assets/ceb65a85-f728-4310-80f2-c0e3a03cb010)

If the job run succeeds, the `output` folder in S3 will contain csv files with the result data.

![16](https://github.com/user-attachments/assets/3b23bf5a-df84-4aa6-ad75-8aa34e9a0025)

### 3. Set up Redshift Serverless to store data

FIrst, create a `temp` folder in S3 to be used as a temporary storage location in S3 when Glue jobs interact with Amazon Redshift. Glue job will use this folder for data staging and intermediate processing during data transfers between Glue and Redshift.

![17](https://github.com/user-attachments/assets/30f40c0b-0a26-45bc-b194-6fc9ae6eb837)

We'll be using Redshift Serverless free trial instead of Redshift primarily to limit the costs for this project.

Let's set up a Redshift Serverless `namespace` and `workgroup`.

Add a `namespace` name.

![18](https://github.com/user-attachments/assets/c561597f-ea3e-4929-8da1-4c6e68e60a38)

The database name will be `dev` by default. I'll be manually setting up the username and password to access the database.

![19](https://github.com/user-attachments/assets/4b4fae85-2633-4738-bbf4-66e7acd82b8e)

In the next step, specify the S3 bucket for the IAM role to access.

![20](https://github.com/user-attachments/assets/88cc6cd4-ff94-48a1-9da3-27ee1f3589b5)

Add the workgroup name, and base capacity in RPUs (Redshift Processing Unit). I've kept the base capacity at the lowest value as the project will only be processing small datasets.

![21](https://github.com/user-attachments/assets/0ea96774-3de9-46cb-b13f-290f4d2b589c)

Once creation is finished, you can use the Query Editor link on the left sidebar to access the SQL querying platform.

![22](https://github.com/user-attachments/assets/a00fbd6d-2450-4900-b66b-a970642abc20)

Connect to the database using the credentials provided earlier.

![23](https://github.com/user-attachments/assets/296c9df5-9ef4-4610-a60c-16f48e5cc988)

Use the below SQL query to create the result tables.

``` sql
CREATE TABLE videos (
    video_id                        VARCHAR(255)
    ,video_title                    VARCHAR(500)
    ,video_description_truncated    VARCHAR(500)
    ,video_description_length       INT
    ,video_published_datetime       TIMESTAMP
    ,channel_id                     VARCHAR(255)
    ,channel_title                  VARCHAR(500)
    ,video_category_id              INT
    ,video_tags_truncated           VARCHAR(500)
    ,video_duration                 VARCHAR(20)
    ,video_definition               VARCHAR(20)
    ,collection_date                DATE
    ,ingested_datetime              TIMESTAMP
);

CREATE TABLE video_stats (
    video_id                    VARCHAR(255)
    ,initial_collection_date    DATE
    ,collection_date            DATE
    ,collection_count           INT
    ,view_count                 INT
    ,like_count                 INT
    ,favorite_count             INT
    ,comment_count              INT
    ,ingested_datetime          TIMESTAMP
);
```

Right-click to Refresh and view the tables created in the database.

![24](https://github.com/user-attachments/assets/f7608435-a4e7-403e-b1be-4737123c0fc1)

### 4. Create connection from AWS Glue to Redshift to write data

To connect Glue with Redshift, we need to setup a Glue connection that will connect using JDBC.

Head to AWS GLue and create a new connection. Use the menu on left side to find connections.

Search for `JDBC` in the data sources section.

![25](https://github.com/user-attachments/assets/6a3893e1-aff4-4226-8d04-43fffaecb29e)

Add a name for the connection, and provide the username and password for the connection to access the database.

![26](https://github.com/user-attachments/assets/bbf98550-f4b5-46b5-bef8-1db7c1e594bf)

Next, expand the `Network options` to add in the VPC name, subnet and security group of Redshift. Make sure these values match with corresponding values from the Redshift cluster you created above.

![27](https://github.com/user-attachments/assets/bbe8c43d-0daf-4655-89e8-3820ef95ec51)

Save changes and make sure the connection status updates to `Ready`.

![28](https://github.com/user-attachments/assets/a3c33b3a-05e6-46f1-990c-f970bd20eda6)

To use this JDBC connection in our Glue job, head back to the Glue job and add the connection in `Job Details` section.

![29](https://github.com/user-attachments/assets/9ffe471a-a2ba-4d7e-a335-542136e741cd)

In order for the Glue job to connect with Redshift using the JDBC connection, the IAM role associated with Glue need to have necessary policies attached.
Head to IAM and select the role that is associated with Glue and attach the following poliices to the role.

![30](https://github.com/user-attachments/assets/75823630-5665-4cd5-8c7f-16a63e31997a)

In addition to the above, the role should already have the policy we added to provide access to S3 in step 2.

Next, create a new policy with below to give permission to Glue to access AWS Secret Manager and to be able to create and pass the role.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:PutResourcePolicy",
                "secretsmanager:DescribeSecret",
                "secretsmanager:PutSecretValue",
                "secretsmanager:CreateSecret",
                "redshift-serverless:GetCredentials",
                "secretsmanager:TagResource",
                "secretsmanager:UpdateSecret"
            ],
            "Resource": [
                "<Redshift workgroup ARN>",
                "arn:aws:secretsmanager:*:<account_id>:secret:*"
            ]
        },
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": [
                "arn:aws:iam::<account_id>:role/service-role/<Glue_role_name>"
            ]
        },
        {
            "Sid": "Statement2",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "arn:aws:iam::<account_id>:role/service-role/<Glue_role_name>",
                "arn:aws:iam::<account_id>:role/aws-service-role/redshift.amazonaws.com/AWSServiceRoleForRedshift"
            ]
        }
    ]
}

```

Once the role is configured, head back to Glue > Connections and Test the connection.

![31](https://github.com/user-attachments/assets/e3084661-2824-45c1-8a00-c57b9f320039)

If the test is successfule, head back to your Glue job and run the job. If every step was followed, the job run will succeed!

Head to the Redshift Query Editor to view the data in your tables.

![32](https://github.com/user-attachments/assets/0c9e0f71-809c-43f6-a54a-191704872303)

![33](https://github.com/user-attachments/assets/663e0c24-7486-4247-ab54-9fd06d5ccf57)

### 5. Automate ETL pipeline using AWS Step Functions

In this section, let's use AWS Step Functions to build and do a daily run of the complete ETL pipeline, from data ingestion using Lambda and storing in S3, to transforming in Glue and storing in Redshift. We'll use the existing AWS Eventbridge rule to trigger the Step function, so that it runs daily at 12.30 am AEST.

Head to AWS Step Functions and start creating a state machine. 

In the `Config` tab, add a name to the state machine and select the type as standard.

![34](https://github.com/user-attachments/assets/4a292d81-d23c-42b6-aa6d-86bb3aa2f574)

Go to the `Design` tab and add Lambda as the firt node. Select the Lambda function to get video data as the API argument.

![35](https://github.com/user-attachments/assets/84427787-5815-4982-a85c-af3d21c06463)

Similarly, create another Lambda node to run the function to get video statistics.

Next, add a Glue `StartJobRun` node and add the Glue job name in API parameters.

![36](https://github.com/user-attachments/assets/ad8fdf0a-c84c-4d09-a8a4-0a655e200210)

Click to create the function. You'll be informed about the IAM role that will be created to access the necessary services from the step function.

![37](https://github.com/user-attachments/assets/edde453d-77c7-4517-b58e-7e8dd3cd2295)

Next, head to Eventbridge and select the rule we creaed previously to run Lambda functions. Edit the rule to add the Step function as the new target, and remove the Lambda functions from the rule targets.

![38](https://github.com/user-attachments/assets/87360b9d-caf5-434d-81c1-dc88d6066598)

Now, the ETL process should run evryday and store the new data in the Redshift tables.

### 6. Setup email updates for the ETL process

Head to SNS service and create a Standard topic.

![39](https://github.com/user-attachments/assets/9e380270-cbf5-4c3b-97a8-42b7d853020c)

In the created topic, create a subscription using your preferred email. Make sure to check your email inbox and confirm the subscription by clicking the confirmation link.

![40](https://github.com/user-attachments/assets/2c309c04-f62d-4ad2-ac7e-25272ef879ef)

Head back to the Step Function created previously, and add in steps to check the Glue job status and publish status to the SNS topic.

![41](https://github.com/user-attachments/assets/43335570-ba54-4868-aece-e413c0a62df4)

When the steps are added, the state machine definition will be as below.

``` json
{
  "QueryLanguage": "JSONata",
  "Comment": "A description of my state machine",
  "StartAt": "getData",
  "States": {
    "getData": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Output": "{% $states.result.Payload %}",
      "Arguments": {
        "FunctionName": "<Lambda function ARN>"
      },
      "Retry": [
        {
          "ErrorEquals": [
            "Lambda.ServiceException",
            "Lambda.AWSLambdaException",
            "Lambda.SdkClientException",
            "Lambda.TooManyRequestsException"
          ],
          "IntervalSeconds": 1,
          "MaxAttempts": 3,
          "BackoffRate": 2,
          "JitterStrategy": "FULL"
        }
      ],
      "Next": "getStats"
    },
    "getStats": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Output": "{% $states.result.Payload %}",
      "Arguments": {
        "FunctionName": "<Lambda function ARN>"
      },
      "Retry": [
        {
          "ErrorEquals": [
            "Lambda.ServiceException",
            "Lambda.AWSLambdaException",
            "Lambda.SdkClientException",
            "Lambda.TooManyRequestsException"
          ],
          "IntervalSeconds": 1,
          "MaxAttempts": 3,
          "BackoffRate": 2,
          "JitterStrategy": "FULL"
        }
      ],
      "Next": "Glue StartJobRun"
    },
    "Glue StartJobRun": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Arguments": {
        "JobName": "<Glue job name>"
      },
      "Assign": {
        "JobRunState": "{% $states.result.JobRunState %}"
      },
      "Next": "Check Job Status"
    },
    "Check Job Status": {
      "Type": "Choice",
      "Choices": [
        {
          "Condition": "{% $JobRunState = 'SUCCEEDED' %}",
          "Next": "Send Success Notification"
        },
        {
          "Condition": "{% $JobRunState = 'FAILED' %}",
          "Next": "Send Failure Notification"
        }
      ],
      "Default": "Handle Unknown State"
    },
    "Send Success Notification": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Arguments": {
        "TopicArn": "<SNS topic ARN>",
        "Message": "Glue job completed successfully!",
        "Subject": "Glue Job Success"
      },
      "End": true
    },
    "Send Failure Notification": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Arguments": {
        "TopicArn": "<SNS topic ARN>",
        "Message": "Glue job failed. Please check logs for details.",
        "Subject": "Glue Job Failure"
      },
      "End": true
    },
    "Handle Unknown State": {
      "Type": "Fail",
      "Error": "UnknownJobState",
      "Cause": "The Glue job state was neither SUCCEEDED nor FAILED."
    }
  }
}
```

Update the related IAM role with below to enable publishing messages to the SNS topic.

``` json
        {
			"Sid": "Statement1",
			"Effect": "Allow",
			"Action": [
				"sns:Publish"
			],
			"Resource": [
				"<SNS topic ARN>"
			]
		}
```

Execute the state machine to test the ETL process. If all the steps have been completed, you'll receive an email indicating the job has completed successfully!

