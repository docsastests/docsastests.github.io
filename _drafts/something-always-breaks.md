---
layout: post
title: "Something Always Breaks"
categories: docs-as-tests
---

After a month of effort refining your product's onboarding experience, you finally published the new getting started guide. It took rounds of internal debate between developer experience, customer support, engineering, and product stakeholders, but everyone eventually agreed on the flow. The feature was designed, implemented, and—with your guide published—shipped.

The whole thing begins with a single button labeled **Begin**, and your guide opens the same way: "To get started, click **Begin**."

You confirm the content is live, wonder briefly how soon customers will start using it, and then someone pings you about the next project. Your attention shifts. The getting started guide fades into the background as new priorities take over, and life goes on.

## Three months later

A ticket comes in from customer support: the getting started guide is broken.

"How could it possibly be broken?" you ask. "I walked through the procedure myself. It matched what engineering built." Support forwards the customer feedback. The user interface says **Start**, not **Begin**.

Confused, you open the product and trigger the onboarding flow. Sure enough, the button says **Start**. You dig into the code and find that someone renamed it in the latest release. You contact the engineer responsible, and they tell you the change came from Design or Product—they were just following the request. You follow up with the design team, and they explain it was a small tweak to align with brand guidelines, approved by product.

"Sorry," they say. "We figured you were busy with more important things and didn't realize it impacted you."

## One word, three months of damage

Let's set the frustration aside and look at what actually happened.

Your getting started guide is the front door to your product. Every new user sees it. For three months, that guide told people to click a button that didn't exist.

How many users followed the instructions and got stuck on the very first step? Some figured it out on their own—clicking **Start** instead of **Begin**—and moved on, maybe with a small seed of doubt about the reliability of your docs. Some gave up and never came back. Some contacted support, generating tickets that someone had to triage and respond to. And some just quietly left for a competitor whose documentation matched the product.

You don't know the numbers. That's part of the problem.

Broken docs are a barrier to user success, and user success drives product adoption. A wrong button label might seem trivial. It's one word. But it breaks trust at the worst possible moment: the very beginning of a user's relationship with your product.

Think about who's affected. Prospective users evaluating your product rely on the getting started guide to form a first impression. If step one doesn't match what they see on the screen, they wonder what else is wrong. Some push through. Some don't.

Existing users depend on docs to complete tasks, and each mismatch erodes confidence. Eventually, they stop trusting the docs altogether. When that happens, they either lean on support or leave.

And then there are the support tickets. Each one costs time: someone reads it, reproduces the issue, realizes the docs are wrong, fixes or escalates it, and responds. Multiply that by three months of users hitting the same problem, and a one-word change becomes a real line item.

## It's not just your customers

Documentation doesn't serve only external users. Internal teams rely on it too, and when it drifts from reality, the costs compound in ways that are harder to see.

Engineers reference docs when building integrations or onboarding new team members. If docs describe a flow that no longer exists, engineers waste time chasing discrepancies between what the docs say and what the code does. New hires get hit hardest because they don't have the institutional knowledge to spot outdated content.

Support teams use docs as their primary reference. When the docs are wrong, support either gives wrong answers or spends extra time verifying before trusting them.

Sales engineers use docs during demos and technical evaluations. Outdated docs during a sales conversation can undermine credibility at the exact moment when it matters most.

Broken documentation creates drag. It slows people down and costs real money, whether you measure it in support tickets, lost deals, or engineering hours.

## The uncomfortable truth

Here's what makes this hard to fix: nobody did anything wrong.

The product team made a reasonable decision to update the button label. The design team implemented it. The engineer coded it. Everyone followed their process. Nobody thought to tell the documentation team because, from their perspective, it was a minor copy change—not a documentation event.

This isn't a one-time communication failure you can solve with a process memo or a Slack reminder. It's a structural gap. Product teams ship changes constantly, large and small, and documentation teams can't always be in the loop for every one of them. Even in organizations with strong cross-functional communication, things slip through. A renamed button. A removed feature. A new default setting that quietly changes a workflow.

The question isn't whether your docs will break. They will. The question is whether you'll know when it happens.

Across the teams I've worked with, the most common way people find out is the same way you did in this scenario: a customer complaint, a support ticket, or an accidental discovery weeks or months after the fact. By then, the damage is already done.

## What if your docs could tell you?

What if, every time the product changed, your documentation could flag the mismatch—before customers found out?

That's the idea behind Docs as Tests. It's a strategy for treating your documented procedures as testable assertions about how the product works. When your guide says "click **Begin**," that's a claim about the product's interface. That claim can be verified: does a button labeled **Begin** exist on the expected page? Does clicking it do what the docs say it does?

If both assertions pass, the doc is accurate. If either fails, you find out immediately—not three months later through a support ticket.

Docs as Tests doesn't replace your documentation workflows or tools. It adds a verification layer that catches drift between what your docs say and what your product does. Your docs continue to live wherever they live. Alongside them, tests run that confirm the documented behavior still matches reality.

The concept borrows from software engineering, where developers write automated tests that describe expected behavior and run those tests continuously. Docs as Tests applies the same principle to documentation: if you can describe a procedure, you can test that procedure.

## Try this now

If you'd like to see this pattern in your own work, consider trying a quick audit. Pick one of your product's most important docs (the getting started guide, an API quickstart, a key workflow tutorial) and walk through every step as a user would.

For each step, ask yourself:

- Does the interface match what the doc describes?
- Are the button labels, menu items, and field names accurate?
- Does the described outcome actually happen when you follow the instructions?
- When was the last time someone verified this?

Most people who do this exercise find at least one mismatch, often more. That's not a failure. It's evidence of the structural gap we've been talking about. Documentation drifts. The question is how to catch the drift before users do.

## What comes next

This is the first post in a series exploring the Docs as Tests strategy. Over the coming weeks, we'll dig into the practical side: how to identify which docs are worth testing, which tools can help you get started, and how to integrate documentation tests into your team's existing workflow.

If a one-word change can quietly break your product's front door for three months, it's worth exploring whether there's a better way to catch it. I think there is.

Welcome to Docs as Tests.
