---
layout: post
image:
  path: /images/kong-case-study.webp
  thumbnail: /images/kong-case-study.webp
title: "How Kong Achieved 91% AI Chatbot Accuracy Through Docs Testing"
categories: docs-as-tests
---

Kong's documentation team fundamentally changed how their docs relate to their product. After rebuilding their CLI how-to guides to be testable, their AI-powered documentation chatbot accurately answered 91% of user questions with confidence, up from 84%. That 7% improvement wasn't the result of better AI models or more sophisticated prompt engineering—it came from making sure every how-to guide on their site actually works, every time.

*"We're able to answer 91% of questions with a certain answer."*

— Diana Breza, Technical Writer at Kong

## About Kong

Kong is the AI and API connectivity company that enables you to build, run, discover, govern, and monetize all of your AI and API connectivity. . With multiple products spanning cloud platforms, on-premises deployments, and developer tooling, Kong's docs team is challenged to keep their technical content accurate across a constantly evolving product portfolio.

The docs team consists of approximately six technical writers plus Fabian Rodriguez, a software engineer who focuses on docs tooling and infrastructure. Diana Breza presented Kong's docs testing approach at [Write the Docs Berlin](https://www.writethedocs.org/), showcasing how their team transformed docs quality through automated testing.

## The Challenge: Broken Commands and User Frustration

Before rebuilding their how-to guides, Kong's team faced a common but painful problem: users would copy commands from the docs, paste them into their terminals, and nothing would work.

*"One of the most important pieces of feedback that we got for the old site was that people tried stuff and it didn't work. They'd copy commands or whatever and those didn't work."*

— Fabian Rodriguez, Software Engineer at Kong

This wasn't just frustrating for users. It was nearly impossible for the docs team to manage. Kong has multiple products, frequent releases, third-party integrations, and various deployment options. Keeping track of which commands still worked and which procedures needed updates would be overwhelming for a team of any size, and it certainly was for them.

Manually testing docs before each release simply didn't scale.

## The Solution: Tests Derived Directly from Docs

Kong's approach to doc testing differs from what many other organizations have attempted. Instead of creating a parallel test suite that mirrors the docs, which introduces its own drift and maintenance burden, they built tooling that derives tests directly from the docs content itself.

### Copy-Paste-Down-the-Page Design

Kong's approach centered on a single docs design principle: every how-to guide should be completable by copying and pasting commands sequentially down the page. This means each guide includes all prerequisites, all necessary setup steps, all commands, and a verification step at the end.

This design serves two purposes. First, it creates a better user experience. During user testing with internal employees, Kong discovered something remarkable:

*"When we would show them a how-to doc, they'd scroll up and down the page trying to read it. When we told them you can copy and paste down the page, it's like this light bulb moment. So few docs have that. Once they learned they could do that, they just took off down the page and within several minutes they were done. Whereas normally it would have taken them an hour maybe with all the different options you could configure."*

— Diana Breza

Second, this design makes automated testing straightforward. If a human can complete a guide by copying commands sequentially, so can a machine.

### Structured Content with YAML Blocks

Kong's docs use Markdown files with [YAML-based code blocks](https://developer.konghq.com/contributing/#how-to-and-reference-page-blocks) that define the instructions. Writers [specify metadata](https://github.com/Kong/developer.konghq.com/blob/main/docs/front-matter-reference.md) like which product versions a guide applies to, what prerequisites are needed, and what entities must be created. The platform then [generates both the user-facing docs and the machine-readable test instructions](https://github.com/Kong/developer.konghq.com/blob/main/tools/automated-tests/README.md) from the same source.

This approach eliminates a common failure mode: docs and tests drifting apart. When the source is the same, they can't diverge. If the docs are wrong, the test fails. If the test passes, the docs work.

### Automated Daily Testing

Kong runs their doc tests daily through GitHub Actions. The test runner launches a headless browser, navigates to each how-to guide, extracts the code blocks, spins up the necessary Docker containers, and executes each command in sequence. Validation steps confirm that API calls return expected responses and that the documented workflow produces the promised results.

When tests fail, the system generates an instruction file, a minified version of the guide showing exactly what commands were executed. This makes debugging straightforward and allows the team to share reproducible failure cases with product engineering.

## Influencing Product Development

One unexpected outcome: Kong's docs requirements actually influenced product development. The team wanted users to be able to configure the product entirely through copy-paste commands without creating intermediate files. This required changes to Kong's CLI tool, decK.

*"We wanted the experience to be really smooth. A person who works on decK actually changed the product so that we could have users just copy and paste down the page."*

