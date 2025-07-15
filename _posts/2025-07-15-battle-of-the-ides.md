---
categories:
- AI
- Development
date: 2025-07-15
description: A hands-on review of AI-powered IDEs, from incumbents like VS Code to the new Kiro IDE from Amazon.
img: posts/20250715/battle-of-the-ides.jpeg
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Development
- Opinion
title: 'Battle of the IDEs!'
---

When ChatGPT first came out, one of the first things I did with it was ask it to write me code. This was two years ago and a lot has changed. First it was extensions in VS Code, then it was good extensions in VS Code, then it was github, Cursor, and now Kiro. We are going to cover my impressions of these tools in this article but before we do, I'd like to suggest something for new and junior developers. These tools can accelerate what you do, but you understanding what they do, why it is good, why it is not so good, if it is secure or if the code is highly exploitable...is very important. This comes with experience, but that should not stop you from using these tools. Instead I would recommend that when you are working on something, to ask the assistant to explain it to you. Or maybe try writing it yourself first and then see what changes it makes, ask it why it made those changes. Stay curious.

The tools that I have tested are as follows:
- VS Code with Augment
- VS Code with CoPilot
- Cursor
- Kiro
- Claude Code

## VS Code with Augment or CoPilot

If you are used to working in VS Code, this is one way you can stay within your comfort zone and try the different AI tools that are at your disposal. Personally I felt that in this match up Augment surpassed CoPilot purely based on its context. The interface with Augment is fairly easy it provides you with explanations using natural language for prompting and inline code changes that look a lot like cherry picking commits. "Do you want to accept this change?" vs it just writing everything for you. As it goes through your code and starts to make "changes" (you have to accept the changes for them to be applied) you get to see what the changes are. At the end of the vibe coding or as Dharmesh calls it "Pair coding" session, it will provide you with an update as to what it did, why it did it, and how you can verify or test the changes. In addition to this, it gives you the option to apply all the changes it has made, or you can open up each file and accept the changes one by one.

CoPilot does very similar things but it had a lot of issues for the problems that I was trying to solve, the context was not there. It was making changes in what seemed like a vacuum.

### The Extension Philosophy

This represents the "evolution" approach to AI integration—taking what works and gradually adding AI capabilities. VS Code's strength lies in its massive ecosystem with over 30,000 extensions and millions of users, offering proven stability and extensive customization options. However, these AI features can feel bolted-on rather than native, and you're limited by legacy architecture decisions that weren't designed with AI-first workflows in mind.

### Performance Considerations

Both Augment and CoPilot require network bandwidth for cloud-based AI processing, which can introduce latency that affects typing responsiveness. For enterprise development, consider that your code is being sent to external servers, which may raise privacy and security concerns depending on your organization's requirements.

## Kiro

Kiro is very similar to Cursor in the sense that you install, you import from VS Code (if you want) and it is ready to go. It has a cool splash page when you launch the IDE where you can Vibe or Spec. Vibe is for when you have a particular task you want to accomplish or you want to prototype something. Spec is when you use natural language to plan out what you are trying to do, ideate and then build. This is similar to how replit and lovable approach coding. It is a robust IDE but feels lightweight. But its ability to understand your codebase is not 100% there. For example I asked it to review the code for ieps.ai and provide me with some insight into what my application does. It broke everything down to the best of its ability but it totally missed an entire layer of complexity. I am using S3 buckets for storage and it assumed that everything was stored locally. It also missed lambda function calls and conversational agents.

### Amazon's Entry into AI-Powered Development

As Amazon's entry into the AI IDE space, Kiro brings some interesting innovations but also reveals the challenges of building truly context-aware development environments. The **Vibe and Spec modes** represent a thoughtful approach to different development workflows—whether you're quickly prototyping or doing more structured planning.

### Context Limitations and Learning Curve

While Kiro offers more setup and configuration options than plug-and-play solutions, providing deeper customization for teams willing to invest the time, the context understanding issues highlight a common challenge across AI-powered IDEs. The fact that it missed critical infrastructure components like S3 buckets and Lambda functions suggests that even sophisticated AI systems can struggle with modern distributed architectures. This emphasizes the importance of maintaining your understanding of what the AI is doing rather than blindly trusting its analysis.

## Cursor

The sad thing about VS Code's implementation is that Cursor feels like what VS Code should have been. You can import your settings from VS Code and now you have what behaves like VS Code but the AI is already built in. Cursor's context capability and coding is extremely well rounded but like many of the LLMs that try to code, it sometimes falls short. Things like dependencies, even errors in syntax can be common. I am sure as time goes on all of these LLMs will get better but depending on what you are working on, these can be a real hinderance and counter productive. Remember the whole point of using AI in coding is to help you move quickly, but if you are spending more time troubleshooting the code that you didn't write, that you don't understand, what are you really doing?

### The AI-First Philosophy

Cursor represents the "revolution" approach—designed from the ground up with AI collaboration in mind. It's not trying to retrofit AI into an existing editor; it's built specifically for the AI era. This means:

- **Cohesive AI integration** throughout the entire development experience
- **Modern architecture** optimized for AI features from day one
- **Multi-model support** letting you choose between different AI providers
- **Seamless AI chat integration** without leaving your coding context

### The Modern Developer Experience

Cursor feels like what an IDE should be in 2024, with a clean, modern interface that doesn't feel cluttered with legacy features. The **visual diff interface** shows exactly what the AI wants to change before you accept it, and the **intelligent code editing** can modify existing code based on natural language instructions. However, as noted, the smaller ecosystem and potential for AI-generated errors means you need to stay vigilant about code quality.

