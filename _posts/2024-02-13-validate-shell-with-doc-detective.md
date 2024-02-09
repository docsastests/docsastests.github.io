---
layout: post
author: mannysilva
image: 
  path: /images/validate-shell-with-doc-detective.png
  thumbnail: /images/validate-shell-with-doc-detective.png
date: 2024-02-07 00:00:00 -0000
title: "Validate Shell Commands and Scripts with Doc Detective"
categories: tutorial doc-detective shell terminal scripts bash native
---

We've covered how to validate [UI procedures](/validate-ui-with-doc-detective) and [API procedures](/validate-api-with-doc-detective) with Doc Detective, but what about shell commands and scripts? After all, not every procedure is navigating through UIs or making API calls.

Today, I'll walk you through validating both shell commands and scripts, using the commands from the UI validation tutorial as a starting point. We'll use Doc Detective to validate that the commands work as expected and show how you can run scripts to validate code or commands written in other languages.

{% include tools/disclosure-doc-detective.md %}

This is going to get a little meta!

## The setup

In the UI validation tutorial, validated a procedure for searching for American Shorthair kittens on Google, but if you look at all the steps involved, a lot was going on:

1. Install Doc Detective.
2. Save the procedure as a Markdown file.
3. Write a test in JSON.
4. Run the test.
5. Validate the results.

The secret to validating shell commands and scripts is Doc Detective's [runShell](https://doc-detective.com/reference/schemas/runShell.html) action. This action lets you run a shell command or script and validate the results.

We'll do this couple ways: first, we'll identify individual commands and validate them one at a time, then we'll create and run a JavaScript script to validate the whole procedure in one go. Before that though, let's get Doc Detective ready on your machine.

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

## Validate a single command

Running shell commands and scripts with Doc Detective is straightforward. The command or script runs in your device's native shell (`cmd` on Windows, `zsh` on macOS, and `bash` on Linux), and if the command or script returns a non-zero exit code, the test fails.

We can test this out with a single test with two steps. The first step runs a command that should pass, and the second step runs a command that should fail. Let's save this test as _single-command-validation.spec.json_:

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
npm run runTests -- -i single-command-validation.spec.json
```

Great! We see that the first command passed and the second command failed. This is exactly what we expected because the second command exits with a non-zero exit code. But while these steps test individual action, you'll often want to run a script to test multiple commands. Let's look at how to do that.

## Validate a bash script

**Note:** The following commands are for a `bash` shell. If you're using Windows, make sure `bash` is available from `cmd`, such as through [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install) or [Git Bash](https://git-scm.com/downloads). If you're using a different shell, you'll need to adjust the commands accordingly.

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

5. Validate the results:

    ```bash
    FILE=search-results.png; if [ -f "$FILE" ]; then echo "File $FILE exists."; else false; fi
    for file in testResults-*.json; do [ -e "$file" ] && echo "File $file exists." || false; break; done
    ```

If you wanted to validate each of these commands individually, you could, but that's a lot of work. Instead, let's create a `bash` script to validate the whole procedure in one go. Save the following script as _ui-validation.sh_:

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

Script validation isn't limited to `bash`. As long as your script can return a non-zero exit code, in can be in any language you link, whether that's JavaScript, Python, Ruby, or anything else. Anything you can run from the command line, you can validate with Doc Detective.

For example, here's a script that validates the results of our UI procedure:

```javascript
// validate-kitten-search.js
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

We can run this just as easily as our other script:

```json
{
  "tests": [
    {
      "id": "js-validation",
      "description": "Validate the JavaScript script for searching for American Shorthair kittens on Google.",
      "steps": [
        {
          "action": "runShell",
          "command": "node validate-kitten-search.js"
        }
      ]
    }
  ]
}
```








Doc Detective supports writing your tests a few different ways. Today, you'll see how to write tests as JSON files or in-line with your content. It's the same test and functionality either way, but the flexibility lets Doc Detective adapt to different users' needs and restrictions.

