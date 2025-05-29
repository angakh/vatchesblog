---
author: Vatché
category: ai
date: 2023-11-02
description: A critical analysis of the White House's AI Executive Order, examining
  concerns about regulatory capture, computational thresholds, and the potential stifling
  of innovation in favor of established tech giants.
img: posts/20231102/altman-biden-ng-1536x631.png
layout: post
read_time: true
show_date: true
tags:
- Artificial Intelligence
- Opinion & Industry Analysis
title: 'White House''s Executive Order re: AI'
---

October 30th, 2023: President Joe Biden issued an Executive Order regarding Artificial Intelligence. The executive order was signed on November 1st, 2023 and can be found [here](https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence). As of writing this, the document has only 298 views, but if you look on linkedIn or X, you will see everyone talking about it's contents. I worry that people are just repeating what they heard from others, assuming that those they are quoting have read the actual document. Unfortunately this is creating a divide and the narratives are backed by personal interests. Those that want AI advancements to stay in the hands of the wealthy and powerful and those that want AI development to be in the hands of anyone and everyone. Both have good points, but this Executive Order is leaning towards fear mongering and a few notes on how innovation is top of mind.

Furthermore the document does not bear any teeth, it seems like more of a statement or promise of what is to come. From what I am reading this is concerning for a few reasons, but the most important for me has nothing to do with security, safety, or public discourse. What concerns me most is that the government rarely does anything for the people without screwing it up. The intentions could be as pure as possible, but by the time it goes from a political talking point to implementation, there will be a million footnotes and stipulations that modify the end goal to serve a much smaller segment. Special interest groups, lobbies, foreign governments, and other institutions can and will taint the goal of creating a safe free market to explore and innovate in the realm of AI to the point where the barrier of entry to do anything in this space will be reserved for those that have tremendous resources at their disposal. This goes against everything that AI and open source can do for society.

So if the document doesn't bear any teeth, why get all worked up? Because this is the beginning, this is where it starts and right now the issues that are being "addressed" are totally bogus. CEO's like Sam Altman from OpenAI are talking about the risk of AI being in the wrong hands. Like having a wizard that spawned out of the Anarchists Cookbook. Let's get something straight. Rules and regulations do not stop bad actors. They never have and they never will. You can look back at history and find example after example of people finding another way. This is what makes humanity awesome in terms of innovation and creation as much as it makes us destructive and controlling over others. When explosives were not available Timothy McVeigh used Ammonium Nitrates from fertilizer and bombed the IRS building in Oklahoma. Like using pressure cookers in the Boston Marathon bombing.

If I showed you a gun, a pressure cooker, a pile of fertilizer, and a computer and asked you which one of these is more dangerous you could pick anyone of those items and be right. Because the danger is not the object, it is the person who wields it. If someone wants to use AI to do their bidding all they need to do is setup their own local LLM, which can go online, consume data from the darkweb, they can operate completely unrestricted and this is possible now. Does this mean we should stop all open source AI projects? What about all of those underground crypto mining operations that are now out of the crypto game, all those gpu's are ready to go, couldn't they leverage them for their own AI projects?

Some of you will say "Absolutely! Yes! We should stop all open source AI projects" but it is too late! What we are talking about is already out there, you can't un-invent something no matter how much you regret it. There is a lot to cover in this executive order and I will continue to write about it here, but for this post I am going to concentrate on a few of the sections that stood out.

## Dual-use

