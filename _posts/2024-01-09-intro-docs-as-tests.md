---
layout: post
# image:
#   path: /images/post-image-lg.jpg
#   thumbnail: /images/post-image-th.jpg
#   caption: "Photo credit [Unsplash](https://unsplash.com/)"
title: "Docs as Tests: A strategy for resilient docs"
categories: docs-as-tests concept
---

It's a common problem: A user is reading the docs for a product, and they come across a step that doesn't work. Maybe the UI has changed, or the API has been updated, or the instructions are just plain wrong. Whatever the reason, they're stuck. They can't move forward, and they can't get help because the docs are out of date.

You don't want to be the owner of those docs. You don't want to be asked why the docs are wrong or why engineering or UX didn't communicate their changes to you in time. You don't want to find out that the product has changed out from under you again and without warning. You don't want to fix the docs again, only to have them break again. You don't want to be blamed for a bad user experience.

When product updates are frequent and user expectations are high, maintaining accurate and up-to-date documentation isn’t just a necessity—it's a competitive advantage.

# What is Docs as Tests?

Docs as Tests is a strategy to test your documentation against your product to detect differences between them. If your docs match your product, you can have confidence that your docs are accurate and that your product is behaving as expected. If your docs don't match your product, you get opportunity to fix them before your users notice. And if you run your tests on a schedule, you can detect changes in your product that you might not have been aware of.

Docs as Tests is a way to test your docs, just like engineers test their code. It's a tool-agnostic strategy that technical writers, engineers, and others can adopt to suite their docs and their needs. It's a way to make sure that your docs are always accurate, complete, and relevant.

# Devising the strategy

I developed Docs as Test because I was sick of my docs going out of date. At Apple and Google, I worked on products that were constantly changing. Even with good communication between myself and my engineering, UX, and product teams, I was always playing catch-up, and I always hated when I found out that part of my docs were inaccurate or broken. I wanted my docs to be accurate out the gate and resilient to change.

