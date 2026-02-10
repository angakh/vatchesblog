---
categories:
- AI
- Data Science & Analytics
date: 2026-02-10
description: A practical guide to the RAG Triad evaluation framework, breaking down
  Context Relevance, Faithfulness, and Answer Relevance as diagnostic metrics for
  identifying and fixing failures in retrieval-augmented generation pipelines.
img: posts/20260210/rag-triad.jpeg
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Data Science & Analytics
- RAG
- Technical Tutorials
title: 'Your RAG Pipeline is Lying to You: Understanding the RAG Triad'
---

About two and a half years ago I wrote an article called [AI Gets a Cheat Sheet: Retrieval Augmented Generation Explained](./ai-gets-cheat-sheet-retrieval-augmented-generation-explained.html) where I broke down what RAG is, how retrieval technologies work, and why getting your data prepped matters before you can even think about plugging this stuff in. That article was focused on the *what* and the *why* of RAG, and at the time the ecosystem was still pretty early. People were just starting to wrap their heads around vector databases, semantic search, and how all of it tied back to foundation models.

A lot has changed since then. RAG has gone from being a novel technique that most people hadn't heard of to something that is now embedded (pun intended) in production systems across industries. Companies have built RAG-powered chatbots, internal knowledge assistants, customer support systems, and document retrieval tools. The problem is that many of these systems were stood up quickly, and the teams running them don't have a reliable way to know when things are going wrong, or more importantly, *why* things are going wrong.

That's where the RAG Triad comes in.

Before we get into the framework itself, I want to make sure the terminology is clear since a few of these terms are going to come up repeatedly throughout the article. When we talk about **retrieval** in the context of RAG, we're referring to the step where the system searches through your documents, knowledge base, or other data sources to find the most relevant pieces of information based on a user's question. Think of it as the system going to look something up before it tries to answer. **Generation** is the step where a large language model (often referred to as an LLM, which is the AI model doing the heavy lifting, like GPT or Claude) takes whatever was retrieved and uses it to construct a response in natural language. The retrieval step finds the information, and the generation step turns that information into an answer. Everything we're going to talk about below evaluates how well those two steps are working together, and where things tend to fall apart.

## What is the RAG Triad?

The RAG Triad is an evaluation framework that breaks down the quality of a RAG system into three distinct metrics: **Context Relevance**, **Faithfulness** (sometimes called Groundedness), and **Answer Relevance**. Each metric evaluates a different stage of the pipeline, and each one can fail independently of the others. This is important because when your RAG system gives a bad answer, the root cause could be in your retrieval step, your generation step, or both, and the fix is completely different depending on which one is actually broken.

I've said this before in the context of security and I'll say it again here: you can't fix what you can't measure. If you're tweaking prompts and hoping the output gets better without actually measuring which part of the system is failing, you're essentially guessing. And guessing at scale, especially when these systems are customer-facing, is a great way to erode trust fast.

## The Three Legs (and How Each One Breaks)

### Context Relevance

Context relevance asks a simple question: did your retrieval step actually pull back the right documents for the user's query? This is the foundation of everything, because if the wrong context gets fed into the LLM, it doesn't matter how good your model is or how tight your prompt engineering is. The answer will be wrong from the start.

Here's an example that illustrates the problem well. A user asks "What's our refund policy for enterprise customers?" and the system retrieves your general FAQ page instead of the enterprise contract terms. The model generates a response that sounds confident and well-structured, but it's based on the wrong source material. The user might not even realize the answer is incorrect, and that's the dangerous part. The system didn't hallucinate in the traditional sense; it faithfully summarized the wrong documents.

When context relevance scores are low, the problem lives in your retrieval pipeline, and the people who need to be looking at this are typically your data engineers or ML engineers, whoever built and maintains the system that decides which documents get pulled for a given query.

The things they'd look at start with the **chunking strategy**. Chunking is the process of breaking your documents into smaller pieces before they get stored in the system. When a user asks a question, the system doesn't search through entire documents; it searches through these smaller chunks and returns the ones that seem most relevant. If your chunks are too large, the system might return a big block of text where only one sentence is actually relevant, which dilutes the quality of what the LLM has to work with. If your chunks are too small, you might lose important context because a key piece of information got split across two separate chunks that the system doesn't know belong together.

They'd also look at the **embedding model**, which is the component that converts both your document chunks and the user's query into numerical representations (called vectors) so the system can measure how similar they are. If your embedding model wasn't trained on content that resembles your domain-specific data, it might not understand the relationships between terms that matter in your industry, and the similarity scores it produces won't reflect actual relevance.

Another common fix is adding a **re-ranker** between your initial search results and the LLM. The way this works is that your vector search might return, say, the top 20 chunks that seem relevant based on similarity scores, but similarity doesn't always equal relevance. A re-ranker (tools like Cohere Rerank are popular for this) takes those initial results and rescores them using a more sophisticated model that's specifically designed to evaluate whether a piece of text actually answers a given question. The result is that the chunks that make it to the LLM are much more likely to be the right ones.

You might also look at **query rewriting**, which is where you transform the user's natural language question into something that maps better to how your documents are structured. A user might ask a casual question in a way that doesn't match the terminology used in your knowledge base, and rewriting the query before it hits the search step can dramatically improve what comes back.

### Faithfulness (Groundedness)

