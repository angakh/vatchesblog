---
layout: post
read_time: true
show_date: true
title: "Prompt Engineering: 10 Fatal Flaws & 3 Templates That Work"
date: 2025-03-09
img: posts/20250309/prompting.jpeg
tags: [prompt engineering, artificial intelligence, AI writing, coding, templates, best practices]
category: opinion
author: Vatché
description: "Learn from common prompting mistakes and use proven templates for writing and coding. Transform your AI interactions from frustrating to effective with these practical approaches."
---

In this post we will cover some common mistakes I have seen people make in my training sessions and lunch-n-learns. I will also be providing you with some of the prompting methods that I have used successfully.

When search engines first came out, people were typing into them conversationally. The search engine had to parse out the extra words and find the user what they were looking for. Searches looked like: "I need help with changing my faucet, it is leaking everywhere". And as people got better with search the search query would look like "replace faucet how-to". This became a skill, identifying the key words on your own and getting the best search results because of it.

But generative conversational AI is the opposite. The more context you can provide, the clearer you are with what you are looking to get out of this conversation, the better your results will be. So as my Sifu Yon Lee used to tell me:

> "empty your cup, it is time to learn something new"

## Mistakes were made

These are the top ten most common mistakes, they are not in a particular order but I would definitely put vague or ambiguous at the top if it were ranked.

**Using vague or ambiguous requests**: Specific instructions with examples yield much better results than general queries.

**Overloading with multiple questions**: Asking several unrelated questions in one message often results in incomplete answers or overlooked points.

**Providing insufficient context**: The AI doesn't know your specific situation unless you explain it. Without proper context, responses will be generic.

**Expecting perfection without iteration**: The best results often come through a refinement process rather than expecting the perfect output immediately.

**Neglecting to specify format requirements**: If you need information presented in a particular way (bullet points, tables, code), specify this upfront.

**Failing to set constraints**: Without parameters like length, tone, or audience, the AI might produce content that doesn't match your needs.

**Abandoning conversations prematurely**: When responses aren't quite right, providing feedback helps the AI adjust rather than starting over.

**Assuming perfect recall**: While these systems can reference conversation history, they may not perfectly recall every detail from earlier exchanges.

**Not using system prompts for complex tasks**: Establishing a framework upfront (like a collaborative coding workflow) creates more efficient interactions.

**Treating AI as a search engine**: These systems work best as reasoning partners rather than fact retrieval systems, though many can now use search tools when needed.

<tweet>Prompt engineering isn't about finding magic words—it's about clear communication and understanding how AI systems think.</tweet>

## The iterative approach

If you had a particular thing you were working on and you were using tools like Claude or ChatGPT, you may have found yourself going back and forth until you got the result you wanted. Sometimes the process was fun and maybe the "mistakes" that the LLM made were interesting and took you in a new direction. Or maybe you were frustrated because you felt like the iterative process was taking too long, "I thought this was supposed to make my life easier." But the biggest missed opportunity is ending the conversation when they got what they wanted. "Ah, this is what I was looking for," and then they copied/pasted and moved on.

### Take a minute

You just spent fifteen minutes going back and forth with a machine and you got the two paragraphs you wanted just right, or the code snippet finally works. In general, but especially when you are first starting out, take a minute and paste this into the chat:

```
I'm satisfied with this result. To help me improve future interactions:
What specific elements in my initial prompt were most effective?
What was missing or unclear that would have helped you understand my request faster?
Are there any examples or additional context I could have included?
What assumptions did you make that I could have clarified upfront?
Based on your answers to these questions and our conversational history, provide me with a better prompt that would achieve this result more efficiently.
```

If you have some more time, try pasting the newly generated prompt into a new chat and see how close you get to what you were looking for in your previous chat. Once you have done that, you will have a much better idea for what your particular LLM is expecting. In addition to this, once you have honed in on a prompt structure that works for you, you can also ask for a template prompt based on that.

<tweet>The best prompt engineers don't just get good results—they ask the AI how to get those results faster next time.</tweet>

## For writing

