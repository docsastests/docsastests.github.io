---
layout: post
image: 
  path: /images/validate-commands-with-innovation-engine.webp
  thumbnail: /images/validate-commands-with-innovation-engine.webp
title: "Validate Commands With Microsoft Azure's Innovation Engine"
categories: tutorial bash code-blocks innovation-engine microsoft azure
---

Not every Docs as Tests implementation needs to be complicated. If you can narrow down exactly what you want to test, such as running the `curl` commands you have in code blocks, you might be able to test your docs with a script.

Here, we'll cover how to test all the curl commands in code blocks within a tutorial written in Markdown. This is a `bash` script, and no tooling is necessary other than a `bash` shell.


## Prerequisites

This tutorial is *slightly* more advanced than other recent ones. Let's make sure you're ready to go. You need

- A Linux environment (WSL on Windows works great). Sorry, Innovation Engine is Linux-only at the moment.
- [Go](https://go.dev/doc/install) installed on your machine.

    As of writing, the latest version of Go is v1.22.2, and you can install it on AMD64 systems with the following commands:

    ```bash
    wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz && echo "Downloaded Go"
    tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
    export PATH=$PATH:/usr/local/go/bin
    go version
    ```

    The output should be similar to
    ```
    Downloaded Go
    go version go1.22.2 linux/amd64
    ```

## Set up Innovation Engine

To install and build Innovation Engine, we just need to clone the repo and run the build command:

```bash
git clone https://github.com/Azure/InnovationEngine
cd InnovationEngine
make build-ie
```

The output should be similar to
<!!--expected_similarity=0.8-->
```
Building the Innovation Engine CLI...
```

This builds the Innovation Engine binary in the `bin` directory. You can move this binary to a location in your `PATH` for easy access.

## Test a document

Here's a simple tutorial in Markdown that uses ReqRes, a frontend testing API that uses fake data. The tutorial focuses on two common API requests: fetching a list of users and creating a new user.


Using Innovation Engine, we can test the commands in the `curl` code blocks to make sure they run correctly.

1. Download <a href="/assets/reqres_tutorial.md" download="reqres_tutorial.md">reqres_tutorial.md</a>.


The script reads the Markdown file, executes the `curl` commands, and captures the output. You can then use this output to validate the commands in your tutorial.

This simple script demonstrates how you can test your documentation by running the commands in your code blocks. You can extend this script to handle more complex scenarios or integrate it into your CI/CD pipeline to automate your documentation testing.

By validating your documentation with scripts, you can ensure that your code examples are accurate and up-to-date, providing a better experience for your users.

[reqres_tutorial.md]: /assets/reqres_tutorial.md
