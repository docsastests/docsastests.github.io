---
layout: post
image: 
  path: /images/validate-ui-cypress.png
  thumbnail: /images/validate-ui-cypress.png
title: "Validate a UI with Cypress"
categories: tutorial cypress
---

Docs as Tests is a strategy for using docs to test a product, validating both that the docs are accurate and that the product is functioning as expected. That's a great aspiration, but what does it look like in practice?

Today, I'll show you how to validate a UI-based procedure with [Cypress](https://cypress.io)—an engineering-focused testing tool—to make sure that it works as expected. Cypress tests are written in JavaScript or TypeScript and use JavaScript-style test assertions, so if you're comfortable with those, you're good to go. If not, don't worry! We'll walk through the basics of writing a Cypress test to validate our procedure, and I'll show you how to run the test in the Cypress Test Runner and from the command line.

## Considerations

Before we get started, there are a few things to consider when using Cypress for Docs as Tests:

* **Cypress is a UI testing tool.** It's great for validating UI-based procedures, but it's not great for validating non-UI-based procedures. For example, you can't use Cypress to validate a command-line procedure without extensions.
* **Cypress tests are written in JavaScript or TypeScript.** If you're not comfortable with JavaScript or TypeScript, you might find it difficult to write and maintain Cypress tests.
* **Cypress tests are separate from your content.** You can't embed Cypress tests in your content, so you have to maintain them separately. This can make it difficult to keep your tests in sync with your content, especially if you're iterating on your content frequently.

With these considerations in mind, let's get started!

## The setup

For this tutorial, assume you have a simple procedure about searching for American Shorthair kittens:

```markdown
To search for American Shorthair kittens,

1. Go to [Google](https://www.google.com).
2. In the search bar, enter "American Shorthair kittens", then press Enter.

![Search results](search-results.png)
```

We'll call this _kitten-search.md_. Here's a rendered preview:

![Rendered preview of kitten-search.md](/images/validate-ui-doc-detective-before.png)

Notice that we don't have an image of the results. We can capture that as part of the testing.

Following the Docs as Tests ideal that each doc is a test spec, each procedure a test case, and each step an assertion, we can break the procedure into the following testable statements:

1. Users should be able to navigate to [www.google.com](www.google.com).
2. There is a search bar.
3. After entering text into the search bar and pressing Enter, search results appear.

Additionally, there is the screenshot that we want to automatically capture.

To do all of this, we'll create and run a Cypress test that steps through each of the action. First though, let's get Cypress ready on your machine.

## Install Cypress

If you already have Cypress installed, skip to the next section.

Before you can get Cypress running, you need the prerequisites:

* Node.js. I like using [Node Version Manager](https://github.com/nvm-sh/nvm), or you can use the [official installers](https://nodejs.org/).

Once you have those installed, you can install Cypress with NPM.

1. Open your terminal and run the following command to install Cypress on your machine:

    ```bash
    npm install cypress
    npx cypress open
    ```

  The Cypress Test Runner opens.

1. Click **E2E Testing**, click **Chrome**, then click **Start E2E Testing in Chrome**. This opens a new browser window with Cypress running.

## Write the test

Cypress tests are written in JavaScript or TypeScript---we'll use JavaScript for simplicity. Here's a test that validates the procedure we wrote earlier. Create a new file called _kitten-search.cy.js_ in the _cypress/e2e_ directory of your project, and add the following code:

```javascript
// kitten-search.cy.js
describe('Google Search', () => {
  it('Navigates to Google', () => {
      cy.visit('https://www.google.com');
      cy.url().should('include', 'google.com');
      cy.get('[name="q"]').should('be.visible');
      cy.get('[name="q"]').type('American Shorthair kittens{enter}');
      cy.get('#center_col').should('be.visible');
      cy.screenshot('search-results', {capture: 'viewport'});
  });
});
```

Let's break down each portion of the test:

1. `describe` and `it` are Mocha functions that help organize your tests. `describe` is a suite of tests, and `it` is an individual test.
2. `cy.visit` navigates to the specified URL.
3. `cy.url().should('include', 'google.com')` checks that the URL includes "google.com".
4. `cy.get('[name="q"]').should('be.visible')` checks that the search bar is visible.
5. `cy.get('[name="q"]').type('American Shorthair kittens{enter}')` types "American Shorthair kittens" into the search bar and presses Enter.
6. `cy.get('#center_col').should('be.visible')` checks that the search results are visible.
7. `cy.screenshot('search-results', {capture: 'viewport'})` captures a screenshot of the viewport and saves it as _cypress/screenshots/search-results.png_.

**Note:** With Cypress, you have to write your tests in the correct directory or Cypress won't recognize them. Additionally, you can't embed them in your content, so you have to maintain them separately from your docs. This can make it difficult to keep your tests in sync with your content, especially if you're iterating on your content frequently.

Now let's run the test!

## Run the test in the Cypress Test Runner

In the Cypress Test Runner,

1. Click **Specs** in the side navigation.
2. Find and click **kitten-search.cy.js**.

Cypress opens and runs the test in your browser. You'll see the test steps in the left pane and the browser window in the right pane. When the test is done, you'll see a green checkmark next to the test name, indicating that it passed, and you'll find a new screenshot in the _cypress/screenshots_ directory.

If you hover over the steps in the left pane, you can see the screenshots that Cypress took at each step. This is a great way to visually validate that your test is working as expected.

With the new screenshot, _kitten-search.md_ now renders like this:

![Rendered preview of kitten-search.md with screenshot](/images/validate-ui-doc-detective-after.png)

Congratulations, you ran your first Cypress test!

## Run the test from the command line

You can also run your tests from the command line. This is useful for running your tests in continuous integration (CI), or for running your tests in a headless browser.

In your terminal, run the following command to run your test in a headless browser:

```bash
npx cypress run --spec "cypress/e2e/kitten-search.cy.js"
```

Cypress runs your test in a headless browser and outputs the results to the terminal. You'll see a summary of the test results, including the number of tests that passed and failed, and the time it took to run the tests.

## What else can it do?

Cypress is a powerful tool that can do a lot more than what we've covered here, as long as your comfortable with JavaScript or TypeScript. For example, you can:

* [Run your tests in CI](https://docs.cypress.io/guides/guides/continuous-integration.html) to validate your docs on every commit.
* [Use custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) to abstract common actions and make your tests more readable.
* [Use plugins](https://docs.cypress.io/plugins/index.html) to extend Cypress's functionality.

You can also use Cypress to validate other UI-based procedures, like filling out forms, navigating a website, or interacting with a web app. Cypress is a great tool for validating UI-based procedures, and it's a great addition to your Docs as Tests strategy.

---

## About the tool

{% include tools/about-cypress.md %}

---

{% include newsletter.md %}
