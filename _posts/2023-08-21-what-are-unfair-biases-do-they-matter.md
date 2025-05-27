---
layout: post
read_time: true
show_date: true
title: "What are unfair biases and do they matter?"
date: 2023-08-21
img: posts/20230821/OIG.jpg
tags: [ai, biases, compliance, llms, models, artificial intelligence, fairness]
category: ai
author: Vatché
description: "Exploring the critical issue of unfair biases in AI systems, their potential impacts, and practical strategies for detection and mitigation to ensure fair and ethical AI deployment."
---

As artificial intelligence systems grow more ubiquitous and impactful across society, ensuring they treat all people fairly has become a critical ethical priority. Left unchecked, AI risks encoding and amplifying many of the same unfair biases that unfortunately still persist in human decision-making – around gender, race, age, appearance, socioeconomic status and more.

While biased algorithms can sometimes be created unintentionally through flawed data or design, the consequences can be significant, from restricting opportunities to deepening discrimination. Proactively detecting and mitigating unfair bias in AI merits greatly increased focus from companies, governments, and civil society to ensure these emerging technologies spread benefits justly and objectively to all groups. There are important steps we can and must take today so that AI realizes its great potential to improve lives without unfairly harming vulnerable communities or groups.

## Examples of potential unfair biases that can exist in untrained AI systems

**Gender biases** – Associating certain jobs or traits with a particular gender, like doctors being male and nurses female. Using narrow gender stereotypes.

**Racial biases** – Making broad assumptions about someone's abilities, interests or preferences based on race. Having limited and stereotypical representations of different races.

**Age biases** – Assuming younger or older people have particular skills, interests or physical capabilities averaged across an age group.

**Socioeconomic biases** – Linking a person's income, education level or background with assumptions about their character or abilities.

**Name biases** – Judging someone's gender, ethnicity or class background based solely on their first name.

**Correlation vs causation errors** – Mistakenly assuming a specious correlation implies causation, such as linking ethnicity with unrelated behaviors.

The key is that untrained AI systems don't have human social context and can make these biased generalizations. Responsible training, testing and monitoring is required to address possible unfair biases.

## How to reduce biases

**Diverse and Unbiased Training Data** – Ensure training data is representative of diverse populations and is free of societal biases. Collect sufficient data from minority groups.

**Data Augmentation** – Synthetically expand undersampled groups in the training data to improve balance through techniques like oversampling.

**Bias Mitigation Algorithms** – Use algorithms like reweighting and regularization that aim to reduce reliance on biased features/data.

**Counterfactual Generation** – Synthesize new counterfactual training examples that minimize spurious correlations. Spurious correlations are associations in data that appear predictive but don't actually have a causal relationship.

**Testing for Fairness** – Continuously test models with bias monitoring metrics and datasets to identify issues.

**Explainability Methods** – Inspect models to understand what features and data are driving outputs and biases.

**Human-in-the-Loop** – Have human reviewers analyze a sample of model decisions to detect potential biases (time intensive).

**Explicit Debiasing** – Directly alter models to eliminate known biases, like removing gender as a feature.

**Robust Model Architectures** – Design model internals and training to intrinsically avoid latching onto biases.

**External Auditing** – Have independent auditors evaluate models for fairness before deployment.

The most effective approaches combine good data curation, bias mitigation algorithms, robust testing, and ongoing monitoring to minimize unfair biases both during and after model development.