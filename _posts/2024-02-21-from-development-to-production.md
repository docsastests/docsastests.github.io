---
layout: post
author: nikoberry
image:
  path: /images/environments.webp
  thumbnail: /images/environments.webp
title: "Docs as Tests: From Development to Production"
date: 2024-02-21 00:00:00 -0000
categories: docs-as-tests environments development staging production
---

The Docs as Tests methodology stems from a simple but profound principle: documentation shouldn't just inform—it should also verify. By treating each piece of documentation as a test case that gets executed against the product, teams can preemptively identify discrepancies and ensure that what users read is what they get.

In practice, this process means defining and running automated tests based on what the documentation says about the product. Ideally, these tests should run every time updates to the product's code is updated. However, updates to the code often occur in different environments, such as development, staging, and production. Each of these environments can benefit from adding doc-based tests, but each environment benefits in different ways.

## Using Docs as Tests across development environments

How you apply Docs as Tests varies significantly across different stages of the development lifecycle, and each stage has unique advantages and challenges. Let's delve into how this strategy plays out in development, staging, and production environments, outlining the potential benefits and pitfalls within each.

## Development environment

The dev branch is a churning sea of iteration, experimentation, and changes that are checking if an idea will work and figuring out how to make it work well later. As the name of this environment suggests, it's mainly the environment where developers work, and so most of the advantages Docs as Tests deliver here will be ones focused on developers.

### Advantages

1. **Early error detection:** Implementing Docs as Tests in the development phase allows for the early identification of inconsistencies between the product and its documentation. Even if developers ignore these inconsistencies until they complete development, letting developers know early helps get this information to content teams sooner than later.
2. **Immediate feedback loop:** Developers receive real-time feedback on their changes, ensuring that new features or modifications align with documented expectations from the outset.
3. **Documentation quality:** Engaging with documentation during development ensures it evolves alongside the product, fostering a higher standard of accuracy and comprehensiveness.

### Pitfalls

When it's implemented correctly, Docs as Tests shouldn't be disruptive to development. However, there are some pitfalls that teams may fall into:

1. **Test creation overhead:** Crafting testable documentation in a dynamic development environment demands significant effort and foresight, potentially slowing down the innovation process.
2. **Maintenance burden:** The fluid nature of development means documentation and tests must be continually updated, imposing an additional maintenance load on teams.
3. **Risk of disruption:** Introducing rigorous Docs as Tests requirements during development may hinder rapid prototyping and experimentation, stifling creativity.

The goal for using Docs as Tests in a dev environment is to help developers know when they make a change that affects the accuracy of the docs without slowing down their development. The main way to avoid this pitfall is to have broken tests warn developers rather than serve as a gate on pushing their code to the development environment. If developers see that their updates are causing a test to fail and they're getting ready to merge their branch into the main repository, then they should consider whether there are any final changes they can make to realign the product's behavior with the expectations the doc set. If they can't, then they should share this information with whichever team is responsible for updating documentation as soon as possible so that the team can begin tracking the issue and preparing doc updates for the next release.

## Staging environment

The staging environment is the dress rehearsal for releasing software. This is the first environment where everybody with a stake in the documentation should be closely watching the outcome of the tests and scrambling when they fail.

### Advantages

1. **Pre-release validation:** The staging environment mirrors the production environment and is ideal for validating the documentation against the near-final version of the product, ensuring that any discrepancies are caught before public release.
2. **Team communication and synergy:** This phase fosters collaboration between developers, QA, and technical writers, creating a multidisciplinary review process.
3. **Actionable insights:** If a test is failing for the docs in the staging environment, it means the test will fail when the software is released. This indicates early to the team that they will need to take some action to fix the problem.

While Docs as Tests works well in each environment, many of its most significant advantages are visible in staging. Developer environments are early enough in the process, but they move fast and most things in them are subject to change. If a test fails in the morning, it may pass in the afternoon once a dev makes their next commit. Production tests are valuable and can alert the team to issues that are already in front of users, but it's even better to solve problems before users have a chance to see them.

The staging environment is where issues can be detected early enough for teams to have the time to thoughtfully pick and implement the best solution to the discrepancies. Technical writers and other content team members should audit failed tests for deliberate changes to the product and include content and test updates for those tests in the go-to-market plan for the upcoming release.

## Production environment

The production environment is the software that users are actually using and is the environment you really want to make sure your docs match. Docs as Tests has you covered for this use case.

### Advantages

1. **Real-world accuracy:** Try as teams might to mitigate them, there are always potential discrepancies in documentation in the live environment, which ensures it reflects the actual user experience, reinforcing user trust and satisfaction.
2. **Continuous refinement:** The production environment allows for ongoing monitoring and updating of documentation, adapting in real time to product changes and user feedback.
3. **Emergency detection:** If something goes wrong in production that breaks the accuracy of the documentation, regularly executing doc tests will let you know so your team can spring into action.

Most of the advantages of Docs as Tests for the production environment come from the ability to detect doc discrepancies in the environment where users can find them. The key here is that the tests provide teams with the ability to immediately respond to issues either with patches or doc updates as soon as the problem occurs. With any luck, you never *need* these tests, but it's always better to have them than not.

## How many environments should you cover?

Ideally, you should cover all of the development environments your product is in. However, things are rarely ideal, so there are a number of ways you can set up coverage depending on how much effort you are able to expend. Let's go through a few possible implementations.

### Decent

* **Production**: Test once per release (including hotfixes) to verify that all necessary changes were made to the docs. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.

### Good

* **Staging:** Test once per push into the staging environment to verify that all necessary changes were made to the docs for the release. Test failures should trigger notifications/investigations to the appropriate teams. There should be no failures when a feature goes into Production.
* **Production**: Test once per release (including hotfixes) to verify that all necessary changes were made to the docs. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.

### Better

* **Staging:** Test once per push into the staging environment to verify that all necessary changes were made to the docs for the release. Test failures should trigger notifications/investigations to the appropriate teams. There should be no failures when a feature goes into Production.
* **Production:**
  * Test once per release (including hotfixes) to verify that all necessary changes were made to the docs. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.
  * Test daily to catch critical, active issues. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.

### Best

* **Staging:** Test once per push into the staging environment to verify that all necessary changes were made to the docs for the release. Test failures should trigger notifications/investigations to the appropriate teams. There should be no failures when a feature goes into Production.
* **Production:**
  * Test once per release (including hotfixes) to verify that all necessary changes were made to the docs. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.
  * Test daily to catch critical, active issues. Test failures should trigger issue creation/notifications/investigations to the appropriate teams.
* **Development:** Test in-development features ad-hoc to check feature completeness and doc content accuracy. Test failures should only trigger warnings. There should be no failures when a feature goes into Staging.

## The right approach for each environment

Whatever environment you use Docs as Tests in, it will give you more insight into how accurate your docs are compared to the latest version of your product whether that version is being cut for release or just the latest commit during development. What you do with that information varies between environments. During development, it could mean making a couple changes before merging your current feature branch while in staging it may mean planning content updates in advance of the release. In most environments, failed tests should prompt communication between engineering and content teams to make sure everybody knows what needs to happen to make sure users are supported by docs that help them navigate an evolving product.
