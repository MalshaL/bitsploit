---
title: A Simple Guide to using Git in Command Line
date: 2015-12-13
path: /using-git-in-cmd
excerpt: Using Git can be a bit challenging at the beginning. Here's a simple guide to using Git on Windows command line.
image: https://user-images.githubusercontent.com/10103699/132891938-16fdb62e-5cf3-4a31-a5d0-a3f03452bc3d.jpeg
tags: 
    - Git
    - How to
---
Git is a powerful version control system that can be used to easily manage everything from small to large projects. 
However, newbies often find using Git a bit challenging. Here's the simple guide to using Git on Windows command line.

![git1](https://user-images.githubusercontent.com/10103699/132891938-16fdb62e-5cf3-4a31-a5d0-a3f03452bc3d.jpeg)

For those who wonder about the difference between Git and GitHub, GitHub is a Git repository hosting service that 
has features of Git as well as its own features. Git is a command line tool, whereas GitHub provides a web based 
graphical user interface (GUI) for using Git repositories.

![git2](https://user-images.githubusercontent.com/10103699/132891952-6d342ba0-851d-44b0-846a-e9dbc90cfa04.png)

This post assumes that you have Git set up in your computer as well as a GitHub account.

You can get a Git project using two approaches; either by creating a new repository or cloning an existing one 
(created by someone else) to your machine. The two ways are described below.

### Creating a new repository

#### 1. Create a Git repository

 A repository is a special data structure Git uses to store the snapshots of the project you save. This is different 
 from the project folder you have in your computer. Go to your Git account on GitHub and create a Git repository.

![git3](https://user-images.githubusercontent.com/10103699/132892323-a2e6b318-b991-497d-afbb-555ee91831c3.png)

Add a repository name that is easy to remember. GitHub will direct you to the page of your newly created repository.

#### 2. Initialize your Git repository in your computer.

Go to the folder you want to create your project. If you have a project already created, go in to the project folder. 
S**hift+right click** and select **Open command window here** option to get the command line.

Use `git init` command to initialize a git repository.

![git4](https://user-images.githubusercontent.com/10103699/132892333-a9154705-6ff1-405a-b94f-4e4305a94c06.png)

#### 3. Add existing files to the repository.

Use `git add --all` to add all the files in the folder to the Git repository.
Then use `git commit -m "Commit message"` to record the changes made to the project. The commit message describes the 
change you made to the project.

![git5](https://user-images.githubusercontent.com/10103699/132892344-2f0b788e-7bc8-4680-80b6-28fdb2046d0b.png)

#### 4. Link your project with the repository created in GitHub.

Execute `git remote add <repository-name> <url>` to add your project in your machine to the repository. Here, 
repository-name is the name you want your remote repository to have. This can be the same as your GitHub repository 
name, but does not necessarily have to be so.

![git6](https://user-images.githubusercontent.com/10103699/132892354-7de1c94a-be6f-4303-9227-574e3f61eeb4.png)

You can get the url of the repository using GitHub.

![git7](https://user-images.githubusercontent.com/10103699/132892359-bf1a1396-8913-405d-afff-d1fb6f5ce6cc.png)

#### 5. Push the project to the repository.

Use `git push <repository-name> master` to push your project to the remote repository. The repository-name has to be 
the same as the one specified earlier in step 4. This will prompt you to enter the username and password of the 
GitHub account and record changes in the repository.

![git8](https://user-images.githubusercontent.com/10103699/132892364-52a22571-ab94-436d-be4b-6a995665bb7a.png)

#### 6. Checking status 

Use `git status` command to check the status of the repository at any time to check if there are any changes to be 
committed or pushed.

![git9](https://user-images.githubusercontent.com/10103699/132892370-095bfea9-22ed-402c-ab04-16409a282cd0.png)

#### 7. Finding the remote repository name

Use `git remote show` to get the remote repository name.

![git10](https://user-images.githubusercontent.com/10103699/132892379-96665e0c-9e72-40ab-999b-22761a33f3f8.png)

#### 8. Recording changes made later

After making any changes to the project, the changes have to be committed and pushed to the repository to record 
the changes in Git. Follow steps 3 and 5 to push the repository again.

#### 9. Updating changes from others in your machine

To get the changes made by others to the repository, run the command `git pull <remote-name> <branch-name>`. The 
branch-name is 'master' by default, as we did not discuss branching in this post. Make sure you have committed and 
pushed your changes before pulling the updates.

![git11](https://user-images.githubusercontent.com/10103699/132892387-dce874fa-766a-4b25-94dc-1e4f09609ff5.png)

It is in this step where conflicts can occur. If you run into any conflicts, those will have to be resolved manually.

### Cloning an existing repository to your computer

Go to the directory in your computer and open a command window using Shift+Right click. Use `git clone <url to the 
repository>` to get the existing repository to your computer. The repository will be cloned in your computer creating 
a new folder.

![git12](https://user-images.githubusercontent.com/10103699/132892394-fc0c0799-d21f-49c6-9d73-6cc3368e1919.png)

Committing and pushing changes to the repository is the same as in above steps. Make sure that you are inside the 
project folder when executing the commands.

Happy coding with Git!