When it comes to writing, one of the things I would recommend is taking your previously written material and paste it into a text file. If it is a pdf, word doc, etc. Just select all and copy/paste into a text file. The format doesn't really matter and the point of doing this is so that you can provide the LLM with examples.

Then you can try the following prompt:

```
I need help writing [type of content: essay, blog post, story, etc.] about [topic].
Audience: [describe who will read this - their background, expertise level, interests]
Purpose: [explain what you want to achieve - inform, persuade, entertain, etc.]
Tone: [specify desired tone - formal, conversational, humorous, technical, etc.]
Length: [approximate word count or number of paragraphs]
Structure: [any specific sections or format requirements]
Key points to include:
1. [first important point]
2. [second important point]
3. [third important point]
Examples of my style: [optional: include samples of your writing]
Additional notes: [any other requirements, constraints, or preferences]
Please draft this content focusing on clarity and engagement for my specified audience.
```

## When it comes to coding

There are a few things that need to be considered. First and foremost if you are doing this for work, you must check with your manager to ensure that whatever requirements you are putting into the chat are not restricted. If your company has its own private LLM application(s) it won't matter, but it is always best to check.

Secondly, using a chat session to develop something that has not been thought out is a waste of time and resources. One of the reasons why I like this process is because it forces you to think about how you want to approach this particular problem. That is not coding or programming, that is technical design or solution architecture. You can use LLMs to help you with that too.

Here is the prompt template I have created for new programming projects:

```
I need help developing [Language e.g. python] code for [specific project/task]. Let's follow this collaborative process:
First, I'll explain what I'm trying to build: [briefly describe your project goal]
Before writing any code, please outline your recommended approach including:
Overall architecture/structure
Key libraries/frameworks you suggest using
Data flow or major processing steps
Any potential challenges or alternative approaches to consider

Once we agree on the approach, let's implement one file at a time.
For each file:
Suggest the filename and purpose
Explain your implementation plan for this specific file
After my approval, write the complete code with helpful comments
Wait for my questions or revision requests before finalizing

After each file is complete, ask if I have questions before moving to the next file.
Continue this process until the entire project is complete.
Let's start with my project description: [your detailed description]
```

There are a few things worth noting with the above prompt:

- A lot of times the LLM will just start coding, even though you have explicitly told it not to. I am not sure why this happens but it happens a lot. Most systems have a "stop" button, use it. Once it has stopped remind it to continue in the proper fashion.
- Checking the approach provides you with an opportunity to understand the direction the LLM is intending to move in, you will be able to ask clarifying questions, reinforce particular requirements, etc.
- One file at a time, the number of tokens that can be used during output are limited, by doing one file at a time you are lessening the load for the response and you are giving yourself a chance to modify the code before moving on.

For example if you added a new argument in a function, you would have to update the arguments that are being passed to that function from one of the other files. So reviewing the output of the code is essential and will save you a lot of time and headache moving forward.

<tweet>The secret to successful AI coding isn't faster prompts—it's structured conversations that force both you and the AI to think before writing.</tweet>

## The meta-skill of prompting

What we're really talking about here isn't just prompting—it's a fundamental shift in how we communicate with intelligent systems. The best prompters aren't those who memorize magic phrases, but those who understand that AI systems are reasoning partners that need context, constraints, and clear objectives.

The evolution from search keywords to conversational prompting mirrors our broader relationship with technology. We're moving from commanding machines to collaborating with them. The people who master this collaboration will have a significant advantage in an AI-powered world.

Remember that prompting is ultimately about clear communication. The same principles that make you a good communicator with humans—being specific, providing context, setting clear expectations—apply to AI systems. The difference is that AI systems are infinitely patient and will engage in as many iterations as you need to get the result right.

The templates I've shared here are starting points, not final destinations. Use them as scaffolding to build your own approach. Pay attention to what works for your specific use cases, and don't be afraid to experiment. The field of prompt engineering is still young, and there's plenty of room for innovation.

Most importantly, approach AI as a partner in thinking, not just a tool for output. The most powerful applications of AI come from leveraging its ability to reason, not just its ability to generate text or code. When you prompt with this mindset, you'll find that the AI becomes not just more useful, but more creative and insightful as well.

I hope these methods are helpful, your feedback is always welcome.