I initially developed and implemented Docs as Tests at [Skyflow](https://skyflow.com/). Skyflow is a startup and moves fast, releasing features and updates even faster than I'd experienced before. I searched for tools: there were style linters, API testers, and engineering-focused testing tools, but there wasn't anything to easily help me validate the product descriptions or procedures in my docs. So I built my own, and [Doc Detective](https://doc-detective.com/) was born. Doc Detective is a toolkit that parses docs and runs tests (like stepping through procedures) directly against UIs and APIs. It's designed so non-engineers can use it individually, but teams can also collaborate. When I set it up to test my docs, it caught issues that I had no idea of. It was a game-changer.

But Doc Detective is just a tool (a good one, I like to think!), and no tool solves every problem. I wanted to find a way to apply my learnings to the broader docs community, and I came up with Docs as Tests---a strategy that can be implemented with whichever tools you choose to validate your docs. I'm excited to share my learnings with you and to learn from you as well.

# Core tenets

Docs as Tests is a strategy that can be implemented in many ways, but there are a few tenets that I believe are essential to Docs as Tests:

1. **Docs are tests**: Docs as Tests is a strategy for testing your docs against your product. Each doc is a test suite, each procedure a test case, each step an assertion. Treat them as such. Your docs are testable statements that your product works a certain way, and if you don't run those tests yourself, your users will do it for you.
2. **Tests run against the product**: Doc-based tests run against your product. Not against mocks. Not against code (unless that *is* the product). Doc-based tests need to validate the actual UX your users experience. If your product's UX changes, your docs should change too. If you can test against multiple product environments (such as production, staging, and development), test each environment as is reasonable.
3. **Tests are repeatable**: Engineering tests are repeatable, and doc-based tests should be too. If you run your tests once and never again, your docs are no more relisient than if you never ran them at all. Doc-based tests should repeated as often as is reasonable to keep your docs in sync with your product.
4. **Resilient implementaion, resilient tests**: Everyone---tech writers, engineers, product managers, and more---contributes to docs, and therefore everyone contributes to tests. Your Docs as Tests implementation should be resiliant to anticipated doc contributions. Automate what you can, like using a style linter to make sure keywords and formatting are used appropriately, and educate your contributors on how to write docs that make good tests.
5. **Doc-based tests don't replace, they compliment**: While doc-based tests could be classified as end-to-end tests, they're not a replacement for engineering best practices. Doc-based tests instead compliment unit tests, integration tests, and other tests that are designed to test your product's code. Doc-based tests, don't validate your code---they validate your product's user experience as it is presented to your users.

If you adhere to these tenets, you'll be well on your way to implementing Docs as Tests.

# Consistent UX, better collaboration, and an early warning system

If you find tools that work for you and adhere to the core tenets, you'll see substantial benefits for your team, your docs, and your product:

- **Consistent UX**: By continuously testing your docs against your product, you ensure a high level of doc accuracy. This means users and stakeholders can rely on the docs to provide an accurate representation of the product at all times, reducing confusion and errors.
- **Efficiency in keeping docs updated**: Traditional doc processes can be time-consuming and prone to lag behind software updates. Docs as Tests helps automate the updating process, ensuring that docs keep pace with rapid software development cycles and reducing the manual effort required from technical writers.
- **Proactive error detection**: Docs as Tests acts as an early warning system, catching discrepancies between docs and product functionality before they impact users. This proactive approach can significantly reduce the time and cost associated with fixing errors post-release.
- **Increased user trust and satisfaction**: Accurate and reliable docs directly impacts user trust and satisfaction. When users find that the docs reliably guide them through using a product, the users are more likely to have a positive perception of the product and the company.
- **Enhanced collaboration**: Making your docs more relisient while providing an additional layer of product testing fosters a closer collaboration between technical writers, developers, and QA teams. By working together, these teams ensure that docs is technically accurate, up-to-date, and user-friendly, leading to a more cohesive product and better user experience.
- **Reduced support costs**: When docs are accurate and easy to understand, users are less likely to rely on support teams for help. This reduces support costs and frees up resources to focus on other areas of development and customer service.
- **Empowered technical writers**: When docs more directly contribute to the stability and consisntecy of the product, technical writers (and other content authors) are empowered to take a more active role in the product development process, elevating the status of docs and those who produce it within the organization.

By embracing Docs as Tests, you can achieve better documentation, more efficient processes, and higher overall product quality.

# Limitations and considerations

Docs as Tests isn't a replacement for good communication between teams, and it's not a replacement for good engineering practices. As much as I wish it could, Docs as Tests can't catch every issue with your docs, and it might even cause a few depending on how you go about an implementation. Here are a few things to consider and watch out for:

- **You can only monitor what you test**: Docs only cover select flows and features, and therefore, you can only test what you cover in your docs. While Docs as Tests provides confidence that your docs are accuracte,  you shouldn't assume that everything in your product works as expected if your doc-based tests pass. This is why following engineering best practices for comprehensive testing is still important.
- **Finding the right tools**: It can be hard to find the right tools for your needs. It's important to choose tools that integrate well with your existing development and documentation workflows. Often, the best approach is to start with one or two tools that fit easily into your current practices and then gradually expand as you become more comfortable with Docs as Tests.
- **Initial learning curve**: There's a learning curve associated with adopting new tools and methodologies. You and your contributors need time to learn and adapt to the Docs as Tests approach and the associated tools.
- **Culture shift**: Adopting Docs as Tests might require a cultural shift within your team or organization. The strategy changes the traditional role of docs and requires closer collaboration between technical writers and the development team (even if only in the form of new issues identified from a new source), which might not be readily accepted or understood by all.

# This sounds interesting. What's next?

If you're interested in learning more about Docs as Tests and how to implement it, you're in the right place. This site is a living document, and I'll be adding thoughts, tutorials, and more content as I learn more and as the Docs as Tests community grows.

To start, evalute your docs and take a look at available [tools](/tools) to see how you might implement Docs as Tests with your doc set. More thoughts on practical implementation are coming soon.

To keep up-to-date with posts here, sign up for the [Docs as Tests newsletter](http://eepurl.com/iHb1CE). I'll send out updates when I add new content to the site.

Thanks for joining me here. I look forward to discussing Docs as Tests and learning h ow you make your docs more accurate, more resilient, and more useful to your users.