— Fabian Rodriguez

When docs requirements drive product changes, the product becomes more user-friendly by design.

## Results: Catching Issues Before Users Do

Kong's doc testing has delivered measurable improvements across several dimensions.

### Catching Third-Party Breaking Changes

Kong's products integrate with numerous third-party services, and those services change without notice. The doc tests caught a breaking change when Keycloak modified how their Docker container runs, a change that would have broken Kong's authentication integration guides for users.

*"Out of the blue they changed the way you run the Docker container. We actually noticed that because of the tests, which was really cool."*

— Fabian Rodriguez

### Part of the Product Release Process

Kong's doc test suite has become an official part of their product release process. The team can run tests against pre-release versions of Kong products, catching breaking changes before they reach users.

When Kong launched Event Gateway, a new product, the doc tests were ready from day one. During the week before general availability, as the engineering team made last-minute API changes, the doc tests caught issues in near real-time.

*"We were able to catch a lot of stuff because of the tests. They made a change to the API, they made a change to this other thing. We were able to catch those because of the tests. Otherwise we would have to spend a lot of time testing things manually."*

— Fabian Rodriguez

### Better Tests Than Engineering

Perhaps the most striking validation came from Kong's engineering teams. Doc tests that simulate real user workflows often catch issues that traditional unit and integration tests miss.

This makes sense when you consider what doc tests actually validate. While engineering tests verify that individual pieces of functionality work correctly, doc tests verify that end-to-end user workflows succeed, which is ultimately what matters for user experience.

## The Writers' Experience

Adopting this approach required writers to learn new skills, particularly working with YAML syntax, but the benefits quickly became apparent.

*"It was a bit of a learning curve to do the YAML, but it's so nice because I remember pasting in a curl example and then fighting with the formatting. With the YAML you don't have to fight the formatting at all. It also forces us to test everything. As I'm writing it, I'm also testing everything."*

— Diana Breza

The testing workflow also changed how writers interact with their product teams. When writers discover issues during docs development, they have immediate evidence and reproducible test cases to share.

*"Our writers are a lot more active in project channels and team channels saying, 'Hey, this is broken.' Sometimes it's like, 'Oh, you're right. I'll file a bug for it.'"*

— Diana Breza

This shift positions technical writers as quality partners rather than downstream dependencies for product changes.

## AI is Why Accuracy Matters More Than Ever

The 91% confident answer rate from Kong's AI chatbot isn't a coincidence. When docs are accurate, complete, and structured consistently, AI systems can retrieve and synthesize information more effectively.

This creates a virtuous cycle: doc testing guarantees accuracy, accurate docs enable confident AI responses, and confident AI responses reduce support burden and improve user satisfaction.

As organizations increasingly rely on AI-powered tools that consume docs, the importance of docs accuracy multiplies. A single incorrect procedure doesn't just frustrate one user who reads it; it propagates through every AI-generated response that draws from that source.

## What We Can Learn From Kong

Kong's experience shares several insights for teams considering doc testing:

- **Design for testability from the start.** Kong's copy-paste approach creates better user experiences AND makes testing straightforward.  
    
- **Derive tests from docs, not parallel artifacts.** When tests come from the same source as docs, they can't drift apart.  
    
- **Doc testing can improve products.** When docs requirements influence product design, everyone benefits.  
    
- **End-to-end workflow tests catch what unit tests miss.** Doc tests validate the actual user journey, not just individual components.  
    
- **AI accuracy depends on docs accuracy.** As AI consumes your docs, testing becomes even more critical.

## Getting Started with Docs as Tests

You don't need to build custom tooling to start testing your docs. The Docs as Tests approach works with a variety of tools, from purpose-built solutions like [Doc Detective](https://doc-detective.com) to general-purpose testing frameworks like Playwright or Cypress adapted for docs workflows.

It isn't about which tool to use. It's about treating docs as testable assertions about product behavior. When you do, you can verify accuracy automatically, catch regressions proactively, and build confidence that what you've written actually works.

Start small. Pick one high-value procedure, like your getting started guide or most-viewed how-to, and make it testable. Learn what works for your content, your products, and your team. Then expand from there.

Your users, and your AI chatbot, will thank you.

---

*This case study is based on an interview with Diana Breza and Fabian Rodriguez of Kong. Diana presented Kong's doc testing approach at Write the Docs Berlin.*

*Learn more about Docs as Tests at [docsastests.com](https://docsastests.com) and explore Doc Detective at [doc-detective.com](https://doc-detective.com).*
