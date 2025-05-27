---
layout: post
read_time: true
show_date: true
title: "What is Verba and is it right for you?"
date: 2023-09-08
img: posts/20230908/weaviate.png
tags: [ai, data-privacy, llms, vectors, rag, weaviate, verba, vector-database]
category: dev-tools
author: Vatché
description: "An in-depth look at Verba by Weaviate, exploring how this RAG-as-a-Service platform simplifies retrieval augmented generation and whether it's the right solution for your AI needs."
---

Some of the problems our clients face with Retrieval Augmented Generation is how to use it, what to use it with, and how to get the most out of it. Verba seems like the Wix of RAG. We are going to take a closer look at what Verba from Weaviate is and how it may change the way you look at RAG.

## Who is Weaviate and what is Verba?

Weaviate is an open-source vector database that helps you store data objects and vector embeddings and use them with different ML-models. **Vector databases** can hold data that is structured (like a table of data) or unstructured (a pdf with tons of information in different formats or images), but each item is paired with a vector embedding. **Vector embeddings** are that data's numerical representation. I don't want to go in depth on vector embeddings and databases because this post is about Verba and how it may change the way you look at RAG. But for those that don't know, you can think of vector embeddings as a way for a machine to "understand" relationships to other things based on a numerical value. So if you wanted to query a database in the past for [*inventory check: apples, pears, pineapple, etc*] you would have to write a SQL query that pointed out every fruit you have. But using semantic search with a vector database and embeddings, you could just query [*inventory check: fruit*], and whatever fruit exists in the dB will be provided. This is because the vector embeddings for apples, pears, etc have similar values and thus are returned. Those same embeddings could return those fruits and vegetables if you were to query "produce".

## Weaviate is the search engine (Generative Search Technology) but what is Verba?

Below is an image and excerpt from their [github page](https://github.com/weaviate/Verba/tree/main).

![Verba demonstration](./assets/img/posts/20230908/verba.gif)

> Verba is more than just a tool—it's a personal assistant for querying and interacting with your data. Have questions about your documents? Need to cross-reference multiple data points? Want to gain insights from your existing knowledge base? Verba makes it all possible through the power of Weaviate and Large Language Models (LLMs)!

Verba is an open-source tool that provides an intuitive interface for interacting with retrieval augmented generative models. It allows users to easily import data, query the knowledge base using natural language, and receive contextualized responses powered by large language models.

Verba lowers the barriers to leveraging the capabilities of retrieval augmented generation by handling the complexity of setting up and integrating the required components like Weaviate and OpenAI. For those new to this technology, Verba offers a streamlined way to explore the possibilities and value of retrieval augmented generation without needing extensive technical expertise. With just a few commands, anyone can start unlocking impactful insights from their data.

## Integrations

Weaviate has a lot of modules that can be used to get the most out of Verba, this includes but is not limited to OpenAI, Transformers, Jina, Deepset, Cohere, and WP Solr. But if you can't already tell this is all within the Weaviate ecosystem and you are tied to what they have modules for and OpenAI. For many this is fine, the cost of hiring the people you would need to set all of this up manually is much higher than the usage cost from using a hosting solution like Weaviate.

## SaaS vs Hybrid SaaS

Another concern clients have regarding hosted solutions is Data Privacy. You can host your own VPC on AWS, GCP, or Azure if you decide to go with Hybrid SaaS, but if you go with Weaviate's SaaS offering you will be locked in with GCP.

![pricing for weaviate: standard 25/mo, enterprise 135/mo, business critical 450/mo](./assets/img/posts/20230908/weaviate-pricing.png)

The above seems a bit confusing at first because the pricing seems to go up but the bullets stay the same, but that is because all of this has to do with the Service Level Agreement (SLA). They have a pretty cool pricing calculator on their pricing page and that can be found [here](https://weaviate.io/pricing).

### Should I stay or should I go?

I think this is a good place for intermediate developers or engineers to start. You can start using the gui and get your data in there fairly quickly. If you later want to start customizing or working closer with the code, you can use their docker image and setup a local environment and keep moving forward, going as deep into the inner workings of Verba as you would like.

But if you are planning on doing this at scale you may want to talk with the people at Weaviate to get a better understanding of how much it is going to cost you. There is a point at which the cost will increase and that range is 15k/mo for standard to "Contact Us" for the price…and we all know that means "the price is so high we need to justify it when we chat".

For those that want a no-code solution, stay tuned. We are working on a post that will cover Azure's Open AI services, the no-code ML tools that they have as well as some other offerings from companies like Stack-ai.