First, let's look at a JSON file version of the test (we'll call it _kitten-search.spec.json_):

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "goTo",
          "url": "https://www.google.com"
        },
        {
          "action": "find",
          "selector": "[title=Search]",
          "click": true
	      },
	      {
          "action": "typeKeys",
          "keys": ["American Shorthair kittens", "$ENTER$"]
        },
        {
          "action": "wait",
          "duration": 5000
        },
        {
          "action": "saveScreenshot",
          "path": "search-results.png"
        }
      ]
    }
  ]
}
```

Let's break down each portion of the JSON:

* The whole object is a test specification, which can include many tests. If all tests pass, the test specification passes.
* `tests` is an array of test objects. We only have one test for this example, so there's only one object in the array.
* `tests.steps` is an array of actions that you want Doc Detective to perform as part of the test. If all the steps perform successfully, the test passes.

Each step has an `action` and associated parameters to tell Doc Detective what to do and how to do it. The sequence of steps in this test is as follows:

1. `goTo`: Open a browser window and navigate to [https://www.google.com](https://www.google.com).
2. `find`: Find an element on the page that matches the CSS selector `[title=Search]` and click it.

    **Note:** Finding CSS selectors can be tricky. You need selectors to be unique to the elements you're trying to interact with or you might end up with false positives or fragile tests. To help with that, I've created [Doc Detective Companion](https://github.com/doc-detective/doc-detective-companion), a browser extension for [Chrome](https://chromewebstore.google.com/detail/doc-detective-companion/dfpbndchffmilddiaccdcpoejljlaghm?pli=1) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/doc-detective-companion/) to help identify CSS selectors.

3. `typeKeys`: Type the string "American shorthair kittens", then press Enter. Enter is a special key, so we have to use special formatting to differentiate it from a string.
4. `wait`: Wait 5 seconds for the results to load.
5. `saveScreenshot`: Capture a screenshot of the current viewport and save it as `search-results.png`.

You could also write the tests in-line with your content, using comments (or other markup) to contain each individual step in JSON format. Doc Detective can parse your doc content for these comments and build a test (and test spec) dynamically. Because the steps are stored in comments, they shouldn't appear in your output.

**Note:** Doc Detective supports in-line tests in Markdown by default. To enable in-line tests for other formats, you'll need to customize your configuration. (Contributions for format-specifid sane defaults are welcome!)

The following example renders identically to the raw text we saw earlier.

```markdown
To search for American Shorthair kittens,

1. Go to [Google](https://www.google.com).

   [comment]: # (step {"action":"goTo", "url":"https://www.google.com"})

2. In the search bar, enter "American Shorthair kittens", then press Enter.

   [comment]: # (step { "action": "find", "selector": "[title=Search]", "click": true })
   [comment]: # (step { "action": "typeKeys", "keys": ["American Shorthair kittens", "$ENTER$"] })
   [comment]: # (step { "action": "wait", "duration": 5000 })

![Search results](search-results.png)

[comment]: # (step { "action": "saveScreenshot", "path": "search-results.png" })
```

The test and individual steps are exactly the same as in the JSON example, but both are supported to let content developers decide how and where to store tests for their workflows. In-line tests also enable semantics-driven tests, but that's a topic for another day. ;)

Now let's run the test!

## Run the test

Running the test is thankfully simple. Back in your terminal, run the following command, where `<input_path>` is the path to the JSON or Markdown file you wrote your tests in.

```bash
npm run runTests -- -i <input_path>
```

Doc Detective spins up a headless browser (meaning you won't see a window), and performs the test. You'll see a JSON report in your terminal when it's done, as well as the report in a new JSON file starting with _testResults-_.

If a step in your test failed, you'd see a failure message in the step's `resultDescription` field. This is a great way to debug your test runs and figure out what went wrong, which is the first step toward updating your docs or fixing your product.

But unless Google's down, your steps, test, and test spec should have all passed! Also, you should see a new _search-results.png_ file, which is the screenshot we automatically captured. With the new screenshot, _kitten-search.md_ now renders like this:

![Rendered preview of kitten-search.md with screenshot](/images/validate-ui-doc-detective-after.png)

Congratulations, you ran your first test!

## What else can it do?

Doc Detective can interact with product UIs and APIs through a host of actions:

* [checkLink](https://doc-detective.com/reference/schemas/checkLink.html): Check if a URL returns an acceptable status code from a GET request.
* [find](https://doc-detective.com/reference/schemas/find.html): Check if an element exists with the specified selector, check element text, and click the element.
* [goTo](https://doc-detective.com/reference/schemas/goTo.html): Navigate to a specified URL.
* [httpRequest](https://doc-detective.com/reference/schemas/httpRequest.html): Perform a generic HTTP request, for example to an API.
* [runShell](https://doc-detective.com/reference/schemas/runShell.html): Perform a native shell command, such as running a script.
* [saveScreenshot](https://doc-detective.com/reference/schemas/saveScreenshot.html): Take a screenshot in PNG format, including performing pixel diff comparisons between screenshots to monitor for visual changes.
* [startRecording](https://doc-detective.com/reference/schemas/startRecording.html) and [stopRecording](https://doc-detective.com/reference/schemas/stopRecording.html): Capture a recording of steps during the test. Supports `.webm`, `.mp4`, and `.gif` formats.
* [setVariables](https://doc-detective.com/reference/schemas/setVariables.html): Load environment variables from a _.env_ file.
* [typeKeys](https://doc-detective.com/reference/schemas/typeKeys.html): Type strings or special keys.
* [wait](https://doc-detective.com/reference/schemas/wait.html): Pause before performing the next action.

With these actions, you can replicate and validate most UX flows described in your docs, programmatically capture images (and soon video) to supplement your text, and even run scripts to validate functionality that Doc Detective can't cover on its own.

Doc Detective is incredibly customizable, with a robust [config](https://doc-detective.com/reference/schemas/config.html) file that lets you set custom defaults and modify a host of behaviors to enable things like test coverage analysis for your docs.

Overall, Doc Detective can be an instrumental piece of your Docs as Tests implementation, especially to catch UX issues or changes in your product and to perform ongoing validations of your docs.

---

## About the tool

{% include tools/about-doc-detective.md %}

---

{% include newsletter.md %}