The Defense Production Act – [paragraph 4.2](https://www.federalregister.gov/d/2023-24283/p-62)

*4.2. Ensuring Safe and Reliable AI. (a) Within 90 days of the date of this order, to ensure and verify the continuous availability of safe, reliable, and effective AI in accordance with the Defense Production Act, as amended, [50 U.S.C. 4501](https://www.govinfo.gov/link/uscode/50/4501) et seq., including for the national defense and the protection of critical infrastructure, the Secretary of Commerce shall require…*

This is in regards to dual-use foundation models. What is dual-use? If you ask me or any hacker out there, everything is dual-use. Remote control drones were just toys until Ukraine found a way to use them against Russia. The examples in my previous paragraphs of fertilizer and pressure cookers. Their intended use versus what else you can do with them. What if someone was to use a particular book to start a religion and that religion had a fanatic faction, is that book dual-use? What's going to happen when Quantum computing is achieved? AI is a part of our evolution and I understand that many people are afraid of it, I am too, but just because we are worried about something doesn't mean we hand it over to the government. It's like taking your hard earned money and giving it to your "responsible" drunk gambling uncle, because you are worried about what you might do with it.

## Compute Regulations – The math

[Starting here](https://www.federalregister.gov/d/2023-24283/p-68) in the Executive Order

*(b) The Secretary of Commerce, in consultation with the Secretary of State, the Secretary of Defense, the Secretary of Energy, and the Director of National Intelligence, shall define, and thereafter update as needed on a regular basis, the set of technical conditions for models and computing clusters that would be subject to the reporting requirements of subsection 4.2(a) of this section. Until such technical conditions are defined, the Secretary shall require compliance with these reporting requirements for:*

*(i) any model that was trained using a quantity of computing power greater than 10^26 integer or floating-point operations, or using primarily biological sequence data and using a quantity of computing power greater than 10^23 integer or floating-point operations; and*

*(ii) any computing cluster that has a set of machines physically co-located in a single datacenter, transitively connected by data center networking of over 100 Gbit/s, and having a theoretical maximum computing capacity of 10^20 integer or floating-point operations per second for training AI.*

According to 4.2.b above the Secretary of Commerce, State, Defense, Energy and the Director of National Intelligence will define and update "as needed on a regular basis, the set of technical conditions for models and computing clusters that would be subject to the reporting requirements". Is anyone asking where all of these high level offices are getting their information from? If the data is coming from OpenAI, Microsoft, Anthropic, and Meta then one must ask the questions as to why? These are huge computational powers, the average person is not going to be operating on this scale…for now, but having this open ended language now is a sure sign of the direction we are headed towards.

### Quick history lesson:

- 2000 – 1 TFLOP supercomputer. The first supercomputer to reach 1 teraflop on the LINPACK benchmark was ASCI White in 2000.
- 2008 – 1 PFLOP supercomputer. The IBM Roadrunner broke the petaflop barrier in 2008, performing 1.026 quadrillion floating point operations per second.
- 2013 – Bitcoin mining hits 10 TH/s. The computing power dedicated to bitcoin mining surpassed 10 trillion hashes per second in 2013.
- 2016 – First 100 PFLOP supercomputer. China's Sunway TaihuLight reached 93 PFLOPS in 2016.
- 2018 – First 1 EFLOP AI system. NVIDIA and Mellanox unveiled an AI system capable of 1 exaflop in 2018.
- 2019 – Bitcoin mining hits 100 EH/s. Bitcoin mining power hit 100 exahashes per second in 2019.
- 2020 – Fugaku supercomputer hits 442 PFLOP. Fugaku in Japan achieved 442 petaflops in 2020, the first system to surpass the exascale threshold.
- 2021 – AI models surpass 1 trillion parameters. AI models like GPT-3 exceeded 1 trillion parameters in 2021.
- 2023 – Frontier supercomputer can process 1.1 exaflops

The reason I put that list together is to show how quickly this space moves. In two decades we went from 1 teraflop to 442 petaflops (one petaflop is 1,000x more than a teraflop). In 2023 the Frontier supercomputer can process 1.1 exaflops which is over 1 million petaflops.

These are numbers that we can not easily comprehend but its not the actual number that matters, its about the speed at which we are innovating and how uncontainable it is. Our phones are faster than the computers we had a few years ago. In order to keep up with that speed the government has to use language like *"update as needed on a regular basis"* but who is updating? Where is the data and the directive coming from? If it is coming from the corporations I mentioned above then what is stopping them from cornering this market? There are trillions of dollars at stake here and we are positioning a select few companies in a position to reshape how we use AI through our own government.

## AI Experts from the private sector

[Here is a link](https://www.federalregister.gov/d/2023-24283/p-92) to this section of the Executive Order

*(v) The Secretary of Homeland Security shall establish an Artificial Intelligence Safety and Security Board as an advisory committee pursuant to section 871 of the Homeland Security Act of 2002 ([Public Law 107–296](https://www.govinfo.gov/link/plaw/107/public/296)). The Advisory Committee shall include AI experts from the private sector, academia, and government, as appropriate, and provide to the Secretary of Homeland Security and the Federal Government's critical infrastructure community advice, information, or recommendations for improving security, resilience, and incident response related to AI usage in critical infrastructure.*

Those that stand to make money from decisions made in or by the government should not be allowed to inform or influence the decisions made by said government. That is my opinion and I do not know to many people that would disagree with it. Unfortunately the way this works is what many have called "the revolving door". What ends up happening is that regulators end up getting jobs at the companies that they were regulating and those that worked in those sectors end up becoming regulators and it goes on and on. This happened with the FDA, it happened with the FCC, and it is happening here as well.

## Just one example: Ajit Pai

Ajit Pai worked at the U.S. Department of Justice and U.S. Senate Judiciary Committee. Later he worked at Verizon Communications for two years prior to working at the FCC in 2007. In 2017 he voted to repeal the Net Neutrality Act. Many will argue about what this means but in the end the corporations like Verizon and Comcast were the winners. Just curious, how many broadband/fiber options do you have where you live? Would you say its a competitive market with plenty of options for you? Or are you like me with only two choices for an ISP?

## The voice of reason

Andrew Ng voiced similar concerns and offered a very simple and direct approach to this, which is to regulate AI on the application layer. His post is provided below. The reason why this makes more sense is because the software is something that is much easier to regulate and enforce, the ability to add helpful security regulations like PCI or OWASP on AI applications is much more effective and attainable. It also is not as restrictive on innovation.

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7125240645887156225" width="504" height="591" frameborder="0" allowfullscreen title="Embedded post"></iframe>

When it comes to change people are reluctant and weary, this is normal and has served humanity through our own evolution, but we can not blindly trust our elected officials and the company (companies) they keep to have our best interests in mind. Like Andrew Ng said, the "devil is in the details" and we should be vigilant or we will have the Verizon/Comcast versions of AI to chose from. This is why I believe it is so important for everyone to start using AI and to start developing their opinions on it. Don't take my word for it, or anyone else's for that matter. Start using it and think about how it can enhance your productivity and how it might dull your creativity or invigorate it. Either way you will start to develop an opinion and when it comes time to vote on legislation like this, you will be informed through your own experience.