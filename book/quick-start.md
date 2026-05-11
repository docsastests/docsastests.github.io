---
layout: page
title: "Quick Start Example"
permalink: /book/quick-start/
description: "A test page for the Docs as Tests with AI book examples."
---

*A test page for [Docs as Tests]({{ site.url }}) book examples.*

If you're reading this, you're running through the Quick Start from the book. This page exists specifically to give you something stable to test against.

## What You Can Test Here

This page contains several testable elements:

- An `h1` heading with the text "Quick Start Example"
- Multiple `h2` headings you can verify
- Code blocks with sample commands
- Links to other pages

## Sample Command

Here's a command you might find in documentation:

```
doc-detective --input my-tests.yaml
```

Your tests can verify this code block exists and contains the expected text.

## Sample Link

Documentation often includes links. Here's one to the [Doc Detective homepage](https://doc-detective.com). Your tests can verify this link exists and points to the right destination.

> **📘 About This Page**
>
> This page is intentionally simple and stable. It won't change without notice, so your tests against it should be reliable. If we ever need to update it, we'll version the URL.

## Next Steps

Once your test passes against this page, try testing your own documentation. The patterns are the same:

- Navigate to a URL with `goTo`
- Find elements with `find`
- Verify text content with `elementText`

See the [full documentation](https://doc-detective.com) for more actions and options.

> This page supports examples from [Docs as Tests](https://amzn.to/3NEqwAV) and [Docs as Tests & AI](https://amzn.to/4tOLOeS) by Manny Silva. [Learn more about Doc Detective](https://doc-detective.com).*
