---
layout: post
read_time: true
show_date: true
title: "Making Sense of Your Data for AI Success"
date: 2023-09-15
img: posts/20230915/claudio-schwarz-fyeOxvYvIyY-unsplash.jpg
tags: [ai, data-privacy, data-science, email, generative-ai, llms, teams, machine learning]
category: data-analytics
author: Vatché
description: "A comprehensive guide to organizing structured and unstructured data for AI implementation, including team requirements, tools, and strategies for successful AI adoption."
---

You just got a call, someone very important to you is coming over in an hour. Now I know most of you will not agree with this example but in my house that means we have one hour to get the place cleaned up, get something to serve my guests and don't greet them looking like I just ran a marathon. For your business AI is that guest. And your house is the data you have.

For businesses looking to adopt AI, getting a handle on your data is crucial. AI systems rely on quality data to deliver accurate insights and automation. But understanding the difference between unstructured and structured data, and how to wrangle each type, can be confusing. We will clarify what structured and unstructured data are, provide examples of each, explain why both matter for AI implementation, and suggest steps you can take to organize your data for AI readiness.

## Structured data – organized and consistent format

It is easy for computer systems to interpret. Examples include data in fields within a database, such as customer names, addresses, product IDs, and sales transaction amounts, etc. Structured data also includes tagged image files with embedded metadata, sensor data with timestamps, and content with consistent metadata labeling. In its simplest form you can think of a spreadsheet that has columns for each piece of data, making it much easier for humans and AI to parse through.

## Unstructured data – not unorganized just more complicated

In contrast, unstructured data has no predefined structure or organization. It comes in many formats and does not fit neatly into database fields or excel columns. Examples include emails, social media posts, digital photos, videos, audio files, and Word documents. While messy for computers to interpret, unstructured data makes up over 80% of all business data.

## Both types of data offer value for AI

Structured data can train AI models and power analytics, while unstructured data provides the raw material for AI to generate insights about patterns, topics, sentiment, and more. Combining these data types enables a more powerful AI application. An example of this would be; using natural language processing (NLP) on emails and documents (unstructured data) along with customer data (structured data) to improve service interactions. This is not always the case, I think we have all come across CRMs where the "structured data" is not exactly clean. Think of this as high-interest debt. An AI advisor, just like a financial advisor would tell you, before you invest in anything, get rid of your high-interest debt. That doesn't mean get rid of your data, it just means clean it up.

This could mean that the first step in your AI application is using AI to help you clean up your data. With the right data foundations in place, your business can fully leverage AI to enhance operations, analytics, and customer experiences. But what will it take to get there?

As you work to organize your data, you'll need to weigh trade-offs between different approaches. Structured data is easier to work with but may lack the depth of unstructured data, so focusing solely on one data type can provide limited insights, while going too far with unstructured data can cost you time and money.

The implications of prioritizing structured vs unstructured data include:

- **Structured data** alone may miss nuanced insights in unstructured text and content. But it's faster to prepare for analysis.
- **Unstructured data** offers a richer picture but requires more data science skills to clean and interpret. It may also need more storage capacity.
- Blending data provides multidimensional insights but requires both database admin and data science expertise. It also necessitates connecting different data systems.

To make the most of AI, you'll need people who can wrangle your structured data into well-organized databases and who possess data science skills to glean insights from unstructured text, images, audio, and video.

I do my best to keep things high-level but there are times when a short field-trip to the tech side may prove to be useful. For this example we will be operating under the assumption that a client wants to use all their sales and support emails to help train an AI model that will help them communicate with their existing and potential clients.

---

## Who you would need to hire

In a perfect world if you were to do this in-house you would need to hire for a lot of different roles.

**Data Engineer**

- Skills in Python, SQL, ETL, data pipelines to collect, clean and prepare email data.

**NLP Engineer**

- Expertise in natural language processing techniques like tokenization, entity extraction, sentiment analysis etc.
- Skills in Python libraries like NLTK, SpaCy, Gensim.

**ML Engineer**

- Strong math and algorithm skills – regression, classification, clustering.
- Experience with libraries like Scikit-Learn, PyTorch, TensorFlow.
- Model evaluation, optimization and deployment skills.

**Data Annotation Specialist**

- Linguistic skills to manually tag and label emails for model training.
- Detail oriented to label data based on guidelines.

**Project Manager**

- Technical expertise to lead modeling projects.
- Stakeholder management and communication skills.

**MLOps Engineer**

- Skills to build ongoing model monitoring, retraining and deployment pipelines.
- DevOps skills with CI/CD tools like Jenkins.

**Domain Expert**

- Understands the company's business, customers and how emails relate.
- Provides key inputs on model objectives, evaluation.

### Experience with these tools can be helpful

- Google's TensorFlow and BERT provide strong pre-trained NLP models that can be fine-tuned on email data.
- Amazon SageMaker helps quickly build, train, and deploy ML models with little coding.
- Microsoft Azure ML Studio has drag-and-drop model building capabilities.
- MonkeyLearn, Transformer, Nanonets provide APIs for email entity extraction, classification, sentiment analysis.
- Open source libraries like Scikit-Learn, NLTK, Spacy useful for text processing and ML.

## Team, check! Now what?

The team would need to go through the following steps to help your company adopt AI with better email responses using your own data. The key considerations are getting clean and representative data, extracting good features, proper labeling, tuning models and evaluating rigorously before production use. The mantra "crawl, walk, run" applies here.

1. **Data Collection**: Gather a sufficient sample of client emails to train your model. Make sure to get enough emails to properly represent the scope of client conversations.
2. **Preprocessing**: Clean and preprocess the emails – remove signatures, disclaimers, quoted replies etc. Tokenize the emails into words. This is a good opportunity to remove PII. ([here](https://huggingface.co/spaces/laiyer/llm-guard-playground) is a quick example of using an LLM to remove PII from some text)
3. **Feature Extraction**: Extract relevant features from the cleaned emails that can train the model well. These can be bag-of-words, TF-IDF vectors, word embeddings, sentiment scores, named entities etc.
4. **Labeling**: Manually label or annotate the emails for the task you want to train for. For example, label emails for topic classification, sentiment analysis, urgency detection etc.
5. **Train-Test Split**: Split the labeled dataset into a training and evaluation set like 80% training, 20% test.
6. **Choose Model**: Pick a suitable ML model like Logistic Regression, Naive Bayes, CNN, LSTM etc. depending on your task and dataset size. Start simple.
7. **Train Model**: Train the model on the training set by feeding it the preprocessed emails and labels. Tune hyperparameters to optimize training.
8. **Evaluate**: Assess the model performance on the test set using accuracy, precision, recall or F1-score. See if additional tuning or data is needed.
9. **De