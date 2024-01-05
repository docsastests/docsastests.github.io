---
layout: page
title: Tools
---

The following tools can help you implement Docs as Tests with your docs and according to your requirements.

## Testing

These tools actively run tests and validate assertions made in those tests.

* [Doc Detective](https://doc-detective.com/): A Docs as Tests toolkit that parses docs and runs tests (like stepping through procedures) against UIs and APIs. Supports individuals and teams.
* [doctest](https://docs.python.org/3/library/doctest.html) (Python): A tool that extracts code snippets from Python code comments and runs them to verify they execute.
* [LinkChecker](https://wummel.github.io/linkchecker/): A tool that checks the validity of links in docs. It's useful for ensuring that all hyperlinks in the docs are working and lead to the correct destination.
* [Cypress](https://www.cypress.io/): An engineering-focused web automation and component testing tool that can also be used to ensure that docs correctly guide users through interfaces.
* [Playwright](https://playwright.dev/): An engineering-focused web automation tool that can also be used to ensure that docs correctly guide users through interfaces.
* [Selenium](https://www.selenium.dev/): An engineering-focused web automation tool that can also be used to ensure that docs correctly guide users through interfaces.
* [Codebraid](https://codebraid.org/): A tool to execute code snippets in docs and ensure that the outputs are as expected. It's useful for docs involving tutorials or extensive code examples.

## Single-sourcing

These tools help you single-source content directly from known-good sources, such as engineering-tested repos.

**A word of caution**: Context differs between a code file and doc content. Even if code is tested to be accurate, make sure it's also accurate in the context of the doc content it's presented in.

* [Bluehawk](https://github.com/mongodb-university/Bluehawk): A markup language and tool for extracting code examples, checkpointing tutorials, and dynamically transforming text.

## API testing

These tools help you test APIs, which can be useful if you generate a portion of your docs from an API contract, such as an OpenAPI specification.

* [Dredd](https://dredd.org/en/latest/): Dredd is a specialized tool designed for validating API contracts against actual backend implementations. It verifies that APIs behave as expected and conform to their contracts.
* [Postman](https://www.postman.com/): Postman is a versatile API testing tool that facilitates ensuring the precision and currency of API contracts. It integrates automated tests into continuous integration and delivery workflows to maintain API performance and reliability.
* [Sauce Labs](https://saucelabs.com/): Sauce Labs provides robust capabilities for browser and API testing, focusing on verifying the accuracy and contemporaneity of API contracts.
* [SmartBear ReadyAPI](https://smartbear.com/product/ready-api/): SmartBear ReadyAPI validates API contracts for up-to-dateness and accuracy to make sure APIs are dependable and efficient.
* [Pact](https://pact.io/): Pact specializes in testing both microservices and APIs, aimed at affirming the precision and modernity of API contracts. It is a crucial tool for maintaining seamless interaction and reliability in microservices architecture.
 
## Style

While these tools don't directly test your docs, they can assist in maintaining consistency within docs, which can make or break semantics-driven doc-based testing.

* [Vale](https://vale.sh/): A syntax-aware linter for prose built with speed and extensibility in mind. It supports markup formats and is useful for enforcing style and consistency in docs.
* [markdownlint](https://github.com/DavidAnson/markdownlint): A tool to check markdown files and flag style issues. It can be part of a continuous integration process to ensure that all docs follow the defined style guidelines.
* [TextLint](https://github.com/textlint/textlint): A pluggable linting tool for text and markdown, which can be used to enforce writing standards and styles.