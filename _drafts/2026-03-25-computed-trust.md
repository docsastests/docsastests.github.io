---
layout: post
image:
  path: /images/computed-trust.webp
  thumbnail: /images/computed-trust.webp
title: "Computed Trust: How to Know What AI Output to Trust (Without Reading All of It)"
categories: docs-as-tests
---

AI can produce documentation faster than any team can review it, and that gap is a real operational problem. You don't solve it by working harder. You solve it by changing how verification works.

## The review bottleneck

For most of the history of technical writing, the bottleneck was creation. There weren't enough writers. The entire discipline evolved around producing more with less using templates, style guides, structured authoring, content reuse, and other strategies.

AI flipped that. An LLM can draft ten articles in the time a person writes one. But the capacity to *verify* that output hasn't changed. A reviewer can still meaningfully evaluate about the same number of documents per week, no matter how they were produced.

Tom Johnson put it directly: ["You can generate 10,000 words pretty fast, right? But how do you get it through the review cycle?"](https://idratherbewriting.com/blog/podcast-episode-3-documentation-theater-acceleration-paradox)

Let's baseline on some rough estimates make the shift more real:

| Era | Creation Capacity | Review Capacity | Ratio |
|-----|-------------------|-----------------|-------|
| Pre-AI | ~5 docs/week/writer | ~5 docs/week/reviewer | 1:1 |
| AI-Assisted | 50+ docs/week/writer | ~5 docs/week/reviewer | 10:1+ |

That 10:1 ratio forces a choice. Let AI output pile up in review queues, push reviewers to rubber-stamp approvals, or cap AI usage to match review capacity. None of those work.

And this isn't just a docs problem. [CodeRabbit analyzed over 10 million pull requests](https://techcrunch.com/2025/02/18/coderabbit-says-ai-utilization-doesnt-equal-code-quality/) and found that AI-generated PRs contain 1.7x more issues than human-written ones. Their CEO Harjot Gill stated, "Generating code is not a problem anymore. The bottleneck has shifted to review." [Faros AI found](https://www.faros.ai/blog/state-of-engineering-velocity-2025-ai-adoption-speed) that teams with high AI adoption saw PR review time increase by 91%.

Everywhere you look, generation got faster, but verification didn't.

## Why the obvious solutions don't hold up

Teams tend to reach for four responses, and I've watched each one fall apart:

**Hire more reviewers.** HAHAHAHAHAHAHAHA. *ahem* You'd need ten reviewers for every writer. That's the exact cost expansion AI was supposed to eliminate. And finding qualified technical reviewers is harder than finding writers, because effective review requires deep product knowledge that takes months to build.

**Skip review for low-risk content.** Sounds reasonable until you think about what "low-risk" actually means for docs. A wrong API parameter wastes hours of developer time. A bad troubleshooting step makes problems worse. These errors erode trust in ways that are hard to measure and slow to repair.

**Write better prompts.** Prompt engineering genuinely helps. Grounding AI in specs, providing style guides, using structured templates, all of it reduces error frequency. But even 95% accuracy means one in twenty outputs has something wrong. Without verification, you don't know which one.

**Review a random sample.** Statistical sampling works when errors are randomly distributed. Documentation errors aren't. They cluster around specific content types, recently changed features, and failure modes like hallucinated defaults or outdated workflows. A random 10% sample can miss an entire category of correlated failures.

## Computed trust

The approach I keep coming back to is what I call *computed trust*: build confidence through layers of verification, then route each piece of content to the level of human review it actually needs.

```
[AI Output]
    ↓
[Deterministic Tests] — Pass/fail on objective criteria
    ↓
[Probabilistic Tests] — Quality measurement against rubrics
    ↓
[Risk Classification] — Based on content type, audience, reversibility
    ↓
[Appropriate Review] — Scoped by trust level, not uniformly applied
```

Each layer reduces the burden on the next. Deterministic tests catch broken procedures, failed style checks, malformed content structure, and code that doesn't compile. Those never reach a human. Probabilistic tests using agents and [LLM-as-judge patterns]() measure quality dimensions and flag anything below threshold. Risk classification looks at what changed and who it affects. Only after all of that does the workflow decide how much human attention a document needs.

If you've followed this blog, you already have some of these layers. [Deterministic tests in CI](/ci-with-github-actions) and [AI-assisted test generation](/ai-assisted-test-generation) are building blocks. Every test that runs automatically is a review task a human doesn't have to perform.

## The trust equation

Here's the mental model I use:

```
Trust = (Explicit Criteria × Measured Quality × Verified Accuracy) / Risk Level
```

This isn't a formula you plug numbers into. It's a way of thinking about which levers you can pull.

**Explicit Criteria** is the degree to which success is defined *before* execution. "The document must include all parameters from the API schema, each with type, description, and example" is explicit. "Write a good API reference" isn't. That gap is where most trust problems start.

**Measured Quality** means eval scores, actual numbers. A reviewer who sees "completeness: 0.92, accuracy: 0.78" knows where to focus. A reviewer who sees a blank document and "LGTM?" doesn't.

**Verified Accuracy** is the docs-as-tests pass rate. What percentage of the claims in your documentation hold true when tested against the real product? You can review for plausibility all day, but testing against the actual API is the only way to catch hallucinated parameters.

**Risk Level** accounts for content type, audience, and how reversible an error would be. An internal FAQ typo is cheap to fix. A wrong security configuration in public docs is not.

Better specs, more evals, and real product testing all increase the numerator. But higher-risk content demands more of each to reach the same confidence.

Werner Vogels, Amazon's CTO, [calls this "verification debt"](https://www.allthingsdistributed.com/2025/01/tech-predictions-for-2025-and-beyond.html): you're generating faster than you can verify, and the gap is growing. A [Sonar survey](https://www.sonarsource.com/resources/ai-code-assurance/) found that 96% of developers don't fully trust AI-generated code, but only 48% consistently verify it before committing. That gap between distrust and inaction is where bad docs ship. Computed trust is how you close it.

## Five properties of trusted workflows

Across the work I've been doing for *Docs as Tests with AI*, I keep finding that trusted agentic workflows share five properties. None of them are surprising individually, but teams that skip even one tend to end up back at "review everything by hand."

First, **success criteria are explicit.** "Good enough" is defined before the agent runs, not negotiated after reading the output. I covered this in the trust equation above, but it's worth repeating: the gap between "write a good API reference" and "include all parameters with type, description, and example" is the gap between guessing and measuring.

Second, **quality is measured, not assumed.** Scores, not vibes. When a reviewer opens a document and sees numbers for completeness, accuracy, and style adherence, they know where to read carefully and where to skim. That doesn't replace judgment. It focuses it.

Third, **accuracy is verified against ground truth.** This is the docs-as-tests part. An API reference that *looks* correct can still contain hallucinated parameters. You only catch that by testing against the real API. [Kong does this at scale](https://www.docsastests.com/kong-case-study) with their copy-paste-down-the-page design, and their AI chatbot's accuracy improved because of it.

Fourth, **failure modes are handled explicitly.** When a test fails or a score drops below threshold, what happens? Retry? Escalate? Halt the pipeline? If the answer is "it depends on who notices," you don't have a workflow. You have a hope. This matters especially with AI because its failures tend to be confidently wrong. They look plausible even when they're not.

Fifth, **human oversight is preserved at the right checkpoints.** Not every checkpoint (that recreates the bottleneck) and not zero (that's just negligence). The checkpoints depend on risk: content type, audience, reversibility. How you encode that, whether through a taxonomy, a decision matrix, or just a Slack conversation, depends on your team. I'll get into specifics in future posts.

## Layers in action

Two updates hit the same pipeline on the same day. Watch what happens.

**An internal FAQ update.** Someone renamed a config setting. The pipeline drafts an update, and deterministic tests catch that the old name still appears in a code sample. Fixed automatically. Probabilistic tests score readability and completeness as fine. Risk classification: low, internal, easily reversible. A reviewer glances at the diff for two minutes and approves.

**A public API security guide.** New authentication endpoint needs docs. The pipeline drafts it, deterministic tests confirm the code samples compile and API calls return expected responses. But probabilistic tests flag the "security considerations" section as incomplete. Risk classification: high, public-facing, security-sensitive. The draft goes to a human for deep review, with the low completeness score highlighted so they know exactly where to focus.

Same pipeline, same team. The FAQ took two minutes of human time. The security guide got 45 minutes of careful attention. Neither was over-reviewed or under-reviewed.

| | FAQ Update | API Security Guide |
|---|---|---|
| **Deterministic tests** | Caught stale setting name | Verified code samples compile |
| **Probabilistic tests** | Passed all thresholds | Flagged incomplete security section |
| **Risk classification** | Low (internal, easily reversible) | High (public, security-sensitive) |
| **Human review** | Quick scan (~2 min) | Deep review (~45 min) |

## Building on what you already have

If you've been following this blog, you may not have realized it, but you've been building computed trust layers already.

Deterministic tests in CI catch structural errors before a reviewer ever sees them. AI-generated test specs expand coverage without proportional human effort: generate once, review once, run forever. Quality scoring (I'll cover this in upcoming posts) adds the probabilistic layer, putting numbers on dimensions like completeness and accuracy instead of relying on gut feel. If you want to start exploring now, LLM-as-judge patterns are the most accessible entry point.

These aren't separate initiatives. They're layers of the same system.

## What's next

Computed trust tackles a structural problem, but it opens a bigger one. If you're building agentic systems that generate and test docs, those systems need their own documentation: agent definitions, orchestration patterns, specs, skills. Most teams haven't formalized any of that yet.

I'll be writing about workflow documentation next, along with a framework called "docs as evals" that applies the same testing rigor to your workflow artifacts as you apply to product docs. The core idea: if your workflow documentation claims your agents behave a certain way, that claim is testable.

In the meantime, try estimating your creation-to-review ratio. How many drafts does your team produce versus meaningfully review? If the gap is growing, you don't need to build all of this at once. Start with one layer. The compound effect is what matters.
