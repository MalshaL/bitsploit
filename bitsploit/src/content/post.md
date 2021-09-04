---
title: Running Clustering Tests for WSO2 Message Broker
date: 2019-10-08
path: /running-clustering-tests-for-wso2-mb
tags: 
    - Message Broker
    - WSO2
---
A cluster is a group of nodes each running an instance of a product. This cluster of nodes act as a single instance, dividing up the work among the nodes, improving performance and reliability.

In this post, let us setup a cluster of two nodes running WSO2 Message Broker 3.0.0 and run clustering tests on them. These steps can be used to setup a cluster of MB 3.2.0 as well.

![img alt](https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)

Configure the `<MB_HOME>/repository/conf/broker.xml` file as described in steps 2 and 3 in WSO2 documentation here.

```xml
<coordination>
    <nodeID>default</nodeID>
    <thriftServerHost>x.x.x.x</thriftServerHost>
    <thriftServerPort>7611</thriftServerPort>
</coordination>
```

```java
void initMat(vector< vector<double> > &a, vector< vector<double> > &b, int n)
{
		// initialize matrices and fill them with random values
		for (int i = 0; i < n; ++i) {
			for (int j = 0; j < n; ++j) {
				a[i][j] = (double)rand()/RAND_MAX*10;
				b[i][j] = (double)rand()/RAND_MAX*10;
			}
		}
}
```