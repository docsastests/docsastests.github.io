---
layout: post
author: mannysilva
image: 
  path: /images/validate-scripts-with-doc-detective.webp
  thumbnail: /images/validate-scripts-with-doc-detective.webp
date: 2024-02-13 00:00:00 -0000
title: "Validate Commands and Scripts with Doc Detective"
categories: tutorial doc-detective shell terminal scripts bash native
---

We've covered how to validate [UI procedures](/validate-ui-with-doc-detective) and [API procedures](/validate-api-with-doc-detective) with Doc Detective, but what about shell commands and scripts? After all, not every procedure is navigating through UIs or making API calls.

Today, I'll walk you through validating both shell commands and scripts, using the commands from the UI validation tutorial as a starting point. We'll use Doc Detective to validate that the commands work as expected and show how you can run scripts to validate code or commands written in other languages.

{% include tools/disclosure-doc-detective.md %}

This is going to get a little meta!

## The setup

In the UI validation tutorial, we validated a procedure for searching for American Shorthair kittens on Google, but if you look at all the steps involved, a lot was going on:

1. Install Doc Detective.
2. Save the procedure as a Markdown file.
3. Write a test in JSON.
4. Run the test.
5. Validate the results.

The secret to validating shell commands and scripts is Doc Detective's [runShell](https://doc-detective.com/reference/schemas/runShell.html) action. This action lets you run a shell command or script and validate the results.

We'll do this a few ways: first, we'll test individual commands and validate them one at a time, then we'll create and run a script to perform the whole UI validation procedure in one go, and finally I'll show you how to validate scripts in whatever language you prefer. Before that though, let's get Doc Detective ready on your machine.

## Install Doc Detective

If you already have Doc Detective installed, skip to the next section.

Before you can get Doc Detective running, you need the prerequisites:

