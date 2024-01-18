const mailchimp = require("@mailchimp/mailchimp_marketing");
const xml2js = require("xml2js");
const fs = require("fs");

const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
const mailchimpServer = process.env.MAILCHIMP_SERVER;
const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
const feedPath = "./_site/atom.xml";

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServer,
});

async function parseFeed(path) {
  // Read the feed file
  const text = fs.readFileSync(path, "utf8");
  let parser = new xml2js.Parser();
  return parser.parseStringPromise(text);
}

async function getLastPublished() {
  // Read the last published ID from a file
  const text = fs.readFileSync("./_scripts/last-published.txt", "utf8");
  return text;
}

async function sendEmailUpdate(entry) {
  try {
    // Customize this based on how you want to structure your email
    let campaign = {
      type: "regular",
      recipients: { list_id: mailchimpListId },
      settings: {
        subject_line: `New Docs as Tests post: ${entry.title[0]._}`,
        title: `New Docs as Tests post: ${entry.title[0]._}`,
        from_name: "Docs as Tests",
        reply_to: "no-reply@docsastests.com",
        auto_footer: true,
      },
      tracking: {
        opens: true,
        html_clicks: true,
        text_clicks: true,
      },
    };
    console.log("Campaign defined.");

    const style = `<style>
    .container {
      font-family: 'Arial', sans-serif;
      color: #333;
      background-color: #f4f4f4;
      line-height: 1.6;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    h2, h3, h4, h5, h6, p, pre, blockquote, dl, table, address {
        margin-top: 0px;
        margin-bottom: 1.5rem;
    }
    h1 {
        display: block;
        font-size: 1.7em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        margin-bottom: 0;
    }
    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    h3 {
        display: block;
        font-size: 1.3em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    a {
        color: rgb(39, 41, 57);
    }
    i {
        font-size: 0.9em;
    }
    figure {
        background-color: rgb(250, 250, 250);
        padding: 1.5rem;
    }
    pre {
        margin: 0;
    }
    code {
        font-family: Menlo, Consolas, Monaco, "Courier New", Courier, monospace;
        color: rgb(88, 110, 117);
        background-color: rgb(250, 250, 250);
        font-size: 85%;
        margin: 0 0 0.4em 0;
        padding: 0.2em 0.4em;
        border-radius: 3px;
    }
    code > span {
        line-height: 1.5;
    }
    .header, .header p {
      text-align: center;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    </style>`;

    // Get entry content from beginning until the first <h1> or <h2> tag
    text = entry.content[0]._;
    let index = text.indexOf("<h1");
    if (index === -1) {
      index = text.indexOf("<h2");
    }
    const lead = text.substring(0, index);

    const html = `
    <head>${style}</head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.docsastests.com/images/docsastests.png" alt="Docs as Tests logo" />
          <h1 class="title">Docs as Tests</h1>
          <p><i>You received this email because you subscribed to updates from <a href="https://www.docsastests.com">Docs as Tests</a>.</i></p>
        </div>
        <h1>${entry.title[0]._}</h1>
        <p>By ${entry.author[0].name[0]}</p>
        ${lead}
        <p><i><a href="${entry.link[0].$.href}">Keep reading on the blog</a>.</i></p>
      </div>
    </body>`;
    const content = { html: html };
    console.log({ content });

    // Create a campaign
    const createdCampaign = await mailchimp.campaigns.create(campaign);
    console.log("Campaign created.");
    console.log(createdCampaign);
    // Set the content of the campaign
    const contentUpdateResponse = await mailchimp.campaigns.setContent(
      createdCampaign.id,
      content
    );
    console.log("Content updated.");
    console.log(contentUpdateResponse);
    // Send the campaign
    //! const sendResponse = await mailchimp.campaigns.send(createdCampaign.id);
    //! console.log("Campaign sent.")
    //! console.log(sendResponse)
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

async function main() {
  try {
    const feed = await parseFeed(feedPath);
    const entries = feed.feed.entry;
    // Sort entries by date
    entries.sort((a, b) => {
      return new Date(b.published) - new Date(a.published);
    });
    // Get last published entry
    const lastPublishedId = await getLastPublished();
    console.log({ lastPublishedId });

    // If the last published entry is the same as the latest entry, do nothing
    if (lastPublishedId === entries[0].id[0]) {
      console.log("No new updates.");
      return;
    }

    // Find all entries that have been published since the last published entry, based on date
    const lastPublishedEntry = entries.find(
      (entry) => entry.id[0] === lastPublishedId
    );
    console.log({ lastPublishedEntry });

    // Get all entries that have a date greater than lastPublishedEntry
    const newEntries = entries.filter(
      (entry) =>
        new Date(entry.published[0]) > new Date(lastPublishedEntry.published[0])
    );
    console.log({ newEntries });

    // Get the oldest new entry
    const entry = newEntries[newEntries.length - 1];
    console.log({ entry });

    // Write the ID of the oldest entry to a file
    fs.writeFileSync("./_scripts/last-published.txt", entry.id[0]);
    console.log("Updated last-published.txt");

    // Send email with the latest update
    await sendEmailUpdate(entry);
  } catch (error) {
    console.error("Failed to fetch and send update:", error);
  }
}

main();
