---
layout: post
author: nikoberry
image: 
  path: /images/docs-as-tests-vs-docs-as-code.webp
  thumbnail: /images/docs-as-tests-vs-docs-as-code.webp
title: "Docs as Tests vs. Docs as Code"
date: 2024-02-07 00:00:00 -0000
categories: docs-as-code docs-as-tests concept overview comparison
---

Documentation has the critical role of helping users keep their footing in the storm of continuous releases driven by the iterative nature of modern product development. While many people think of documentation as creating guides and references for new features, publishing them online, and moving on to the next feature, this simply doesn't reflect the actual challenges of technical writing in the age of continuous deployment, agile development, continuous contact, and easy access to feedback from customers. Writing is a big part of docs, of course, but maintaining those docs slides into the background as the business, product, and audience shift around them.

How are docs supposed to keep up with this rate of change? Technical writers developed two schools of thought that answer these challenges. The first is Docs as Code, an approach to documentation that borrows tools and practices from programming to improve the quality of docs. A more recent school of thought to answer the challenges of rapidly evolving products is Docs as Tests, an approach to using tools to manage the relationship between docs and the product and ensure that docs don't become stale as the product develops after you publish.

But what is the relationship between Docs as Code and Docs as Tests? They’re similarly named, but how deep do those similarities go? In this post we’ll compare and contrast the ideas and practices associated with these two schools of thought and show that Docs as Tests occupies a unique position as both:

* A natural extension of Docs as Code.
* A standalone set of practices that can be applied outside of Docs as Code workflows.

## Docs as Code

Docs as Code (and its more loosely defined sibling Docs like Code) is a philosophy about how to write documentation that borrows heavily from software development.

If you're a technical writer, you might already know that our job isn't just about writing technical instructions. When you work in a big organization or on a sizable project, you realize that the complexity grows as the number of instructions increases. Writing technical instructions becomes even more challenging when the documents, content silos, and the domain being covered are too large for any one author to have a full understanding of.

Docs as Code emerged when technical writers realized that another profession faces similar challenges around maintaining enormous, complicated instruction sets: Programmers. Even better, programmers already have practices and tools put together for handling these problems that technical writers can easily retrofit onto their own jobs.

Docs as Code is about studying the day-to-day challenges of managing enormous sets of instructions faced by both technical writers and programmers and trying to figure out how the disciplines can share their learnings to strengthen each other. After you understand those similarities, the tools and practices flow naturally.

### Plaintext as the medium of choice

People sometimes treat Docs as Code as a synonym for using plaintext (usually written with a developer-focused text editor) for authoring. Let’s think about the main reasons why Docs as Code favors plaintext markup languages like Markdown or Asciidoc and plaintext structures like Swagger JSON and YAML; it’s not just out of a desire to have technical writers cosplay as developers. 

Reason one is all about separating concerns. In your typical word processor, both what the text says and how it looks are controlled through the same interface. This is convenient when you are writing small, one-off documents, but it doesn't scale. Modern documentation projects are enormous, and updating their visual display to accommodate emerging best practices in web development, new branding guidelines, or even changing tastes is completely impractical to do manually; it must be done programmatically. Plaintext lets the author focus on the authoring, the designer focus on the visual design, and the developer focus on the underlying mechanics of the digital format the docs will be templated into. 

Additionally, most plaintext markup languages have open specs that the development community is able to build new tools against. This results in a robust if chaotic ecosystem of options for building publishing toolchains for docs that fit into most dev teams’ skill sets and workflows.

### Developer-style version control

Because of its plaintext approach, Docs as Code also works with the gold standard of programming version control tools: Git. There are other version control tools for code but, in practice, Git is the one that sees use.

Working with Git provides more than just the tool to handle version control. If you just write docs without much thought and slap your entire day’s work into a single commit with a description like “Update!” you’re missing out on a lot of the power Docs as Code offers. Programming has a set of best practices for how developers can logically group changes using Git and how to describe them in commits. These practices translate neatly to documentation. When teams follow these practices, the Git history log provides a sort of ‘meta documentation’ about the context of the docs.  When this context is explicit:

* New team members have an easier time becoming familiar with the specific design decisions that informed the docs.
* Long-time team members can recall why they made specific decisions about the docs years ago.

Git even has a feature that tells you who to blame for a given section of a document.

### Collaboration

Developers write code in teams, and technical writers working on docs can adopt many of the tools that let them work in parallel, share feedback, and organize continuous changes to a highly complex code base. This is where Git, of course, but also Git platforms like Github, Bitbucket, or Gitkraken come into the picture.

### Continuous integration and deployment

Treating docs as code also allows the docs to be incorporated into a continuous integration or continuous deployment pipeline where the docs and their publishing toolchain are tested after each committed change to the docs. This helps ensure quality.

In the CI/CD phase of Docs as Code, you will sometimes see the idea of testing the docs mentioned. This practice has a similar name to Docs as Tests but is very different because it's focused on the testable qualities of the docs such as its syntactic correctness, adherence to style guides, or readability scores. 

### Docs as Code: The point

Docs as Code focuses on pulling in ideas and tools from software development to improve how docs are written and the specific 'how' is focused on how words get written, stored, updated, and tracked. 

## Docs as Tests

Docs as Test is about using docs as a set of tests for a product. Once the tests are in place, these tests continuously ensure that the documentation correctly describes the functionality of the product. If something changes in the product that makes one of the tests fail, whoever is in charge of the docs can begin identifying the discrepancy and either update the docs to reflect the current state of the product or identify the owners of the ongoing product issue. 

