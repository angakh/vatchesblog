---
author: Vatché
category: dev-tools
date: 2023-08-22
description: An in-depth look at GitHub Copilot, the AI-powered coding assistant that's
  transforming how developers write code, including privacy considerations and productivity
  benefits.
img: posts/20230822/github-mascot.jpg
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Development & DevOps
- Tools & Productivity
title: What is GitHub's Copilot?
---

GitHub Copilot is an artificial intelligence assistant for software developers created by GitHub. It uses a cutting-edge AI technique called Codex to generate code suggestions and entire code blocks in real time as developers are writing. Copilot works inside a developer's editor or IDE (like VScode). As they are typing code, it will suggest potential continuations of what they are writing based on the context. For example, if a developer types "for i in range", Copilot may suggest "for i in range(10):" to complete the for loop. It can suggest names for functions and variables, boilerplate code, and even entire blocks of code like if statements or class definitions.

The suggestions are presented as the developer types, allowing them to accept or reject the suggestions as needed. The goal is to boost developer productivity by reducing time spent on rote coding tasks.

![github's copilot extension in VScode](./assets/img/posts/20230822/copilot.png)

Overall, GitHub Copilot aims to act like an AI pair programmer that suggests code in a natural way. It is designed to help developers write code more quickly and with fewer errors by providing contextually relevant suggestions. The AI behind it is trained on a huge dataset of open source code to learn common patterns and conventions in many programming languages.

## Context? Is my private code being exposed?

I was worried about this and have heard the concerns from many others as well. Luckily for the worried Copilot is a client-side application that suggests completions using the pretrained Codex model, without sending private code back to GitHub or OpenAI.

## Some key points on how Copilot handles private data:

- Copilot is installed locally on the developer's machine and makes suggestions using the pretrained model, without connecting to external servers.
- It does not upload, transmit or store users' private code repositories. The code stays local.
- The Codex model was trained only on publicly available source code, not private repos. It does not continue learning from users.
- GitHub's docs state no personal data is collected by Copilot. It can operate completely offline.
- OpenAI has said Codex was trained only once, using public data. User data does not further enhance it. (I'd take that with a grain of salt though)

### Does Copilot really work?

> "don't take my word for it"  
> *LeVar Burton*

![LeVar Burton in front of a microphone, you don't have to take my word for it!](./assets/img/posts/20230822/LeVar_Burton.jpg)
<small>(CC) Randy Stewart, http://blog.stewtopia.com.</small>

According to a study conducted by GitHub, developers using GitHub Copilot took on average 1 hour and 11 minutes to complete a task, while developers who didn't use GitHub Copilot took on average 2 hours and 41 minutes. **An hour and a half of time saved? And you thought WFH was saving you time!**

![infographic from github showing efficiency of using copilot](./assets/img/posts/20230822/copitlot2.png)

> These results are statistically significant (P=.0017) and the 95% confidence interval for the percentage speed gain is [21%, 89%]. In addition, in a survey conducted by GitHub, more than 90% of developers reported that they complete tasks faster when using GitHub Copilot, especially repetitive ones.  
> *[https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/)*

If you have a subscription to Medium you can read and see how copilot helps Bex Tuychiev [here](https://towardsdatascience.com/github-copilot-crushes-data-science-and-ml-tasks-ultimate-review-c8bcbefb928a).

### Try it for yourself

At the end of the day only you can say that Copilot was helpful to you or not. In my experience it is one of those tools that once you start using it, you wonder how you worked without it. Is that scary? A bit. Is it bad? Maybe, but in the same way that stackOverflow and google changed how many people code (copy and paste, then post that it doesn't work) this is the next stage of evolution.

### Recommendations

If you are going to test out Copilot start with something that you are very familiar with, this will help you understand how well or not Copilot is working for you. Installing it is easy with VS code, but you will need to upgrade your Github account to access copilot in your IDE.

![decorative - github mascot](./assets/img/posts/20230822/github-mascot.jpg)