---
layout: post
image: 
  path: /images/validate-cli-innovation-engine.png
  thumbnail: /images/validate-cli-innovation-engine.png
title: "Validate README Commands with Innovation Engine"
categories: tutorial cli bash code-blocks innovation-engine microsoft azure
---

Maintaining accurate and reliable CLI-based documentation is critical, especially when it comes to installation instructions and READMEs.

Azure's Innovation Engine, [introduced at the Linux Foundation Open Source Summit North America 2024](https://youtu.be/6eNLouO0LcA?si=vvAYCMAPo7yRMD3C){:target="_blank"}, transforms Markdown into executable scripts, enabling interactive tutorials, automated tests, response validation, and execution of CLI commands. While Innovation Engine is still in the early stages of development, it shows promise for improving the quality and accuracy of CLI-based docs.

Here, we'll cover how to use Innovation Engine to test all the `bash` commands in code blocks within a tutorial written in Markdown. We'll use a simple tutorial that interacts with the ReqRes API, a fake online REST API designed for testing and prototyping. One item to note, though: Innovation Engine is Linux-only at the moment, so you'll need a Linux environment ([Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/){:target="_blank"} on Windows works great) to follow along.

## Prerequisites

This tutorial is *slightly* more advanced than other recent ones. Let's make sure you're ready to go. You need

- A Linux environment (or WSL on Windows).
- [Go](https://go.dev/doc/install){:target="_blank"} installed on your machine.

## Set up Innovation Engine

To install and build Innovation Engine, we just need to clone the repo and run the build command:

```bash
VERSION="latest"
wget -q -O ie https://github.com/Azure/InnovationEngine/releases/download/$VERSION/ie
chmod +x ie
```

This downloads the Innovation Engine binary and makes it executable.

## Sample document and formatting

Here's a [simple tutorial](/assets/reqres_tutorial.md){:target="_blank"} in Markdown that uses ReqRes, a testing API that uses fake data. The tutorial focuses on two common API requests: fetching a list of users and creating a new user.

Each command is in a bash code block, and the expected output is in a JSON code block below it. By default, Innovation Engine runs commands in bash code blocks to make sure they run as expected. For example:

```markdown
    ```bash
    curl -X POST https://reqres.in/api/users \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Jane Doe",
        "job": "Developer"
      }'
    ```
```

To validate responses, you need to add an HTML-style comment before the immediately following code block and include the `expected_similarity` key and a value between 0 and 1. This value represents the similarity between the expected output and the actual output, allowing for fuzzy matching.

```markdown
    <!--expected_similarity=0.8-->
    ```
    {"name":"Jane Doe","job":"Developer","id":"557","createdAt":"2024-07-04T21:58:42.684Z"}
    ```
```

**Note:** Response code blocks can't have language tags, so you can't use `json` or `bash` here. If there's a language tag, Innovation Engine won't consider it a response block.

## Testing the commands

Using Innovation Engine, we can test the commands in the code blocks to make sure they run correctly.

1. Download <a href="/assets/reqres_tutorial.md" download="reqres_tutorial.md">reqres_tutorial.md</a> into the same directory at the `ie` binary.
1. Run the following command to test the commands in the tutorial:

    ```bash
    ./ie test reqres_tutorial.md
    ```

    This command reads the Markdown file, executes the `curl` commands, and validates the output.

    The output should look similar to this:

    ```
    $ ./ie test reqres_tutorial.md
    bash:$ curl https://reqres.in/api/users

    {"page":1,"per_page":6,"total":12,"total_pages":2,"data":[{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
    bash:$ curl -X POST https://reqres.in/api/users \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Jane Doe",
        "job": "Developer"
      }'

    {"name":"Jane Doe","job":"Developer","id":"334","createdAt":"2024-07-04T22:17:31.936Z"}
    ```

    The output shows the commands being executed and the expected output. If the actual output matches the expected output within the similarity threshold, the test passes. If the output isn't similar enough to the expected output, the test fails.

## Wrapping up

By validating your documentation with Innovation Engine, you can make sure that your code examples are always accurate and functional. While Innovation Engine is limited to testing CLI docs, it can be integrated into your CI/CD pipeline to automate your testing and make sure that your most important CLI-based docs, like installation instructions, are always up-to-date and accurate.

---

## About the tool

{% include tools/about-innovation-engine.md %}

---

{% include newsletter.md %}
