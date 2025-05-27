---
layout: post
read_time: true
show_date: true
title: "LLMs, Tokens, and Weights! OH MY!"
date: 2023-08-18
img: posts/20230818/overwhelmed.jpg
tags: [biases, llms, prompts, tokens, weights, artificial intelligence, machine learning]
category: ai
author: Vatché
description: "Demystifying how large language models work by exploring the fundamental concepts of tokens, weights, and neural networks through accessible explanations and musical analogies."
---

When I was a teenager I wanted to play the guitar, and on my birthday one summer I got a Fender DuoSonic, it was a cheap small guitar with barely enough frets to play anything on the higher notes. But that summer I played that guitar every single day for hours, listening and trying to play along with Metallica, Johnny Winter, B.B. King, Gary Moore, Black Sabbath and many more. When I went back to school I was playing on our school's music teacher's Gibson Nighthawk in his office/studio and he ran in, his hair all over the place and said "What? Who? When did you learn how to play the guitar?!"

He immediately asked me to join the band and to play and asked me to take Counterpoint and Music Theory. One of the things I learned in music theory was that notes have patterns, if you play one note there are many notes that can compliment it at first, but as you add notes the number of notes that "sound good" become fewer as you progress and take into account the notes that preceded it, as the pattern emerges you are left with fewer choices of what note to play next. (This applies to most music, but Jazz is a little different, every note can be a surprise). Some people have a "sixth sense" for it and some learn it through counterpoint and music theory, for me it seemed mathematical. The way notes worked together was a statistical probability.

When it comes to AI and large language models (LLMs) this seems to be the case as well. The way a machine views words and how they relate to each other is defined by a pattern that it has ingested and a model is created based on those probabilities. How it all works seems like a black box, dark magic, or some science fiction plot. In this article we will demystify what an LLM is, how tokens and weights work, and hopefully help you feel more comfortable with AI.

In the following example I asked Claude from Anthropic to explain LLMs. I always start my prompts with a persona, in this example I went with "a seasoned teacher", I don't know if this actually helps but I have tried variations of this with the same question and the results do align with the persona.

### Prompt

> You are a seasoned teacher and you are tasked with writing two paragraphs on how LLMs work. The first paragraph will be tailored for the reading and intellectual level of a five year old and the second will be for a teenager.

### Claude's Response

> Here is a two paragraph explanation of how LLMs work, tailored for different audiences:
>
> For a 5 year old: LLMs are like students learning in school. They start off not knowing anything, just like a kindergartener! Then they read many many books and stories, like a student does homework. The more they read, the more they learn about words and language, just like students learn more every year! After reading so much, LLMs become very good at answering questions and talking about different topics, because they remember patterns from all the books. The bigger their brain and the more books they read, the smarter the LLM can be!
>
> For a teenager: LLMs use neural networks to learn about language from huge datasets of text. Each word gets turned into a number called a token. The model finds patterns about which tokens appear together in sentences. It builds up a weighted network that assigns probabilities to sequences of tokens. The more text the LLM trains on, the more complex the network, as it tunes the weights to improve its predictions. When given a prompt, it passes the tokens through the network, predicts the next most likely tokens, and generates a response word-by-word. So LLMs use math to crunch big data and mimic language, without any true understanding. The more data and compute power, the more advanced the model becomes at tasks like conversation.

Not bad, but there is so much more.

## LLMs

LLMs use a technique called "self-supervised learning" to train on massive amounts of text data. The models ingest billions or trillions of words from books, websites, and other sources. They analyze the data to pick up on patterns in language usage and the relationships between words that give them meaning based on context. This allows the LLM to build up an artificial neural network that assigns probabilities to sequences of words.

When given a text prompt, the model uses that internal network to predict the most likely next word multiple times, generating a response one word at a time. The parameters of the network are tuned during training to maximize probability of generating authentic, human-like text. Larger models with more parameters that have ingested more data tend to be more capable and nuanced in their language understanding and generation. The scale of data and compute power keeps expanding to develop ever more advanced LLMs.

## Tokens

Tokens are a key component of how artificial intelligence (AI) systems Claude, ChatGPT, and Llama process and generate language. They are the basic units that AI systems use to represent words, sub-words, or characters in text data. For example, the sentence "The cat sat on the mat" would be broken down into the tokens "The", "cat", "sat", "on", "the", "mat". When training language models, the AI system reads through large datasets of text data and learns associations between tokens based on their context. This allows the system to develop an understanding of the meaning and usage of words. (Very similar to how some musical notes sound better than others depending on what the preceding notes are).

Tokens are represented numerically as vectors or embeddings. Each unique token is assigned an ID number and corresponds to a high-dimensional vector representation in the model's vocabulary. For AI systems that generate text, they take an input prompt and break it down into token IDs and then the model predicts the most likely next token IDs based on patterns learned during training.

The size of the vocabulary determines how many unique tokens are available. Larger vocabularies allow for greater diversity and complexity in language understanding and generation. However, they also require more data and computational power during training. So when you see tokens in an LLM comparison chart, this is what they are highlighting.

All of this comes down to math? YES!

If you are interested in learning more about the math (conceptually) behind AI check out this article, The Wizard of AI, behind the curtain.

## Weights

Weights are numbers that represent the strength of the connection between two nodes in the network. They are assigned to each edge that connects nodes. The weights are initialized randomly at the start of training the network, and then they get adjusted through the training process. The training algorithm (like gradient descent) updates the weights iteratively across many training iterations. On each iteration, it makes small adjustments to minimize the error and improve prediction accuracy.

The adjustment rules take into account the input data, the predicted output, and the error compared to the actual target output. So the training data directly shapes how the weights are updated. As the network trains on more data, the weights are tuned to strengthen connections that commonly appear together in the data, and weaken irrelevant connections. When new data like an expanded vocabulary is added, the model has to continue training to update the weights accordingly. New connections are added and previous ones are further refined. The number of weights in a network corresponds to the number of trainable parameters in the model. More complex models with larger vocabularies or datasets require more weights to capture all the potential relationships.

So while advanced LLMs seem to have remarkable linguistic skills, it's ultimately fancy math crunching big data that makes human-like language possible. The tokens encode the raw data, while the weights encode the learned knowledge. That's the "magic" – no real understanding, just well-tuned statistical modeling.