## Claude Code

In my opinion Claude Code is the closest to having someone you trust working next to you. The interface is not ideal for many, its CLI (command line interface), but for someone who grew up on vim, it feels like home. Claudes reasoning, context, and ability to code surpass all of the above options. When it starts to tackle a problem it provides you with an approach and asks if you agree with it before it starts. It shows you how many tokens it is using and provides you with a summary of what it just did. It is awesome! BUT! There are two drawbacks that I hope get resolved soon. For those that are working on Windows OS, they will need to have virtualization enabled, install ubuntu (via microsoft store, not that bad but still its an extra step) and it doesn't have a chat history. As you reach the limit of its contextual window you will get a context percentage at the bottom of the prompt window and as it starts to countdown you will begin to sweat.

Over a decade ago I committed this code to github: [screenrc](https://github.com/angakh/screenrc). I was working for a presidential campaign in Boston and the internet we had at the headquarters of this campaign was line of sight to the prudential building. This meant that crappy weather would disrupt your connection. If you were ssh'd into a remote box running something and got disconnected your work was lost. So I used "screen" and it was helpful. I am sharing this because if you are one of the unfortunate ones that only has access to a windows machine you may want to run screen in ubuntu and have a few "tabs" open as you work. You can have one for claude code, one for git commits, etc.

### The Conversational Approach

Claude Code represents a fundamentally different philosophy—**conversational interface** that feels like pair programming with an expert rather than just autocomplete on steroids. The **deep reasoning capabilities** mean it can explain not just what code does, but why, and the **safety-focused design** helps avoid common security pitfalls.

### Terminal-Native Benefits and Challenges

The **terminal-native approach** makes it lightweight and fast, easily integrated into existing workflows, and perfect for remote development. However, the lack of chat history and context window limitations can be frustrating during longer coding sessions. The Windows setup requirements (virtualization and Ubuntu) add friction for some developers, but for those comfortable with command-line environments, it offers an unparalleled collaborative coding experience.

### The Trust Factor

What sets Claude Code apart is its transparency—showing token usage, asking for approval before major changes, and providing clear summaries of actions taken. This builds trust in a way that black-box autocomplete systems simply can't match.

## The Real Battle: Philosophy vs. Features

This isn't just about which tool has the most features—it's about fundamentally different philosophies of how AI should integrate into development workflows, and from what I've seen from hands-on experience, each approach has real-world implications.

### The Extension Approach (VS Code)

VS Code represents the "evolution" philosophy: take what works and gradually add AI capabilities. This approach offers:

**Pros:**
- Familiar interface for existing users
- Massive ecosystem and community
- Proven stability and reliability
- Freedom to mix and match AI providers

**Cons:**
- AI features can feel bolted-on (as experienced with CoPilot's context issues)
- Potential for feature conflicts
- Limited by legacy architecture decisions
- Inconsistent AI integration across different extensions

### The AI-Native Approach (Claude Code, Cursor, Kiro)

These tools represent the "revolution" philosophy: design for AI-first workflows from day one.

**Pros:**
- Cohesive AI integration (Cursor's seamless experience)
- Modern architecture optimized for AI features
- Consistent user experience
- Purpose-built for AI collaboration (Claude Code's conversational approach)

**Cons:**
- Smaller ecosystems
- Less proven in production environments
- Potential vendor lock-in
- Learning curve for existing developers
- Context understanding limitations (as seen with Kiro missing infrastructure components)

## My Take: What Actually Matters

After testing all these tools extensively, here's what I've learned:

**Context is King**: The tools that understand your entire project (like Augment) consistently outperform those that work in isolation. When CoPilot was making changes "in a vacuum," it became clear that AI without proper context is just fancy autocomplete.

**Trust Through Transparency**: Claude Code's approach of explaining its reasoning and asking for approval creates a collaborative relationship rather than a master-servant dynamic. You learn while you code.

**The Debugging Tax**: Remember, if you're spending more time troubleshooting AI-generated code that you don't understand, you're not actually moving faster. This is especially important for junior developers who might be tempted to accept everything the AI suggests.

**Interface Matters Less Than You Think**: While Cursor's modern UI is appealing, Claude Code's CLI approach proves that good AI collaboration transcends interface preferences. What matters is the quality of the AI's reasoning and its ability to work with your specific codebase.

## Practical Recommendations

### For Individual Developers

If you're comfortable with VS Code and want to start gradually, **Augment** provides the best context-aware experience within a familiar environment.

For those ready to embrace AI-first development, **Cursor** offers the most polished experience, but be prepared to verify and understand the code it generates.

If you're comfortable with command-line interfaces and prioritize AI reasoning quality over flashy UIs, **Claude Code** provides the most trustworthy collaborative experience.

### For Teams and Learning

**Claude Code** is excellent for learning because it explains its reasoning, making it ideal for junior developers who want to understand not just what code does, but why.

**Cursor** works well for teams that need a modern, collaborative environment with good visual feedback on changes.

Avoid tools with poor context understanding (like Kiro missing key infrastructure) for complex projects—the time spent correcting misunderstandings negates the productivity benefits.

## The Bottom Line

The "winner" depends entirely on your workflow, experience level, and what you value most. For me it is hands-down Claude Code and it's not even close. But regardless of which tool you choose, remember to stay curious, ask the AI to explain its decisions, and never stop understanding what your code actually does.

The real victory isn't finding the perfect AI assistant—it's learning to collaborate effectively with AI while maintaining your skills and understanding as a developer.