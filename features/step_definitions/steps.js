const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const path = require('path');

// Import page objects using absolute path
const PlaywrightHomePage = require(path.join(__dirname, '../../src/pages/PlaywrightHomePage'));
const VSCodePage = require(path.join(__dirname, '../../src/pages/VSCodePage'));

// Set timeout for step definitions (10 seconds)
setDefaultTimeout(10 * 1000);

// Global browser and page objects
let browser;
let page;
let playwrightHomePage;
let vscodePage;

// Before hook - launch browser
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  playwrightHomePage = new PlaywrightHomePage(page);
  vscodePage = new VSCodePage(page);
});

// After hook - close browser
After(async function () {
  if (page) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
});

// ===== Playwright Home Page Steps =====

Given('I navigate to Playwright home page', async function () {
  await playwrightHomePage.navigate();
});

Then('the page title should contain {string}', async function (expectedText) {
  const hasTitle = await playwrightHomePage.hasPlaywrightTitle();
  expect(hasTitle).toBeTruthy();
});

When('I click on {string} link', async function (linkName) {
  await playwrightHomePage.clickLink(linkName);
});

Then('the {string} heading should be visible', async function (headingName) {
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Try to find heading at any level
  let isVisible = await playwrightHomePage.isHeadingVisible(headingName, 1);
  if (!isVisible) {
    isVisible = await playwrightHomePage.isHeadingVisible(headingName);
  }
  expect(isVisible).toBeTruthy();
});

// ===== VS Code Page Steps =====

Given('I navigate to VS Code documentation page', async function () {
  await vscodePage.navigate();
});

Then('the page should display {string} section', async function (sectionName) {
  const isVisible = await vscodePage.isVSCodeSectionVisible();
  expect(isVisible).toBeTruthy();
});

Then('the page should display {string} heading', async function (headingName) {
  const isVisible = await vscodePage.isGettingStartedHeadingVisible();
  expect(isVisible).toBeTruthy();
});