* Node.js 18 or higher. I like using [Node Version Manager](https://github.com/nvm-sh/nvm), or you can use the [official installers](https://nodejs.org/).
* [Git](https://git-scm.com/)

Once you have those installed, you can clone Doc Detective to your machine and install dependencies:

```
git clone https://github.com/doc-detective/doc-detective.git
cd doc-detective
npm install
```

## Validate individual commands

Running shell commands and scripts with Doc Detective is straightforward. The command or script runs in your device's native shell (`cmd` on Windows and `bash` on macOS and Linux), and if the command or script returns a non-zero exit code, the test fails.

We can test this out with a single test that has two steps. The first step runs a command that should pass, and the second step runs a command that should fail. Let's save this test as _command-validation.spec.json_:

```json
{
  "tests": [
    {
      "id": "single-command-validation",
      "description": "The first step should pass. The second step should fail.",
      "steps": [
        {
          "action": "runShell",
          "command": "echo 'Hello, world!'"
        },
        {
          "action": "runShell",
          "command": "exit 1"
        }
      ]
    }
  ]
}
```

Now, let's run the test:

```bash
npm run runTests -- -i command-validation.spec.json
```

Great! We see that the first command passed and the second command failed. This is exactly what we expected because the second command exits with a non-zero exit code. But while these steps test individual commands, you'll often want to run a script to test multiple commands at once. Let's look at how to do that.

## Validate a bash script

**Note:** The following commands are for a `bash` shell. If you're using Windows, make sure `bash` is available from `cmd`, such as through [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install) or [Git Bash](https://git-scm.com/downloads).

Let's look at each of the steps in the UI validation procedure and identify commands that would complete them:

1. Install Doc Detective:

    ```bash
    git clone https://github.com/doc-detective/doc-detective.git
    cd doc-detective
    npm install
    ```

2. Save the procedure as a Markdown file:

    ```bash
    echo -e 'To search for American Shorthair kittens,\n\n1. Go to [Google](https://www.google.com).\n\n2. In the search bar, enter \"American Shorthair kittens\", then press Enter.\n\n![Search results](search-results.png)' > kitten-search.md
    ```
    
3. Write a test in JSON:

    ```bash
    echo -e '{ "tests": [ { "steps": [ { "action": "goTo", "url": "https://www.google.com" }, { "action": "find", "selector": "[title=Search]", "click": true }, { "action": "typeKeys", "keys": ["American Shorthair kittens", "$ENTER$"] }, { "action": "wait", "duration": 5000 }, { "action": "saveScreenshot", "path": "search-results.png" } ] } ]}' > kitten-search.spec.json
    ```

4. Run the test:

    ```bash
    npm run runTests -- -i kitten-search.spec.json
    ```

5. Validate the results, in this case by checking that the screenshot and test results files exist:

    ```bash
    FILE=search-results.png; if [ -f "$FILE" ]; then echo "File $FILE exists."; else false; fi
    for file in testResults-*.json; do [ -e "$file" ] && echo "File $file exists." || false; break; done
    ```

If you wanted to validate each of these commands individually, you could, but that's a lot of work. Instead, let's create a `bash` script. Save the following script as _ui-validation.sh_:

```bash
# ui-validation.sh
#
# !/bin/bash
git clone https://github.com/doc-detective/doc-detective.git
cd doc-detective
npm install
echo -e 'To search for American Shorthair kittens,\n\n1. Go to [Google](https://www.google.com).\n\n2. In the search bar, enter \"American Shorthair kittens\", then press Enter.\n\n![Search results](search-results.png)' > kitten-search.md
echo -e '{ "tests": [ { "steps": [ { "action": "goTo", "url": "https://www.google.com" }, { "action": "find", "selector": "[title=Search]", "click": true }, { "action": "typeKeys", "keys": ["American Shorthair kittens", "$ENTER$"] }, { "action": "wait", "duration": 5000 }, { "action": "saveScreenshot", "path": "search-results.png" } ] } ]}' > kitten-search.spec.json
npm run runTests -- -i kitten-search.spec.json
FILE=search-results.png; if [ -f "$FILE" ]; then echo "File $FILE exists."; else exit 1; fi
for file in testResults-*.json; do [ -e "$file" ] && echo "File $file exists." || exit 1; break; done
```

Now, we can validate the whole procedure with a single command. Let's save this test as _ui-validation.spec.json_:

```json
{
  "tests": [
    {
      "id": "ui-validation",
      "description": "Validate the UI procedure for searching for American Shorthair kittens on Google.",
      "steps": [
        {
          "action": "runShell",
          "command": "bash ui-validation.sh"
        }
      ]
    }
  ]
}
```

Now that we have our test and script, let's run it. Note that while the script is running, we won't see any output in the terminal. Please be patient.

```bash
npm run runTests -- -i ui-validation.spec.json
```

This script is a little more complex than the others, but it's a great way to validate a whole procedure in one go.

## Validate other kinds of scripts

Script validation isn't limited to `bash`. As long as your script can return a non-zero exit code, in can be in any language you like, whether that's JavaScript, Python, Ruby, or whatever else. Any command you can run from the command line, you can validate with Doc Detective. Need to validate an SDK? Write a script and go for it.

For example, here's a script that validates only the outputs of our UI procedure. Save this script as _validate-kitten-search-outputs.js_:

```javascript
// validate-kitten-search-outputs.js
const fs = require('fs');

const FILE = 'search-results.png';
if (fs.existsSync(FILE)) {
  console.log(`File ${FILE} exists.`);
} else {
  process.exit(1);
}

const files = fs.readdirSync(process.cwd());
const testResults = files.filter(file => file.startsWith('testResults-'));
if (testResults.length > 0) {
  console.log(`File ${testResults[0]} exists.`);
} else {
  process.exit(1);
}
```

We can test this just as easily as our other script. Save the following test as _js-validation.spec.json_:

```json
{
  "tests": [
    {
      "id": "js-validation",
      "description": "Validate outputs for searching for American Shorthair kittens on Google.",
      "steps": [
        {
          "action": "runShell",
          "command": "node validate-kitten-search-outputs.js"
        }
      ]
    }
  ]
}
```

And finally, run the test:

```bash
npm run runTests -- -i js-validation.spec.json
```

Just like the `bash` script and the individual commands before it, this script exits cleanly. You're welcome to try deleting the output files and watching it fail too!

## One more thing!

If you're not running Doc Detective as part of a script, you can use `runShell` to help set up your test environment. For example, you can use `runShell` to install dependencies, spin up Docker containers, or perform other setup tasks before running your tests. This is a great way to automate your tests and keep them self-contained.

## Conclusion

If you want to validate individual commands, to validate scripts in whichever language you require, or to automate your testing environment, Doc Detective is a powerful tool at your disposal. With Doc Detective, you can validate UIs, APIs, and everything in between to make sure your content works the way you and your users expect.

---

## About the tool

{% include tools/about-doc-detective.md %}

---

{% include newsletter.md %}
