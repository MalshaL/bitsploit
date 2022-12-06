---
title: How to get data from Power BI samples for Practice
date: 2022-12-06
path: /get-data-for-practice
excerpt: In this post, we look at how to get the data from Power BI samples for practice.
image: https://user-images.githubusercontent.com/10103699/205779305-ddf2b7b1-1e5b-4aa0-86fe-90ddfa85ee7a.jpg
tags: 
    - Datasets
    - Project
    - Excel
    - Power BI
    - Data Visualisation
---
![pb-data1](https://user-images.githubusercontent.com/10103699/205779305-ddf2b7b1-1e5b-4aa0-86fe-90ddfa85ee7a.jpg)
###### *Photo by [Stephen Dawson](https://unsplash.com/@dawson2406?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com)*

If you're a Power BI beginner, samples available in the [Power BI tutorials](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets) by Microsoft are a great place to get started.

In this post, I go through the steps to view the sample data in excel, so that you can use the data for practice purposes.

I'll use the [Human Resources sample](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-human-resources) 
as a starting point, as I'm using it for a practice project myself.

### Download the Excel file

First, open the tutorial for [Human Resources sample](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-human-resources) in your browser. 
This article contains very informative and detailed explanations on how to use the data to build a Power BI report. 

Next, go to the [Download excel samples](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets#download-sample-excel-files) page,
which leads to the [GitHub repository](https://github.com/microsoft/powerbi-desktop-samples/tree/main/powerbi-service-samples) where the Excel file is shared. 

Download the Excel file and open the file in your machine. An important thing to note is that to view the data you'll need the Power Pivot 
feature in Excel, which is only available in Excel for Windows. If you are using Mac OS, you may need to use a separate Windows machine, or a 
Windows Virtual machine with Excel installed.

### Install Power Pivot

If you don't have Power Pivot tab in Excel, you can install it in a few simple steps. 

1. In Excel (for Windows), go to `File` and then `Options`.

2. Select `Add-ins` from the left pane and select `COM Add-ins` at the bottom. Click `Go`.

![pd-data2](https://user-images.githubusercontent.com/10103699/205799764-c116f6d7-5482-4b86-b03c-ad6670075ec3.png)
###### *Install Add-ins in Microsoft Excel*

3. In the dialog box, tick the `Microsoft Power Pivot for Excel` and click `OK`. You'll be able to see the `Power Pivot` tab added to the Excel ribbon on top.

![pb-data3](https://user-images.githubusercontent.com/10103699/205799789-6e819c24-bd85-4b42-89ce-90fe9ef9f8e0.png)
###### *Add Power Pivot to Excel*

### View data

When you open the downloaded file, you'll see only a single `Info` tab. 
Because the data is stored in the Power Query data model, you can view data using Power Pivot tab.

1. Go to the `Power Pivot` tab and select `Manage`.

![pb-data4](https://user-images.githubusercontent.com/10103699/205799822-0919707f-3bdc-4754-a60a-b104e4fc7032.png)
###### *Power Pivot tab in Excel*

2. This will open a new window where you can view the data in the Power query model. Select the `Employee` tab to view the complete HR dataset.

![pb-data5](https://user-images.githubusercontent.com/10103699/205800947-8651c083-dcfe-4139-86b2-6f1578edc5f0.png)
###### *Data view in Power Query window*

For my project, I'm extracting the monthly data for 2014 into different files. You can filter the data by the date column, 
copy the data and paste in a new file to use for your practice project.

![](https://user-images.githubusercontent.com/10103699/205806291-01a1fefc-bf98-4f14-8b9b-76024bb5e169.png)
###### *Extract data into a new file*

### Data usage

Note that the GitHub repository is shared with MIT license. It allows you to use the data files for a wide range of purposes.


Have fun reporting with Power BI!

Read more about [how I generated my own Vacancy dataset](https://malshal.github.io/bitsploit/generate-your-own-dataset) to match the above Human resource dataset to use in Power BI. 