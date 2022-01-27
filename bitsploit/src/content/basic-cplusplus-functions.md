---
title: Basic C++ Functions
date: 2017-09-17
path: /basic-cplusplus-functions
excerpt: This post discusses some basic functions you'll come across while learning C++.
image: https://user-images.githubusercontent.com/10103699/133363842-a1d80d57-a9ab-4429-9782-4ca4bc508ac5.png
tags: 
    - C++
external: false
---
These are some basic functions that you will come across while learning C++.

![c++](https://user-images.githubusercontent.com/10103699/133363842-a1d80d57-a9ab-4429-9782-4ca4bc508ac5.png)

### Sorting

Use the `std::sort()` function to sort arrays and vectors in ascending order.
Sort will include the beginning pointer but not the ending pointer.

```c
#include <algorithm>

sort(begin, end, wayToSort (optional))
```

### For arrays

```c
int size = 5;
int myArray[size] = {45, 2, 76, 62, 15};
sort(myArray, myArray+size);
```

or using C++ 11,

```c
sort(begin(myArray), end(myArray));
```

### For vectors

```c
#include <vector>
#include <algorithm>

vector<int> myVector = {98, 26, 72, 12, 35, 65};
sort(myVector.begin(), myVector.end());
```

### To sort in alphabetical order
    
```c
#include <vector>
#include <string>
#include <algorithm>

vector<string> myVector = {98, 26, 72, 12, 35, 65};
sort(myVector.begin(), myVector.end());
```

### Using a comparing function

Define your own function to use in sorting. To sort the above array in descending order:

```c
bool wayToSort(int i, int j) { return i > j; }
sort(myVector.begin(), myVector.end(), wayToSort);
```

### Substring of a string

```c
substr(position, length)
```

If length is not given, the string up to the end is taken.

```c
string myString = "This is a sentence";
myString.substr(5, 2);                   //"is"
myString.substr(10);                     //"sentence"
```

Happy coding in C++!