Faithfulness measures whether the LLM stuck to what the retrieved context actually says, or whether it started making things up. This is the hallucination metric, and it's probably the one that keeps most teams up at night because the outputs can look incredibly convincing even when they're fabricated.

The retrieved documents might be exactly right, but the model adds details, invents statistics, or draws conclusions that aren't supported by anything in the context. For instance, the context might say "revenue grew in Q3" and the model outputs "revenue grew 15% in Q3" when no percentage was mentioned anywhere in the source material. That 15% sounds specific and credible, which makes it more dangerous than an obviously wrong answer would be.

When faithfulness scores are low, the problem is in your generation step, not your retrieval. This is where the person managing the LLM configuration and the **system prompt** (the set of instructions that tell the model how to behave, what to prioritize, and what constraints to follow) needs to step in. In many teams this is a developer or an AI/ML engineer, but increasingly it's also someone in a prompt engineering or AI product role.

The fixes here look different from the retrieval side. You'd start by tightening the system prompt to explicitly instruct the model to only use the provided context when generating its response, and to say "I don't know" or "I don't have enough information to answer that" when the context doesn't contain what's needed. You'd also want to actually test whether the model follows through on that instruction, because telling it to do something and having it consistently do it are two different things.

Another lever is **temperature**, which is a setting that controls how much creative freedom the LLM has when generating text. A higher temperature means the model is more likely to introduce variety and take liberties with its phrasing, which is great for creative writing but not what you want when the goal is to faithfully represent source material. Lowering the temperature makes the model more conservative and more likely to stick closely to what it was given.

You can also improve faithfulness by filtering out low-relevance chunks before they even reach the LLM. If the model receives five chunks but only two of them are actually relevant, the other three become noise that the model might draw from when constructing its answer, increasing the chance it says something that isn't grounded in the right information.

### Answer Relevance

Answer relevance is the one that tends to sneak past teams because the system can retrieve decent context, not hallucinate at all, and still completely miss the point of what the user was asking. Someone asks "How do I cancel my subscription?" and gets a technically accurate paragraph about subscription pricing tiers. The information is correct, the model didn't make anything up, but it didn't answer the actual question.

This is often a query understanding problem, and figuring out who owns the fix can be tricky because it could be a retrieval issue, a generation issue, or both. If the retrieval step returned documents about pricing instead of cancellation, that's a retrieval problem and falls back to the data/ML engineering team. But if the retrieval step returned the right documents and the model just chose to summarize the wrong part, that's a generation and prompt engineering problem.

The system misinterprets what the user is actually asking for, or the prompt doesn't sufficiently guide the model to focus on answering the specific question rather than just summarizing whatever relevant-looking context it received. **Query classification** and **intent detection** (techniques that try to understand what the user is really asking before the search even happens) can help on the retrieval side, while better prompt engineering can address the generation side. Sometimes the fix is as straightforward as restructuring your system prompt to tell the model "answer the user's specific question, don't just summarize the context."

## How You Actually Evaluate This

The most common approach today is using an LLM as a judge. You take a separate LLM call (not the same one generating your answers) and use it to evaluate the output of your RAG pipeline. For each query, you capture three things: the original question, the retrieved context chunks, and the generated answer. Then you send those to the evaluator model with specific prompts designed for each metric.

For context relevance, you'd ask something like "Given this user question, rate how relevant each retrieved chunk is on a scale of 0 to 1." For faithfulness, you'd ask "Can every claim in this answer be directly traced back to the retrieved context?" For answer relevance, you'd ask "Does this answer actually address what the user was asking?"

Tools like [RAGAS](https://docs.ragas.io/), [DeepEval](https://docs.confident-ai.com/), and [TruLens](https://www.trulens.org/) have these evaluator prompts built in so you don't have to write them from scratch. You run them against a dataset of real or synthetic queries and get scores for each dimension. This is not a one-time exercise either; you want to be running these evaluations regularly, especially as your document corpus changes, as your chunking strategy evolves, or as you swap out models.

You can also layer in human evaluation where actual people review a sample of outputs. This is more expensive and slower, but it catches things that LLM judges miss. Most mature teams that I've talked to do both: automated eval for coverage and speed, human eval for calibration and edge cases.

## The Key Insight

The thing that I keep coming back to is that the RAG Triad gives you a diagnostic framework, not just a quality score. When something goes wrong (and it will), you can pinpoint whether the problem is in retrieval, generation, or query understanding, and then target your fix accordingly. This is fundamentally different from the approach I see a lot of teams taking, which is essentially just tweaking prompts randomly and hoping the output looks better on the next batch of test queries.

It reminds me a lot of what I've seen in security over the years. You can't just throw tools at a problem and hope it goes away. You need to understand the system as a whole, identify where the actual vulnerability is, and then apply the right remediation. The RAG Triad is that diagnostic layer for your AI pipeline.

If you're building or maintaining RAG systems and haven't started thinking about structured evaluation yet, I'd strongly recommend looking into RAGAS or DeepEval as a starting point. The setup time is minimal compared to the visibility you get, and once you can see which metric is failing, the path forward becomes a lot clearer.

As always, let me know what you think. If you're evaluating RAG systems in production, I'd love to hear what's working and what's not. You can find me on [LinkedIn](https://www.linkedin.com/in/chamlian/).