Similarly to Docs as Code, Docs as Tests borrows ideas and tools from software engineering and applies them to documentation. However, where Docs as Code is mainly interested in borrowing the tools software developers use to write and manage code and apply them to writing the worst programming language (English) while targeting the most unreliable compiler (the human brain), Docs as Test looks at the ideas behind assertion testing in software development and realizes that they apply to documentation too.

### Docs make assertions about the product

From one perspective, documentation is a description of a product. However, in another way, documentation makes falsifiable assertions about a product.  When the docs say, "Pressing button A on screen B orders your pizza," thanks to the power of UI automation, we can test that. 

When docs say sending a GET request to the `/pizza` endpoint returns you a list of all of the objects representing the states of pizza, thanks to the power of API automation, we can test that. 

This is the first focus of Docs as Tests: thinking about your documentation as an implicit set of tests that could be built for the documentation.

### The Docs are a client

Having tests that break when a product doesn't perform the way the docs say they do changes the relationship between the docs and the product. It connects documentation to the product in a more tangible way than the "we'll update it _eventually_" antipattern that is so easy to fall into when crunch time hits.

Having a slate of tests that alert the team to incongruities between what the docs say and what the product does, especially if the team can detect them ahead of launch, changes the relationship between the docs in a product in a way that somewhat mirrors the relationship between a client and its upstream dependency. 

Even if engineering teams don't see the documents as clients, they might still rethink the value of accurate documents when the tech writer is the one who catches a big bug before the release goes out.

### Docs as Tests: The bottom line

Docs as Tests transforms how documentation and products interact, enhancing both their quality. It employs testing tools to identify stale docs as a product evolves and also spots defects from the product. This approach ensures both the documentation and the product stay relevant and error-free, leading to an improved user experience.

## Comparing Docs as Tests and Docs as Code

To summarize, Docs as Code applies principles and practices from software development to documentation, emphasizing the use of plain text for writing, version control for tracking changes, and continuous integration and deployment for maintaining quality. This approach treats documentation with the same rigor and discipline as code, allowing for more efficient updates, collaboration, and maintenance.

On the other hand, Docs as Tests takes the relationship between documentation and product functionality a step further by treating documentation as a series of tests for the product. This approach keeps documentation fresh and accurate to the current state of the product by automatically verifying that the features and behaviors described in the documentation match the actual product. If a discrepancy arises, the tool lets teams know so they can fix it.

While Docs as Code provides a robust framework for managing and maintaining documentation, Docs as Tests introduces a dynamic element that directly ties the accuracy of documentation to the product's functionality. Both approaches offer significant benefits, but they are not mutually exclusive. In fact, integrating Docs as Tests within a Docs as Code framework can create a comprehensive documentation strategy that is both well-organized and consistently accurate, reflecting the current capabilities of the product. This synergy enhances the value of documentation, making it a more reliable and useful resource for users and an integral part of the development process.

With all of this in mind, let’s return to the ideas from the beginning of this post.

### Docs as Tests are a natural extension of Docs as Code

Docs as Tests is a natural extension to Docs as Code. A quick survey of both philosophies turns up several overlapping ideas. Both Docs as Code and Docs as Tests 

* pull documentation into a paradigm of tools and ideas familiar to developers. 
* integrate neatly into developer-centric workflows.
* reduce the number of points where they need to context switch.
* are helpful on teams where developers are involved in the documentation process.

In many ways, Docs as Code contains Docs as Tests within its set of ideas and tools. While Docs as Code started by taking on engineers' authoring tooling and processes, Docs as Tests continues the trend by mapping engineers' code testing practices to content written in plain language.

### Docs as Tests are a standalone set of practices

One of the beautiful things about Docs as Tests is that you can use it as a framework even if your docs barely resemble code. You could document in Wordpress, a Notion Wiki, an MS Word document, or even a set of instructions handwritten on a piece of paper could be a valid use case with Docs as Tests. Never actually do that last one, but if your life was ever so out of control that you needed to, you totally could. 

In a practical sense, however, it would be very difficult to do Docs as Tests for non-Docs as Code workflows right now. This is due to a lack of good tools rather than an incompatibility between the Docs as Tests theory and non-Docs as Code workflows. The tooling available for Docs as Tests is primarily geared towards code-based documentation, but this does not mean that there will never be tools that integrate Docs as Tests into something like Sanity.io or WordPress. Eventually, somebody might come along and build an extension to your CMS of choice that integrates Docs as Tests right into the authoring UI, but that day hasn't come yet.

## Wrapping up

If there’s one key take away from this article, it’s that while Docs as Code and Docs as Test are their own distinct ideas, they complement each other and are a winning combination. The two schools of thought are natural partners at both the philosophical and tooling level. 

Docs as Code treats docs as... well, code. This mental model opens up a broad range of ideas and tools in software engineering for use in technical writing. Docs as Tests argues that documentation implies a slate of tests that can be run against a product. Programming as a discipline already has a robust and well-developed set of practices for unit tests that you can immediately apply using [any of the many tools available for testing](https://github.com/TheJambo/awesome-testing). Since your docs already live in a Git repository as code, you can add code files such as test specs into the same place that your docs are stored and edit them. If you use Doc Detective, a tool specifically built for Docs as Tests, you can even add the tests inline in your Markdown files. 

If you'd like to see how to do documents as tests, check out any of the our [tutorials](/categories/#tutorial).