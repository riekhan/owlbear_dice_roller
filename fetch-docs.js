#!/usr/bin/env node

const puppeteer = require('puppeteer');
const TurndownService = require('turndown');

async function fetchAndConvert(url, options = {}) {
  const browser = await puppeteer.launch({
    headless: options.headless !== false,
    // Use your existing Chrome if you want to see it in action
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  try {
    const page = await browser.newPage();

    // Set a realistic user agent to help bypass bot detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.error(`Fetching: ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait a bit extra for Cloudflare to finish
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the rendered HTML
    const html = await page.content();

    // Extract title for context
    const title = await page.title();
    console.error(`Title: ${title}`);

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    const markdown = turndownService.turndown(html);

    return { markdown, title, url };
  } finally {
    await browser.close();
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node fetch-docs.js <url> [output-file]');
    console.error('');
    console.error('Examples:');
    console.error('  node fetch-docs.js https://docs.owlbear.rodeo/extensions/getting-started/');
    console.error('  node fetch-docs.js https://example.com output.md');
    process.exit(1);
  }

  const url = args[0];
  const outputFile = args[1];

  try {
    const result = await fetchAndConvert(url);

    if (outputFile) {
      const fs = require('fs');
      const content = `# ${result.title}\n\nSource: ${result.url}\n\n---\n\n${result.markdown}`;
      fs.writeFileSync(outputFile, content, 'utf-8');
      console.error(`Saved to: ${outputFile}`);
    } else {
      // Output to stdout
      console.log(result.markdown);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
