---
title: What and Why of Anomaly Detection
date: 2017-09-03
path: /what-and-why-anomaly-detection
excerpt: Anomaly Detection, also known as outlier detection, is about identifying the ‘not-normal’ items or events in a dataset.
image: https://user-images.githubusercontent.com/10103699/133362469-3869b02a-aea4-47fb-bee1-59f334b3df1f.png
tags: 
    - Machine Learning
    - Data Mining
---
Anomaly Detection, also known as outlier detection, is about identifying the **not-normal** items or events in a dataset.

![anom1](https://user-images.githubusercontent.com/10103699/133362469-3869b02a-aea4-47fb-bee1-59f334b3df1f.png)

Here, the red fish is not normal amidst the blue fish.

But, why does detecting anomalies matter?

Suppose we are studying about the fish in above image. 
They belong to the same species, but can be either blue or red in color. The color of the fish does not affect the 
study. Detecting the red fish (anomalies) in our fish data is not important for our study. 

However, if we were studying fruit, we would need to remove the spoiled fruit data (anomalies) before using the 
data for our study.

![anom2](https://user-images.githubusercontent.com/10103699/133362475-80b112c8-fa09-4cd0-83e4-a0e0f35e433a.png)
###### *Photo from [101 Clip Art](https://101clipart.com/cute-apple-clipart/)*

The history of anomaly detection goes back to 1970s, when data mining scientists were interested in anomalies 
because they wanted to remove them from the dataset. Anomalies, or outliers, introduced noise into the dataset, 
making the training of models a difficult task. 

The spoiled fruit in above example introduce noise into the dataset. Once removed, they are not considered in the study.

Around the year 2000, researchers started to get interested in anomalies themselves. They recognized that the 
presence of anomalies in a dataset is often related to interesting or suspicious events. Since then, several 
data mining techniques were developed focusing on detecting anomalies in a dataset. There are various such 
applications where anomaly detection is used to discover hidden occurrences.

<table>
<tr>
<td style="border-bottom: none">

![anom3](https://user-images.githubusercontent.com/10103699/133366601-7a1d272f-189f-48e0-b59a-033265b4c704.png)

</td>
<td style="border-bottom: none">

**Intrusion Detection** is one of the most well-known applications of anomaly detection. If someone is attempting 
to attack or gain unauthorized access to a network, it can be identified by detecting **not-normal** accesses to a network.

</td>
</tr>
<tr>
<td style="border-bottom: none">

![anom4](https://user-images.githubusercontent.com/10103699/133362491-bc4494e2-391f-426c-baad-3c886b464109.png)

</td>
<td style="border-bottom: none">

**Fraud Detection**, specially credit card frauds or fraudulent financial activities can be identified by detecting 
transactions that deviate from the usual pattern. 

</td>
</tr>
<tr>
<td style="border-bottom: none">

![anom5](https://user-images.githubusercontent.com/10103699/133366615-e47a8179-8187-4c69-867a-5ceef657ca76.png)

</td>
<td style="border-bottom: none">

**Patient Monitoring** systems utilize anomaly detection techniques to identify existence of a disease or critical 
illnesses within patients, using their records. 

</td>
</tr>
<tr>
<td style="border-bottom: none">

![anom6](https://user-images.githubusercontent.com/10103699/133366623-5fdc8333-8a10-42f2-aff3-e88bf63336da.png)

</td>
<td style="border-bottom: none">

**Fault Detection** in software systems makes use of anomaly detection to recognize instances that differ from the 
normal behavior of the system. As such instances are often resulted by a faulty condition in the system, they are 
used to identify faults.

</td>
</tr>
</table>

### References

_Goldsteing, Markus and Seiichi Uchida. "A comparative evaluation of unsupervised anomaly detection algorithms 
for multivariate data." PloS one 11.4 (2016)_

