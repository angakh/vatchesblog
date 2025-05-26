---
layout: post
read_time: true
show_date: true
title:  "The headless CMS and why it’s not"
date: 2023-08-15
img: posts/20230815/charlie-deets-DgpX3oYADmA-unsplash.jpg
# img_alt: "decorative - coin with a headless avatar"
tags: [cms, headless-cms, wordpress, development]
category: opinion
author: Vatché
description: "What’s the point of a headless CMS and do you need one? We cover some of the reasons why you should or should not and explain why its called headless even though it really isn’t."
---
Although we understand the intention of the phrase "Headless CMS" it seems to be incorrect, it's more like "multi headed" CMS or Hydra CMS. The whole point of a headless cms is that you have a front-end that is decoupled from the back-end and this gives you the flexibility to have one source of truth (for your content, authentication, etc) while having many different methods of "showing" or interacting with what is in the backend. This is really helpful if you have multiple channels to reach your potential customers or existing users. It's not just your website, its; the voice assistant, the smart watch, e-commerce, companion app, syndicating to other people's apps, etc.

When we started Nightfall Advisors my first instinct was to setup an environment in Azure and start building out the servers that would house the backend (strapi), the front-end (react), and perhaps Gatsby to give me a jump-start. But then I stopped. I was going after what I wanted to work with instead of figuring out what I was trying to accomplish.

## Do you need a headless CMS?

When you start a project the first thing you need to do is answer this question. "What is the problem you are solving?" and the second question is "What does success look like?". So I had to ask myself these questions.

- **What problem was I solving?** I need a website to show what I can do to help companies with technology
- **What does success look like?** I need to get the site up quickly with low cost
- **What are some things I want to avoid?** Minimal code especially front-end and minimal effort for design

Then I had some follow-up questions like; "do I need a companion app?", "what does 'low cost' and 'quickly' mean? Once I realized that I didn't need a companion app, that low cost and quickly meant under $10/mo and site is up in a few days. I did not want to spend time working on front-end/design, that could come in phase two and I needed an MVP. I decided to go with a CMS that I previously hated to work with. WordPress. People that I have worked with in the past will drop their coffee mugs when they read this, but it was an easy decision to make. The point here is that the newest, coolest technology is not always the solution to your problem. Sometimes the tried and true is what you need to get started. For me, finding a theme and getting the site up quickly was worth the sacrifice. Am I working on a decoupled solution while I continue to add content to this site? Absolutely.

## Coupled vs decoupled

There are pros and cons to every solution, the question is do they align with your goal. Let's say your internal team consists of one devOps engineer who is overworked and six developers who find themselves with time on their hands. One of your main concerns is security and you heard that headless is way more secure, but you need to self host. I would talk to you about your employees and ask if you would be willing to add another devOps engineer to your team, if the answer is yes? Then headless could work for you, but if you said "we can't hire another person right now", I would not recommend decoupled because this would directly impact your devOps engineer.

When you have a coupled CMS you have one environment for your website, this includes the back-end and front-end of your site. When you have a decoupled CMS you have a back-end server and a front-end server. Each will have their own permissions, licenses, webserver, database, infrastructure, and additional configurations. There are more points of failure, but they are also inherently more secure, quicker, versatile, and scalable. So how do you know if it is right for you?

There are so many options here, first off if you need to go decoupled but don't have the in-house support for it, I would highly recommend a hosting provider to help guide you through this. One of my favorite companies that does this well is [Platform.sh](https://platform.sh/). But you could also leverage cloud computing solutions like AWS or Azure for this, it would require setup and you would need to have someone working on it from a devOps perspective.

If you already have a Drupal website, you may want to check the [next.js Drupal project](https://next-drupal.org/).