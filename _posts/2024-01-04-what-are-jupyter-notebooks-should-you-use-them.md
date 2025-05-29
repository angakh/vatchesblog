---
author: Vatché
category: dev-tools
date: 2024-01-04
description: Exploring Jupyter Notebooks as interactive coding environments for AI
  and data science projects, including their benefits, alternatives, and the OpenAI
  cookbook examples.
img: posts/20240104/pexels-t-keawkanok-13229882-2000x1125.jpg
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Data Science & Analytics
- Development & DevOps
- Tools & Productivity
title: What are Jupyter Notebooks and should you use them?
---

When I first started to write code…oh man, I'm going to date myself here. When I first started to write code the only tools that I had at my disposal like everyone else was the computer itself and literature. There was no web, github, youtube, or udemy. There was the 2600 quarterly, Softalk, Compute! and more that I can't recall. You would learn by doing, commenting was your best bet and there was a lot of trial and error. Debugging was a pain and often times made me want to quit all together.

Now there are so many tools and resources that can help you, from gitHubs CoPilot to entire courses from Coursera, EdX, and Udemy to name a few. But when it comes to rapid development of AI, data science projects, collaborating or sharing your code, nothing comes close to Notebooks. In this post we are going to cover what Jupyter Notebooks are, why they are great, and some alternatives that you can use. In addition to that we will provide a brief overview of OpenAI's cookbook that utilizes the Notebook framework.

## What are notebooks (in this context)?

Notebooks are an interactive coding environment that allow you to execute code, see the results, and document your work all within a single sharable document. In some ways its like having an interactive github page, where you can store, comment, collaborate, and run your code. One of the reasons why the web version of notebooks is so popular is because you do not need to really setup any local dev tools or environments to run your code. Knowing markdown is essential to making the most of the formatting options but picking it up should not be difficult.

## Converting notebooks

If you are happy with the code that you have in your notebook, you can convert the notebook to python through the use of nbconvert, you can learn more about it [here](https://nbconvert.readthedocs.io/en/latest/), they have decent documentation.

## Charts

You can use notebooks to generate plots, charts, and other visualizations alongside your code. In some application development this does not really matter, but when you are working in Data Science, AI, ML, etc. having this at your disposal and easy to use makes communicating complex ideas way easier.

## "Top to Bottom"

The linear execution flow of notebooks and the whole purpose behind it encourage you to write your application in a top to bottom way. This is best practice anyway but when you are writing code for yourself sometimes you rush, I know I have and I end up forgetting what I was doing in a particular spot, there is a bunch of overhead just getting caught up. So when you are using notebooks the fact that you can so easily turn your code into the doc about your code means future you, your coworker, your friend, will all thank you.

## In AI

With notebooks, you can capture your complete AI workflow in one place – from raw data, to cleaned data, to model building, evaluation, parameter tuning, and deployment. This encapsulation of the end-to-end steps makes your work more reproducible and easier to pick back up later.

## Local Notebooks

When you are working in Jupyter Notebooks you are creating .ipynb files, these are the hardcoded files of your work. These can be edited but are often viewed through the IDE of choice. In VS Code you can create your own notebooks without having to use Jupyter Notebooks at all. But note you will end up having to install python and libraries to make it work.

## So should you use Jupyter Notebooks?

If its just you, I say give it a try, its free and easy to get setup. If you are a tinkerer and want to spend time setting this up locally, you can totally do that. Some might argue that using a combination of VS Code and github is easier when you have a team, because selling the idea is a lot easier when its an extension you add on VS Code with no additional impact on how you use git. One of the alternatives, [ReviewNB](https://www.reviewnb.com/) is attempting to solve the clunky collaboration problem of Jupyter Notebooks, I have not tried it out yet and don't even think the Jupyter Notebooks are that bad…but I also have note done much visualization.

If you need Kernel based execution Jupyter is the way you would go, the code that runs in a Jupyter Notebook runs that code in a separate kernel process. If you are going to be heavily using graphs like Matplot, Plotly, etc Jupyter will win again, these are possible to do in VS Code but not as easily as in Jupyter Notebooks.

## Open AI's Cookbook

The Open AI Cookbook on github is something that you should definitely take a look at, this is a treasure trove of information. [https://github.com/openai/openai-cookbook](https://github.com/openai/openai-cookbook)

There are a few articles and an examples folder, which contains close to 200 examples. These examples range from azure to "semantic text search using embeddings". So now you have openai code snippets, documentation, and examples all in one file, when I first learned about this, it blew my mind. I still think it is a great step for collaborating, teaching, and learning.

![OpenAI Cookbook notebook in GitHub](./assets/img/posts/20240104/notebook-in-github.png)

The screenshot shown above is the "openai cookbook" notebook running in github.

We have come a long way in terms of development tools and collaborative ones, but for me the AI frontier paired with tools like notebooks and other cloud services is bringing a lot of excitement back into development. There is so much to help you do what you want to do with a low barrier to entry. The hardest thing is figuring out what you want to start with. In my opinion you just have to have a project, it doesn't have to be original, you can look up projects online and start right away.

I hope you found this useful and I welcome any [feedback](https://nightfalladvisors.com/contact#form).