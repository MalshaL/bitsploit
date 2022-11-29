---
title: Create your First Database in MySql Workbench
date: 2016-01-22
path: /mysql-workbench-guide
excerpt: This post is a quick guide to create your first database using MySql Workbench.
image: https://user-images.githubusercontent.com/10103699/133356975-64158712-42f1-4d2f-bb5e-6e62f0f4374a.png
tags: 
    - How to
    - Databases
---
A database is one of the key components in a software system and thus, has to be designed with utmost care. If 
you have only a limited knowledge of databases and MySql, creating your first database would be a bit challenging. 
This post is a quick guide to create your first database using MySql Workbench.

![mysql1](https://user-images.githubusercontent.com/10103699/133356975-64158712-42f1-4d2f-bb5e-6e62f0f4374a.png)

The post does not follow a specific software designing architecture but rather gives some general guidelines, and 
assumes that you have MySql and MySql Workbench set up in your machine.

### 1. Define the scope of your project

The size of your database depends on the scope of your project. Thus, decide on the specific components that 
you are going to implement in your system. It would be easier if you list the use cases that would be and would not 
be there in your system. As an example, if it is a system for handling patient information in one section in a 
hospital, decide if you are handling the payments of patients as well.

### 2. Design an Entity Relationship Diagram

An Entity Relationship Diagram (ERD) shows the entities in your database and their relationships between each other. 
In MySql Workbench, you can easily create an ER Diagram, and forward engineer it to create your database.

It is better if you have a rough sketch of your ERD before creating it on Workbench. To create a sketch,

1. List out the main **entities** (or tables) that should be in your database. For instance, a system for a school 
needs to have tables such as student, teacher, administration, course, section and resource.

2. Add suitable **attributes** to your tables. For a student table, the attributes would include student id, name, 
birthday, address and contact number.

3. Choose the attribute or attributes that would be the **primary key** for each table. The primary key of a table 
is one or more attributes that can uniquely identify each record in the table. Two rows cannot have the same 
value for the primary key. In student table, the primary key would be the student id.

4. Decide on the **relationships** between your entities. There can be three main types of relationships between 
tables; one-to-one, one-to-many and many-to-many. As an example, the relationship between student and teacher 
tables is many-to-many.

### 3. Create an ERD in MySql Workbench

To create an ER diagram, go to `File > New Model` in MySql Workbench and click on the `Add Diagram` icon. This 
would open a new tab, `EER Diagram`.

![mysql2](https://user-images.githubusercontent.com/10103699/133357445-722b54ea-5c76-4df2-a248-6b640cae7aa4.png)

### 4. Change database name

Right click on the database name in `Catalog Tree` and change the name in the panel that appears. 
Make sure you do not have spaces in your database (or schema) name, table names or attribute names. You can use 
underscore character instead.

![mysql3](https://user-images.githubusercontent.com/10103699/133357454-e2c92338-3807-4b29-a523-205a6486fd12.png)

### 5. Add tables and Relationships

Now you can simply use the toolbar on left to create the ER diagram. Use Table tool to add a new table.

![mysql4](https://user-images.githubusercontent.com/10103699/133357549-4914b13e-20ea-4c73-a2d2-331f8005e279.png)

Double click on the table name to get the panel where you can change table name and add attributes to the table.

In the panel, the following column flags can be specified for attributes.
    PK – Primary Key
    NN – Not Null
    UQ – Unique Key
    BIN – Binary
    UN – Unsigned
    ZF – Zero Filled
    AI – Auto Increment
    
![mysql5](https://user-images.githubusercontent.com/10103699/133357555-8c76f153-45ca-4c0c-a9dd-18e29fc15ae8.png)

Add relationships using the toolbar. Click on a relationship icon and click on the two tables that you want to connect.

![mysql6](https://user-images.githubusercontent.com/10103699/133357643-50fb8b66-6e8e-4875-8a0a-6bbcff2c9c16.png)

If it is a **many-to-many** relationship, the connection would automatically generate another table containing the 
primary keys of the two tables. These attributes on the new table reference the other two tables, and are called 
foreign keys. Adding relationships generate foreign keys. 

A **foreign key** is an attribute that can uniquely identify a record in another table. Here, a primary key value that 
is not there in the student table cannot be in the student_id column in the student_has_teacher table. You can 
change the name and add attributes to this new table as well.

![mysql7](https://user-images.githubusercontent.com/10103699/133357653-07722e28-318c-4156-88b4-4eccd2e967d8.png)

If it is a **one-to-many** relationship, first click on the table on the **many** side. This would create a foreign key 
in the table in the **many** side referencing the other table.

![mysql8](https://user-images.githubusercontent.com/10103699/133357863-00c113ef-1df0-42f1-9291-ccb44ab188cf.png)

### 6. Create a database from the ER Diagram

After creating the complete ER Diagram, re check it for any corrections and save it.
Then select `Database – Forward Engineer` to create the database.

![mysql9](https://user-images.githubusercontent.com/10103699/133357882-a7e43103-7671-4ad6-a53c-e7ed356cc032.png)

Specify your MySql Connection details (username and password) and click Next. You can also save the script of your 
database to a file for later reference.

![mysql10](https://user-images.githubusercontent.com/10103699/133357965-8b02f7e3-1df2-45c4-9395-09bce4425a54.png)

Go to your connection tab, and refresh the Navigator panel. You would see your new database there. Double click 
on it to make it your default database.

![mysql11](https://user-images.githubusercontent.com/10103699/133357973-0d1775e4-8c99-4bb5-9e50-c7fef5bbdff4.png)

Happy coding with SQL!
