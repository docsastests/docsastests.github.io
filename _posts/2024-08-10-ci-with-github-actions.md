---
layout: post
author: nikoberry
image: 
  path: /images/ci-with-github-actions.webp
  thumbnail: /images/ci-with-github-actions.webp
title: "Add Docs as Tests to Your CI/CD Pipeline with GitHub Actions"
categories: tutorial ci cd github github-actions doc-detective
---

> August 10, 2024: Updated the tutorial to use the [Doc Detective GitHub Action](https://github.com/marketplace/actions/doc-detective).

Adding Doc Detective into a CI/CD pipeline to run tests whenever changes occur in a repository is easy and gives you a flexible and powerful tech doc toolchain. In this guide, we’ll walk through setting up a basic Docs as Code pipeline using the venerable Jekyll static site generator, set up some simple doc detective tests, and put together scripts for a CI/CD pipeline using Github Actions to demonstrate how to automatically test your docs off of each update.

## Prerequisites

This tutorial is written for Unix-based systems. If you're using Windows, most of what we're covering regarding GitHub Actions should still apply, but you may need to use different commands to get Jekyll up and running.

This tutorial is mostly focused on setting up Doc Detective in CI/CD, so we're going to assume you have a few things already set up:

- A GitHub account
- [Ruby installed as outlined](https://www.ruby-lang.org/en/documentation/installation/)
- [Jekyll installed as a Ruby Gem](https://jekyllrb.com/docs/installation/)
- [Bundler installed as a Ruby Gem](https://bundler.io/)

## The Lazy Way

If you don’t want to go through all of the following steps, you can fork the [doc-detective-ci-cd starting point branch](https://github.com/nikomancy/doc-detective-ci-cd/tree/starting-point). This branch contains the files and code you would get from following the instructions in this post.

Download the contents of the branch, add them to your own repository's `gh-pages` branch, and push them to origin.

```sh
git clone --branch gh-pages https://github.com/nikomancy/doc-detective-ci-cd.git
```

## Setting up Jekyll

Let's sprint through setting a Jekyll site up with GitHub Pages. (If you want to see a full tutorial on setting up a Jekyll site, [Github has an excellent one](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll))

1. Create a new repository on GitHub. You can name it whatever you want, but for this tutorial, we'll call it `doc-detective-ci-cd`.
1. Clone the repository to your local machine.
1. Open the directory in your terminal and checkout a new branch that we'll call `gh-pages` by using `git checkout --orphan gh-pages`.
1. Jekyll only generates the files for a new site in an empty directory, so delete all the files in the directory and run the following command:

```bash
jekyll new --skip-bundle .
```

This creates a new Jekyll site in the current directory. The `--skip-bundle` flag tells Jekyll to skip installing the dependencies, as we'll be using Bundler to manage them.

In the root of your newly scaffolded Jekyll site, find and open your Gemfile, then comment out the line that starts with `gem "jekyll",`

Next, uncomment the line that starts with `gem "github-pages",` and save the file.

Edit that line to include the current version of GitHub Pages. You can find the current version by visiting the [GitHub Pages Dependency Versions](https://pages.github.com/versions/) page.

```ruby
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

Save the file and close it.

Now, open the `_config.yml` file and change the `url` and `baseurl` to match your repository name. For example, if your repository is called `doc-detective-ci-cd`, you would change the `url` and `baseurl` to:

```yaml
baseurl: "/doc-detective-ci-cd/" # the subpath of your site, e.g. /blog
url: "http://<your username>.github.io" # the base hostname & protocol for your site
```

Close the file and save it.

Finally, run the following command in your terminal:

```bash
bundle add webrick
bundle install
```

This will add the missing webrick dependency to your gemfile and install the dependencies for your Jekyll site.

Save and commit the changes from this section to your repository then push this branch back to origin with `git push origin gh-pages`.

## Setting up GitHub pages

Since Github automatically looks for a `gh-pages` branch in your repository, you don't need to do anything else to set up GitHub Pages. You can now visit `https://<your-github-username>.github.io/<your-repository-name>` to see your site.

## Adding content to your site

You can add content to your site by adding markdown files to the `_posts` directory. In this case, we're going to add a Markdown file that contains inline Doc Detective tests.

Create a new file in the `_posts` directory called `2024-02-16-reqres-docs.md`, and add the following content:

```markdown
---
layout: post
title:  "Reqres API"
---

## Resource Endpoint
If you execute this command in your terminal:

[comment]: # (test start {"id": "Test 1", "description": "Test if the endpoint is working at all."})

    ```sh
    curl -X 'GET' \
      'https://reqres.in/api/{resource}' \
      -H 'accept: application/json'
    ```

[comment]: # (step {"action": "httpRequest", "url": "https://reqres.in/api/{resource}"})

The API will return a list of resources.

[comment]: # (test end)

## Creating Users
If you execute this command in your terminal:

[comment]: # (test start {"id": "Test 2", "description": "Test the user creation endpoint"})

    ```sh
    curl --request POST \
      --url https://reqres.in/api/users \
      --header 'Content-Type: application/json' \
      --header 'accept: application/json' \
      --data '{
    "name": "Doc Brown",
    "job": "Test master"
    }'
    ```

[comment]: # (step { "action": "httpRequest", "url": "https://reqres.in/api/users", "method": "post", "requestData": { "name": "Doc Brow", "job": "Test master" }, "responseData": { "name": "Doc Brown" }, "statusCodes": [200, 201] })

The API will return confirmation that the request created a new user and will list the fields on that user.

[comment]: # (test end)
```

Now, save and commit the changes to your repository and push them to the `gh-pages` branch.

## Setting up GitHub Actions

Now that we have a Jekyll site set up and hosted on GitHub Pages, we can set up the [Doc Detective GitHub Action](https://github.com/marketplace/actions/doc-detective) to run the tests whenever we push new content to the `gh-pages` branch.

Create a new file in the `.github/workflows` directory called `docs-as-tests.yml`, and add the following content:

```yaml
name: Docs as Tests
```

Next, let's add a trigger to the workflow that prompts the action to run whenever we push new content to the `gh-pages` branch.

```yaml
on:
  push:
    branches:
      - gh-pages
```

Now, let's add a job to the workflow that runs the tests. Github Actions run on a fresh virtual machine each time they're triggered, so we need to check out the repository with our changes.

```yaml
jobs:
  run-tests:
    steps:

    - name: Checkout doc-detective-ci-cd repository
      uses: actions/checkout@v4
```

Finally, we can run the tests by running Doc Detective and passing the path to the `_posts` directory in the repository we're running the tests on. We’ll also set `exit_on_fail` to `true` to throw an error if there are any failed tests.

```yaml
    - name: Run Doc Detective tests
      uses: doc-detective/github-action@v1
      with:
        input: _posts/
        exit_on_fail: true
```

Putting the entire workflow together, we get the following:

```yaml
name: Docs as Tests

on:
  push:
    branches:
      - gh-pages

jobs:
  run-tests:
    runs-on: ubuntu-latest
    steps:

    - name: Checkout doc-detective-ci-cd repository
      uses: actions/checkout@v4

    - name: Run Doc Detective tests
      uses: doc-detective/github-action@v1
      with:
        input: _posts/
        exit-_on_fail: true
```

Save and commit the changes to your repository and push them to the `gh-pages` branch. Now, whenever you push new content to the `gh-pages` branch, the tests will run and you will be able to see the results in the Actions tab of your repository.

There’s a failing test in the markdown test earlier in this post. The Github action should be failing and will provide some additional details to help with fixing it. In this case, it’s just a typo in a test. But, if the service the tests rely on breaks, you will get the same error.

## Conclusion

In this tutorial, we set up a Jekyll site with GitHub Pages, added content to the site, and set up a GitHub Action to run Doc Detective tests on the content whenever we push new content to the `gh-pages` branch. Now, as your product evolves, you can be confident that changes that break the test will come to your attention immediately.

---

## About the tool

{% include tools/about-doc-detective.md %}

---

{% include newsletter.md %}
