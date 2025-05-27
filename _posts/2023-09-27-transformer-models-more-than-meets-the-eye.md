---
layout: post
read_time: true
show_date: true
title: "Transformer Models – More than meets the eye"
date: 2023-09-27
img: posts/20230927/arseny-togulev-liAwyJ64wHE-unsplash.jpg
tags: [ai, llms, nlp, transformers, machine-learning, neural-networks]
category: machine-learning-ml
author: Vatché
description: "Exploring the revolutionary transformer architecture that powers modern AI, from the groundbreaking 'Attention is All You Need' paper to today's business applications and future possibilities."
---

If there is historic relevance worth mentioning, I will. In the case of transformers we must mention the Google document that (slight hesitation) started this AI revolution. In 2017 Google researchers published a paper called "Attention is all you need". This was the catalyst that catapulted AI into the mainstream a few years later. (Who knows, we may look back and say "this was when skynet was born"). We will cover why transformers are so important now, but I wanted to point out where it started because this was the advancement in research that produced a quicker and more efficient way for machines to work with larger than you can imagine datasets.

Link to the original paper: [Attention is all you need](https://arxiv.org/pdf/1706.03762.pdf)  
Link to the original code: [https://github.com/tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor)

## What Are Transformer Models?

When people think of transformers they think of; 80's cartoons, power lines, or Michael Bay. Even autocorrect in google docs where I am writing this is trying to get me to change "transformers" to "Transformers" because I must be talking about the toys or the movie right? In its most simple form a transformer model is something that takes input and modifies it for a specific type of output. In slightly more technical terms, transformer models are a type of neural network, which are algorithms modeled after the human brain and what makes transformers unique is their use of an attention mechanism to process data.

Traditional neural networks analyze data sequentially, but transformers can analyze entire sequences of data at once. When I finally understand something, I try to think of different ways to explain it. Here are a few that I came up with, I hope one of these resonates with you.

1. Data which is analyzed sequentially must move around on a very long road in order to work, whereas the transformers' approach to "attention" is to act like a satellite that can see the entire map.
2. Imagine that you processed your vision sequentially. If you were running down the street and had to process what is in front of you sequentially you would probably get hit by a car, because while your vision was scanning the trees the Prius driver was slamming into you. But luckily you process the entire environment in front of you and can identify risks quickly.

This attention allows transformers to learn contextual relationships within text, speech, music, proteins, images, etc.

## What are contextual relationships?

Example: "The bank closed after filing for bankruptcy"

A contextual relationship would identify that "bank" is in reference to a financial institution as opposed to a river bank. "Closed" would be identified as "permanently" versus "closed for the day". These conclusions for each word can only be drawn based on the context of the sentence.

## Transformer Architecture (simplified)

**The transformer architecture consists of two main components:**

1. Encoder: The encoder ingests and processes the input data, whether it be text, image, speech, etc. It uses self-attention, where the model looks at the entire sequence of data as a whole to learn contextual relationships.
2. Decoder: The decoder takes the encoded representation from the input and converts it into the target output format such as a language translation or content tag.

## A competitive edge

**This ability of transformers to understand context and relationships has proven enormously valuable for business use cases:**

- Natural language processing: Transformers excel at text classification, sentiment analysis, summarization and other applications core to chatbots, search, marketing and data analytics.
- Recommendation systems: Transformers analyze customer data and interactions to recommend the right products and services. "I feel like they know me". This builds loyalty, or in my case paranoia.
- Fraud detection: By analyzing transaction data, transformers can learn to recognize contextual patterns of fraud to protect revenue.
- Speech recognition: Smart assistants, chatbots and transcription services depend on transformers to accurately interpret spoken language. This is a work in progress, if you want to see it in action turn on closed captioning on a youtube video.
- Translation: Companies rely on transformers to translate technical, marketing and sales content into other languages to reach global audiences. This is not your typical "google translate" option.

The flexibility of transformers allows businesses to deploy them across diverse use cases in sales, marketing, product, analytics and more. As a result, transformers are driving innovation and delivering real business results in ways that were never possible.

## Why Transformers Are the Past and the Future

When Google's paper was published in 2017 mainstream was not really in the know. Those that were close to AI and Machine Learning were and it took some time to understand and leverage this new method. But it undoubtedly changed the world that we live in. The power it takes to use transformers models is immense and the environmental impact is a huge debate surrounding this technology. But as we move forward the possibilities based on this technology are endless. With more data and compute power, transformer-based AI solutions will only become more capable and ubiquitous in the future. Understanding this revolutionary technology is key to identifying value-creation opportunities, with the ability to continually learn and improve.