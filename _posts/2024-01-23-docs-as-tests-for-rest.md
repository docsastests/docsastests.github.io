---
layout: post
author: nikoberry
image: 
  path: /images/docs-as-tests-for-rest.png
  thumbnail: /images/docs-as-tests-for-rest.png
title: "Docs as Tests for REST"
date: 2024-01-23 00:00:00 -0000
categories: tutorial doc-detective REST APIs
---

Docs as Tests draws on many of the same principles as test-driven-development and data-driven-development and, as such, is a natural fit for REST API documentation.

Our tool of choice for this tutorial is [Doc Detective](https://doc-detective.com/). Doc Detective is a new open-source tool that brings the power of QA engineering-style assertion tests to technical documentation. The codifier of Docs as Tests also develops it and is, at the time of writing, the only tool built with Docs as Tests in mind.

This tutorial assumes you know the following:

- The general structure of REST APIs (Endpoints, resources, payloads)
- How to use an HTTP Client to work with REST APIs.
- How to write JSON.
- The basics of installing packages for Node JS using NPM (if the letters `npm i` mean something to you, you're good to go).

This tutorial also assumes you have the current LTS version of Node JS installed on your machine.

## Install Doc Detective

Install Doc Detective by cloning it onto your machine using Git, navigating into the folder, and using `npm i`.

```bash
git clone https://github.com/doc-detective/doc-detective.git
cd doc-detective
npm install
```

## How to think about Docs as Tests

Docs as Tests pushes you towards thinking about your documentation scientifically by making you think of your docs as a set of testable claims about your product.

When you say, "Sending a GET request to the `/dogs` endpoint will return an enumerated list of dog objects," your docs are making an assertion about how the API will perform. By rephrasing that assertion in the form of a test that you store in a JSON object alongside the docs, you can know when something changes about the product that renders the assertion incorrect.

For REST APIs this is as simple as scripting calls to an API and comparing the results against what you expect them to be. Doc Detective provides simple tools for doing this.

## Doc Detective core concepts

Doc detective lets you create tests for your docs. You create these tests by creating test schemas in JSON. Tests in Doc Detective have a set of steps that you define and Doc Detective executes in sequence. Each step contains an action which sets ‘what’ Doc Detective does for each step as well as a set of action specific fields that determine ‘how‘ each action gets executed.

For the simple REST API tests in this tutorial, we’re going to focus on different ways of using Doc Detective’s [`httpRequest` action](https://doc-detective.com/reference/schemas/httpRequest.html).

## Writing your first Doc Detective test

Create a folder named “test-specs” next to the cloned repository of Doc Detective.

```
|
+- doc-detective
+- test-specs
```

In the test-specs folder, create a file called rest-test.spec.json. This file is going to be the spec for Doc Detective to run. All the spec object needs to run is a set of tests, but it’s a good practice to give it an `id` and `description` for book keeping

```json
{
  "id": "http tests",
  "description": "Some tests to test how Docs as Tests works with REST.",
  "tests": []
}
```

The `tests` object is where the magic happens. It holds an array of `test` objects which themselves hold arrays of `step` objects. 

Let’s start off with the absolute basics and add a test that calls the api for [reqres.in](http://reqres.in) and mark the test as passed if the API returns a successful HTTP response code.

```json
{
  "id": "http tests",
  "description": "This is a test collection",
  "tests": [
    {
      "id": "Test 1",
      "description": "Check if the API is working at all.",
      "steps": [
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/{resource}"
        }
      ]
    }
  ]
}
```

On its own, just checking to see if a URL returns a response is already a powerful tool for making sure docs remain accurate especially for simple `GET` endpoints.

Now, save the JSON and return to your terminal that is currently running in the doc-detective directory and execute the following command:

```bash
npm run runTests -- --input ../test-specs/rest-test.spec.json
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests.

## Using other HTTP methods

Testing how endpoints respond to `GET` can only take you so far. The vast majority of APIs you might document will use other methods besides `GET` and Doc Detective supports those with only a few additional lines to the test file.

```json
{
  "id": "http tests",
  "description": "This is a test collection",
  "tests": [
    {
      "id": "Test 2",
      "description": "Test the user creation endpoint",
      "steps": [
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users",
          "method": "post",
          "requestData": {
            "name": "Doc Brown",
            "job": "Test master",
            "statusCodes": [200, 201]
          }
        }
      ]
    }
  ]
}
```

Notice that we’ve added a `statusCodes` object with `200` and `201` as possible response codes. `200` is a very common success code for most calls to an API and is the default code Doc Detective tests. The `POST /users` endpoint of [reqres](http://reqres.in) returns a `201` on the successful creation of a new user and we need to call that out as an acceptable response code otherwise our test will be marked as a failure.

Save the JSON and return to your terminal that is currently running in the doc-detective directory and execute the following command:

```bash
npm run runTests -- --input ../test-specs/rest-test.json
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests.

## Testing for specific response contents

While confirming that an API works and returns a certain status code can be helpful, you probably care a lot more about whether the specific details of the how the API responded and what it responded with so you can make sure the claims you’re making in your docs are still valid. Doc Detective has you covered and it only takes a little bit more work.

```json
{
  "id": "http tests",
  "description": "This is a test collection",
  "tests": [
    {
      "id": "Test 2",
      "description": "Test the user creation endpoint",
      "steps": [
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users",
          "method": "post",
          "requestData": {
            "name": "Doc Brown",
            "job": "Test master"
          },
          "responseData": {
            "name": "Doc Brown"
          },
          "statusCodes": [200, 201]
        }
      ]
    }
  ]
}
```

Now, when you run this test, it will throw an error if the API does not return `name` and `job` fields matching the values you provided.

Save the JSON and return to your terminal that is currently running in the doc-detective directory and execute the following command:

```bash
npm run runTests -- --input ../test-specs/rest-test.spec.json
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests.

## Inline tests

While keeping tests in a separate doc is a clean and convenient way to write JSON, sometimes you might want to keep your tests inline with the rest of your content to make it easier to associate test steps with sections in your docs and know when a test needs to be updated.

Doc Detective supports this approach if you’re documenting your code using markdown and a docs-as-code toolchain.

First, let’s take a moment to look at the following block of of crude documentation:

```markdown
# Reqres API
Here's some simple information about the Resreq API.

## Resource Endpoint
If you execute this command in your terminal:

    ```sh
    curl -X 'GET' \
    'https://reqres.in/api/{resource}' \
    -H 'accept: application/json'
    ```

The API will return a list of resources.

## Creating Users
If you execute this command in your terminal:

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

The API will return confirmation that the request created a new user and will list the fields for that user.
```

This is an example of some of documentation that might have prompted the creation of our rest-test.json spec for Doc Detective. By thinking in tests, we can see how the docs contain a set of statements that we end up testing. However, depending on your taste for updating docs, writing tests, and tracking storage, you may find it more convenient to keep the tests inline with the rest of the docs, then you can do so by adding inline comments.

Take a look at the previous markdown document with Doc Detective tests inserted inline:

```markdown
# Reqres API

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

[comment]: # (step { "action": "httpRequest", "url": "https://reqres.in/api/users", "method": "post", "requestData": { "name": "Doc Brown", "job": "Test master" }, "responseData": { "name": "Doc Brown" }, "statusCodes": [200, 201] })

The API will return confirmation that the request created a new user and will list the fields on that user.

[comment]: # (test end)
```

Take note of the following traits of inline tests.

- Each test begins with a `(test start)` and `(test end)` statement.
- Tests can have one or more steps which are declared with `(step)` statements.
- Each step includes json that is exactly the same as the step objects in rest-test.spec.json but reduced to a single string.

If you don’t like this syntax for inline tests, you can customize it in the config files for 

Copy the markdown with inline tests, paste it into your [rest-test.md](http://rest-test.md) file in the test-specs folder and then run the following in the command line:

```bash
npm run runTests -- --input ../test-specs/rest-test.md
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests.

## Loading data from a .env file

If an API does anything important, it probably has some kind of authentication. One of the most common authentications is including an API secret as a field in the request body. Since hard coding authentication keys into source code is bad for security, Doc Detective includes tools to load variables from a .env file.

Create a folder called .env in the same directory as your rest-test.spec.json file. Add the following text to your .env file and save it.

```
USER="John Doe"
JOB="Software Engineer"
SECRET="YOUR_SECRET_KEY"
```

Create another file in the same directory named env-variable-tests.spec.json and add the following text to the file:

```json
{
  "id": "env variables test",
  "description": "These tests will show off how using env files to set variables works in Doc Detective.",
  "tests": [
    {
      "id": "env variable test 1",
      "description": "Testing setting variables from .env file",
      "steps": [
        {
          "action": "setVariables",
          "path": "../test-specs/.env"
        },
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users",
          "method": "post",
          "requestData": {
            "auth": "$SECRET",
            "name": "$USER",
            "job": "$JOB"
          },
          "responseData": {
            "name": "John Doe",
            "job": "Software Engineer"
          },
          "statusCodes": [200, 201]
        }
      ]
    }
  ]
}
```

In this example there’s a step with a `setVariables` action. This will look at the file at the path we designate and load all of its key value pairs as variables that you can invoke with a syntax reminiscent of calling variables in BASH (`“$VAR”`).

Run the following in the command line:

```bash
npm run runTests -- --input ../test-specs/env-variable-tests.spec.json
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests. Since the tests pass, you can be sure that the tests used the `USER` and `JOB` variables from the .env file.

## Saving data as variables and chaining tests

A common case while working with APIs is needing to make a sequence of chained calls to the API where you include data from a previous response in the requests. Doc Detective supports this through the `envsFromResponseData` field on the `httpRequest` action.

Let’s replace the current code in env-variable-tests.spec.json with the following.

```json
{
  "id": "http tests",
  "description": "This is a test collection",
  "tests": [
    {
      "id": "env variables test",
      "description": "These tests will show off how using env files to set variables works in Doc Detective.",
      "steps": [
        {
          "action": "setVariables",
          "path": "../test-specs/.env"
        },
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users",
          "method": "post",
          "requestData": {
            "auth": "$SECRET",
            "name": "$USER",
            "job": "$JOB"
          },
          "responseData": {
            "name": "John Doe",
            "job": "Software Engineer"
          },
          "envsFromResponseData": [
            {
              "name": "ID",
              "jqFilter": ".id"
            }
          ],
          "statusCodes": [200, 201]
        },
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users/$ID",
          "method": "get",
          "responseData": {
            "name": "John Doe",
            "job": "Software Engineer"
          },
          "statusCodes": [200, 201]
        }
      ]
    }
  ]
}
```

This code has the `envsFromResponseData` which sets a new `ID` environment variable with a value equal to the id value returned when we create a new user. In the following `httpRequest` test, we include `ID` variable in the URL we send the GET request to. 

Run the following in the command line to confirm that the tests work as expected:

```bash
npm run runTests -- --input ../test-specs/env-variable-tests.spec.json
```

Doc Detective should return confirmation that your test passes after taking a moment to execute the tests.

## Wrapping up

Docs as Tests provides a powerful approach to ensuring the accuracy and consistency of REST API documentation while also having a framework that alerts you when new feature development leaves your docs stale. With Doc Detective, you can easily incorporate QA engineering-style assertion tests into your technical documentation workflow.

---

## About the tool

{% include tools/about-doc-detective.md %}

---

{% include newsletter.md %}
