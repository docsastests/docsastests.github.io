---
layout: post
image: 
  path: /images/validate-commands-with-a-script.webp
  thumbnail: /images/validate-commands-with-a-script.webp
title: "Validate a UI with Cypress"
categories: tutorial bash code-blocks
---

Not every Docs as Tests implementation needs to be complicated. If you can narrow down exactly what you want to test, such as running the `curl` commands you have in code blocks, you might be able to test your docs with a script.

Here, we'll cover how to test all the curl commands in code blocks within a tutorial written in Markdown. This is a `bash` script, and no tooling is necessary other than a `bash` shell.

## The Short Way

1. Download [reqres_tutorial.md][].
1. Download [run_curl_blocks.sh][].
1. In a terminal, make the script executable:

    ```bash
    chmod +x run_curl_blocks.sh
    ```

1. Run the script, passing the Markdown file as an argument:

    ```bash
    ./run_curl_blocks.sh reqres_tutorial.md
    ```

## The Long Way

Here's a simple tutorial in Markdown that uses ReqRes, a frontend testing API that uses fake data. The tutorial focuses on two common API requests: fetching a list of users and creating a new user.

```markdown
# ReqRes API Tutorial

This tutorial covers the basics of interacting with the ReqRes API, a fake online REST API designed for testing and prototyping. We'll go through two common operations: fetching a list of users and creating a new user.

## Getting Started

ReqRes is a free service and doesn't require authentication, making it perfect for quick testing.

## 1. Fetching a List of Users

The ReqRes API allows you to fetch a paginated list of users. This can be useful for understanding how to navigate through paginated responses in APIs.

### Request:

- **Method**: GET
- **Endpoint**: `https://reqres.in/api/users`
- **Query Parameters**:
  - `page`: Specify the page number to retrieve.

### Example:

To fetch the first page of users, you would make the following `curl` request:

    ```curl
    curl https://reqres.in/api/users
    ```

### Response:

The response is a JSON object containing an array of users, the total number of users, and pagination details.

    ```json
    {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            },
            // More users...
        ]
    }
    ```

## 2. Creating a New User

The ReqRes API also allows you to create a new user. This is a basic example of a POST request.

### Request:

- **Method**: POST
- **Endpoint**: `https://reqres.in/api/users`
- **Body** (JSON):
  - `name`: The name of the new user.
  - `job`: The job title of the new user.

### Example:

To create a new user, send a JSON payload with the user's name and job title:

    ```curl
    curl -X POST https://reqres.in/api/users \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Jane Doe",
        "job": "Developer"
      }'
    ```

### Response:

The response contains the details of the created user along with a timestamp.

    ```json
    {
        "name": "Jane Doe",
        "job": "Developer",
        "id": "123",
        "createdAt": "2020-04-20T09:27:34.685Z"
    }
    ```

This concludes the tutorial on how to interact with the ReqRes API, specifically focusing on fetching user data and creating a new user.
```

Using this tutorial, we can write a script that runs the commands in ````curl` code blocks to make sure they run correctly.

Save the following bash script as *run_curl_blocks.sh*:

```bash
#!/bin/bash
# run_curl_blocks.sh

# Check if a file name is provided as an argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

# File to process
FILE=$1

# Check if the file exists
if [ ! -f "$FILE" ]; then
    echo "File not found!"
    exit 1
fi

# Variables to keep track of the state and store block contents
inside_curl_block=0
curl_command=""

# Start reading the file and executing curl code blocks
while IFS= read -r line; do
# Detect the start of a curl block
    if [[ $line == "```curl" ]]; then
        inside_curl_block=1
        curl_command=""
        continue
    fi

    # Detect the end of a curl block
    if [[ $line == "```" ]] && [ $inside_curl_block -eq 1 ]; then
        inside_curl_block=0
        # Execute the curl command and capture the output
        actual_json=$(eval "$curl_command")
        continue
    fi

    # Store curl command lines
    if [ $inside_curl_block -eq 1 ]; then
        curl_command+="$line\n"
    fi

done < "$FILE"
```

This script reads a Markdown file and executes the `curl` commands in code blocks. It detects the start and end of a `curl` code block and executes the command using `eval`.

To run the script, make it executable:

```bash
chmod +x run_curl_blocks.sh
```

Then run the script, passing the Markdown file as an argument:

```bash
./run_curl_blocks.sh reqres_tutorial.md
```

The script reads the Markdown file, executes the `curl` commands, and captures the output. You can then use this output to validate the commands in your tutorial.

This simple script demonstrates how you can test your documentation by running the commands in your code blocks. You can extend this script to handle more complex scenarios or integrate it into your CI/CD pipeline to automate your documentation testing.

By validating your documentation with scripts, you can ensure that your code examples are accurate and up-to-date, providing a better experience for your users.

[reqres_tutorial.md]: /artifacts/reqres_tutorial.md
[run_curl_blocks.sh]: /artifacts/run_curl_blocks.sh
