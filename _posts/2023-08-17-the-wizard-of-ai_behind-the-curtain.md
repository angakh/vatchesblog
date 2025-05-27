---
layout: post
read_time: true
show_date: true
title: "The Wizard of AI – Behind the curtain"
date: 2023-08-17
img: posts/20230817/Wizard-of-oz.jpg
tags: [ai, embedding, llms, vectors, weights, artificial intelligence, machine learning]
category: emerging-tech
author: Vatché
description: "Demystifying the mathematical foundations behind AI and large language models - exploring vectors, embeddings, and the computational processes that power modern AI systems."
---

Spoiler alert! In the Wizard of Oz, the audience and the protagonists of the story find out that the "Wizard" of Oz is an old man that hides behind a curtain speaking into a microphone. Who is the Wizard behind the curtain in AI? It is the math. A lot of the people that I engage with that have used AI tools have an adverse reaction to any statement that dismisses the wonder of AI and summarizes it with "it really comes down to math".

The text data that LLMs train on first gets converted into numerical representations using vectors and embeddings. Each unique word or token gets assigned a vector of numbers that encodes its meaning based on contextual patterns.

## Vectors and embeddings?

**Vectors** are arrays of numbers that represent an object like a word or token in multi-dimensional space. For example, a 300-dimension vector could represent the word "apple" (don't worry I will explain more in a minute).

**Embeddings** are the actual vector representations learned for words during the training process. Each unique word gets mapped to a dense vector encoding its meaning based on the contexts it appears in.

**Vector embeddings** help LLMs understand relationships and similarities between words. Words used in similar contexts will have vector representations that are close together mathematically. Distance metrics like *cosine similarity* can be used to compare two word vectors. Words with similar meanings will have higher cosine similarity between their vector embeddings. Learning good embeddings is key to the performance of LLMs. The embeddings essentially encode the semantic knowledge that the model extracts from all the training text data. Higher dimensional embeddings can encode more nuanced distinctions between words, but require more data and computation.

**Example of analogical reasoning using vector operations**  
vector("King") – vector("Man") + vector("Woman") results in a vector close to vector("Queen").

Another example would be the word "apple". The model when using the word apple in a sentence does not know the word is edible, it certainly doesn't know what it tastes like, or that a bruise on it is not favorable. But it does know that there are similar contexts like "fruit", "orchard", "pie", etc. These are similar vector representations.

The neural network within the LLM consists of many interconnected nodes with weighted connections between them. These weights are numerical values that represent the strength of correlations between nodes based on the training data. As new text flows through the network, mathematical operations multiply and sum these weights to predict the next most probable word or token in a sequence.

The output is a probability distribution over the vocabulary. Optimization functions like gradient descent are used during training to tune the weight parameters to minimize error and maximize prediction accuracy across the entire network. In the end, the knowledge gained by an LLM emerges from these aggregated mathematical operations on numerical data representations. In short, the network processes the language statistically and probabilistically. (See? It's not magic, it's math!)

While LLMs can generate remarkably human-like text, the inner workings are fully based on mathematical concepts and not true human-like understanding. The math just allows them to statistically mimic linguistic patterns present in the training data. This is an important distinction because a lot of people are under the assumption that these systems are "thinking" in the same way that we think. Although the words that come out of LLMs sound human, maybe even better than some of our writing skills, the "thought" behind it is purely mathematical.

## Why does the math have to be so complex?

There are a few key reasons why the underlying math tends to become more complex as large language models develop better language abilities: Larger datasets require more parameters and computations to find patterns. The models need larger neural networks, which means more nodes, connections, and weights to optimize during training. This expands the mathematical operations. More advanced neural network architectures have been introduced that increase computational complexity.

For example, the Transformer architecture uses attention mechanisms and self-attention layers that require extensive vector matrix math. Models are expanding beyond just processing words to now incorporate multi-modal data like images, audio, video, etc. Fusing together different data modalities requires more advanced mathematical techniques. Models are moving from just generating text to more advanced reasoning, planning, and decision making.

Mathematical operations based on graph theory, causal inference, and strategic optimization help with these higher-level cognitive capabilities. Pathfinding algorithms are being incorporated so models can gather external information to improve responses rather than just rely on internal training data. This requires mathematically intensive search processes. To scale up, researchers are exploring new techniques like mixture-of-experts models, sparse neural networks, and quantization which add mathematical complexity. As models become more capable, interpreting their internal representations and decisions becomes more challenging. Advanced math for explainability and transparency is needed.

In essence, to make large language models more and more capable, open-ended, and human-like, the underlying math to support their training, architecture design, and capabilities needs to scale up in complexity as well.