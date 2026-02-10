---
author: Vatché
category: ai
date: 2023-09-06
description: A comprehensive guide to Retrieval Augmented Generation (RAG), exploring
  how this technique enhances AI models by combining foundation models with external
  knowledge retrieval systems.
img: posts/20230906/jaredd-craig-HH4WBGNyltc-unsplash-scaled-e1693973271770.jpg
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Data Science & Analytics
- Privacy & Ethics
- RAG
title: 'AI Gets a Cheat Sheet: Retrieval Augmentation Explained'
---

After [Shaun Scovill](https://shaunscovil.com/) introduced me to Retrieval Augmented Generation (RAG), I dove in deep. Having now spent time with it, I want to explain RAG for those that don't know what it is and why this technique is so important. Before getting into what RAG is, I want to make sure you understand the concept of foundation models in AI. Foundation models are large, multi-purpose AI models trained on massive data which serve as a common basis for developing specialized applications. Think of them like a broad foundation on which you can build different vertical solutions.

GPT, LLama, Claude, and PaLM2 are foundation models trained generally on text data which can then be adapted for different downstream uses like summarization or dialog. Other examples are image recognition models trained on ImageNet or robotic control models trained across various physical tasks. The foundation models are just that, the foundation to do other things. This is important because the data on which foundation models use is not going to pertain to your business, or your specific project.

Now that we have that foundation model basis, let's talk about retrieval augmented generation. RAG combines these large foundation models like GPT with a retrieval system to lookup relevant information to augment the model's text generation. This could include but is not limited to; more current information, business specific data, etc. This allows the system to incorporate real facts and data into its outputs, instead of just its training data. For example, a RAG chatbot could search a knowledge base to have more meaningful dialog grounded in specific information.

The **retrieval** component of RAG relies on specialized databases optimized for semantic search – finding information based on meaning and concepts, not just keywords.

## Retrieval technologies and vectors

**Vector Databases** store data as dense vectors representing semantic context. They allow ultra-fast similarity searches by vector proximity. Options include open source pgvector and Pinecone, or cloud services like Azure Cognitive Search.

> RAG in Azure Machine Learning is enabled by integration with Azure OpenAI Service for large language models and vectorization, with support for Faiss and Azure Cognitive Search as vector stores, and support for open source offerings tools and frameworks such as LangChain for data chunking.

**Semantic Search** directly indexes text by semantic content. Queries can match information without keyword overlap. Vendors like qdrant use semantic indexing for precise search.

**MindsDB** takes a different approach, acting as an auto-ML layer that provides predictive queries without needing manual search optimization.

So which retrieval technology should you use? It depends on your use case:

- Vector databases excel at speed and precision for RAG. Pinecone and pgvector are leading options.
- Semantic search better handles complex textual data. qdrant is a top open-source choice.
- MindsDB is great for predictive analytics integrated with RAG.

The key is choosing a high-performance retrieval engine that can understand queries contextually. This provides the optimal informational augmentation for foundation models in RAG systems.

## Qdrant vs Pinecone

- Qdrant is open source and is usually self-hosted, while Pinecone is a paid managed cloud service.
- Qdrant uses hybrid vectors for efficient similarity search, whereas Pinecone uses its patented "holographic embeddings".
- When it comes to scale both Qdrant and Pinecone can handle a lot of data, we have yet to conduct an analysis of the cost associated with this since one option is primarily self-hosted and the other is managed, getting an accurate cost is difficult for us at this time.

For more information on Qdrant and Pinecone you can check out their sites.

- [Qdrant](https://qdrant.tech/)
- [Pinecone](https://www.pinecone.io/)

## What retrieval augmentation is and isn't…

### What Retrieval Augmentation Is

It combines large pre-trained language models like GPT with a retrieval system – like using a custom search engine to find relevant information, fact-check, and provide context. The language model generates text while the retriever looks up helpful external information to augment the generation (hence the name retrieval augmented generation). Each company has so much data and now it can be used privately to augment your AI solution.

**Here is an example**

Verizon has a support chat bot, they have historical data from all the support tickets, calls, and chats. In addition to that they have chat history for each user that has been authenticated. With RAG that chat bot can leverage the foundation model (like ChatGPT) and RAG (which contains all the data above) including that specific user's chat history. Now when that user asks a question the AI will have all previous related support tickets and conversations to reference when offering a solution, it will also have access to that user's previous chat history and be able to reference the past if/when necessary.

### What It's NOT

This is not just a plugin that you can activate (though Microsoft's solution comes close). Implementing retrieval augmented generation (RAG) will require guidance and assistance to properly integrate it into your AI workflow. I often use an analogy that I apologize in advance for those who have heard me say it in meetings many times before. When you want to cook something, it is always better to prep your ingredients in advance – the spices measured out, the portions cut, chopped, etc. That way, when it is time to start cooking, you can concentrate on creating the dish rather than prepping.

Similarly, you need to get your data prepared (formatted in a way that will minimize token consumption) before you can effectively leverage RAG. The retrieval component requires well-organized, high-quality data to augment the foundation model optimally. So don't think you can just plug RAG in on day one. Work on curating and structuring your knowledge bases first. That will set you up for success when the time comes to turn on RAG and elevate your AI to the next level.

## Here are some ways you can try it out on your own

- Amazon Sage Maker – [Learn more](https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html)
- Azure ML + OpenAI – [Learn more](https://learn.microsoft.com/en-us/azure/machine-learning/concept-retrieval-augmented-generation?view=azureml-api-2)

## More examples of where RAG has helped AI models

**Titan** would be considered a RAG technique, it was developed by Anthropic as a modification/constraint applied to their foundation model Claude to make it more truthful, harmless, and honest. Applying safety constraints to generative AI aligns with the goals of responsible AI, which is one of the reasons we recommend Claude over chatGPT when it comes to writing assistance.

**Stable Diffusion** could fall under the umbrella of RAG research. Although it is an image generation model rather than a language model, efforts have been made by the developers to enhance safety, mitigate bias, and allow user control over outputs, this is done by leveraging RAG.

**Midjourney**, which is also focused on image generation rather than language, has incorporated techniques to detect and avoid generating problematic or biased content. The team emphasizes ethical AI principles. If you have not followed the story of Midjourney you should check it out, the founder refused to take VC money and with a small group created a very disruptive company that is now valued at +1 Billion, with $250 Million in revenue in less than a year.

---

Overall, retrieval augmentation makes language models smarter and more capable of nuanced dialog by complementing their generation with external information lookup. By leveraging RAG, AI image generation tools are able to adhere to safer generations that fall within proper guidelines. This combines the creative power of neural networks with the precision of search engines. It helps dramatically decrease hallucinations (when the AI just makes $#@% up) and provides your end users with a much more useful AI tool. In addition to all of the above, it keeps your employees in your AI sandbox as opposed to them providing your private documents to an external AI tool.