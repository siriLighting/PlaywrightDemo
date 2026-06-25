# BDD Framework Extension Guide

This guide shows how to add new test scenarios to the BDD framework using Gherkin and Page Object Model.

## Quick Start Example: Adding a New Page

### Scenario: Add tests for Playwright API Docs page

#### Step 1: Create Feature File
**File: `features/playwright_api.feature`**

```gherkin
Feature: Playwright Documentation - API Reference
  Scenario: Verify API docs page displays browser class
    Given I navigate to Playwright API docs page
    Then the page should display "Browser" heading
    And the page should display "BrowserContext" heading

  Scenario: Navigate to API docs from home page
    Given I navigate to Playwright home page
    When I click on "API" link
    Then the page title should contain "API"
```

#### Step 2: Create Page Object
**File: `src/pages/PlaywrightAPIPage.js`**

```javascript
const BasePage = require('./BasePage');

/**
 * Playwright API Documentation Page Object
 * Represents https://playwright.dev/docs/api/class-browser
 */
class PlaywrightAPIPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://playwright.dev/docs/api/class-browser';
  }

  /**
   * Navigate to API docs page
   */
  async navigate() {
    await this.goto(this.url);
  }

  /**
   * Verify Browser heading is visible
   */
  async isBrowserHeadingVisible() {
    return await this.isHeadingVisible('Browser', 1);
  }

  /**
   * Verify BrowserContext heading is visible
   */
  async isBrowserContextHeadingVisible() {
    return await this.isHeadingVisible('BrowserContext', 2);
  }
}

module.exports = PlaywrightAPIPage;
```

#### Step 3: Update Page Exports
**File: `src/pages/index.js`** (Add this export)

```javascript
const PlaywrightAPIPage = require('./PlaywrightAPIPage');

module.exports = {
  BasePage,
  PlaywrightHomePage,
  VSCodePage,
  PlaywrightAPIPage  // ← Add this
};
```

#### Step 4: Add Step Definitions
**File: `features/step_definitions/steps.js`** (Add these steps)

```javascript
// Import at the top
const PlaywrightAPIPage = require(path.join(__dirname, '../../src/pages/PlaywrightAPIPage'));

// In Before hook
Before(async function () {
  // ... existing code ...
  playwrightAPIPage = new PlaywrightAPIPage(page);  // ← Add this
});

// Add step definitions
Given('I navigate to Playwright API docs page', async function () {
  await playwrightAPIPage.navigate();
});

Then('the page should display {string} heading', async function (headingName) {
  await page.waitForLoadState('networkidle');
  const isVisible = await playwrightAPIPage.isHeadingVisible(headingName);
  expect(isVisible).toBeTruthy();
});
```

#### Step 5: Run Tests
```bash
npm run test:bdd
```

## Advanced: Using Backgrounds and Data Tables

### Example with Background
**File: `features/forms.feature`**

```gherkin
Feature: Form Submission
  Background:
    Given I navigate to the contact form page

  Scenario: Submit valid form
    When I fill in the contact form with:
      | field   | value              |
      | name    | John Doe          |
      | email   | john@example.com  |
      | message | Test message      |
    And I click the submit button
    Then I should see the success message

  Scenario: Submit invalid email
    When I fill in the email field with "invalid-email"
    And I click the submit button
    Then I should see the validation error for email
```

### Step Definition with Data Tables
```javascript
When('I fill in the contact form with:', async function (dataTable) {
  const data = dataTable.rowsHash();
  
  for (const [field, value] of Object.entries(data)) {
    await page.fill(`input[name="${field}"]`, value);
  }
});
```

## Testing Best Practices

### 1. Keep Steps Generic and Reusable
```javascript
// ✅ Good - Generic step that works for any heading
Then('the {string} heading should be visible', async function (headingName) {
  const isVisible = await page.isHeadingVisible(headingName);
  expect(isVisible).toBeTruthy();
});

// ❌ Bad - Too specific to one test
Then('the Installation heading should be visible', async function () {
  // ...
});
```

### 2. Use Page Objects for All Element Interactions
```javascript
// ✅ Good - Page object handles selector
class LoginPage extends BasePage {
  async login(username, password) {
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
  }
}

// ❌ Bad - Selectors in step definitions
When('I login with {string} and {string}', async function (user, pass) {
  await page.fill('input[name="username"]', user);
  // ...
});
```

### 3. Organize Steps by Page
```javascript
// ✅ Good organization
// Playwright Home Page Steps
Given('I navigate to Playwright home page', ...);
When('I click on Get started link', ...);

// VS Code Page Steps  
Given('I navigate to VS Code documentation page', ...);
Then('the VS Code section should be visible', ...);

// ❌ Bad - Mixed pages and unclear
Given('I navigate to something', ...);
When('I click a link', ...);
```

### 4. Use Meaningful Scenario Names
```gherkin
# ✅ Good - Clear what is being tested
Scenario: User can successfully login with valid credentials

# ❌ Bad - Too vague
Scenario: Test login
```

## Common Step Patterns

### Navigation Steps
```javascript
Given('I navigate to {string} page', async function (pageName) {
  if (pageName === 'home') {
    await playwrightHomePage.navigate();
  } else if (pageName === 'api docs') {
    await playwrightAPIPage.navigate();
  }
});
```

### Assertion Steps
```javascript
Then('the {string} element should contain {string}', async function (selector, text) {
  const element = await page.$(selector);
  const content = await element.textContent();
  expect(content).toContain(text);
});
```

### Form Interaction Steps
```javascript
When('I fill the {string} field with {string}', async function (fieldName, value) {
  await page.fill(`input[name="${fieldName}"]`, value);
});

When('I submit the form', async function () {
  await page.click('button[type="submit"]');
});
```

## Debugging Tips

### 1. Add Debug Steps
```javascript
Then('I pause for debugging', async function () {
  await page.pause();
});
```

### 2. Take Screenshots in Steps
```javascript
Then('I take a screenshot', async function () {
  await page.screenshot({ path: 'debug.png' });
});
```

### 3. Print Page Content
```javascript
Then('I log the page title', async function () {
  const title = await page.title();
  console.log('Current page title:', title);
});
```

### 4. Add Detailed Logging
```javascript
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  // Log all navigation
  page.on('framenavigated', frame => {
    console.log(`[Navigation] ${frame.url()}`);
  });
  
  // Log console messages
  page.on('console', msg => {
    console.log(`[Console] ${msg.text()}`);
  });
});
```

## File Organization Examples

### For Large Test Suites
```
features/
├── authentication/
│   ├── login.feature
│   ├── logout.feature
│   └── registration.feature
├── products/
│   ├── search.feature
│   ├── filter.feature
│   └── purchase.feature
└── step_definitions/
    ├── authentication_steps.js
    ├── products_steps.js
    └── common_steps.js

src/pages/
├── auth/
│   ├── LoginPage.js
│   └── RegisterPage.js
├── products/
│   ├── ProductListPage.js
│   └── ProductDetailPage.js
└── common/
    └── BasePage.js
```

## Running Specific Tests

```bash
# Run specific feature file
npx cucumber-js features/playwright_home.feature

# Run specific scenario
npx cucumber-js features/playwright_home.feature:6

# Run scenarios with specific tags
npx cucumber-js --tags @smoke

# Run in headless mode
npx cucumber-js --format progress-bar
```

## Tagging Tests

```gherkin
@smoke
Scenario: Critical user journey
  Given I navigate to home page
  Then the page loads successfully

@regression @slow
Scenario: Complex data processing
  Given I have test data
  Then I process it successfully
```

```javascript
// Run only @smoke tests
// npx cucumber-js --tags @smoke

// Run everything except @slow
// npx cucumber-js --tags "not @slow"

// Run @smoke AND @regression
// npx cucumber-js --tags "@smoke and @regression"
```

## Summary

**Key Principles:**
1. ✅ Keep features readable for non-technical stakeholders
2. ✅ Use page objects to abstract UI interactions
3. ✅ Write reusable, generic step definitions
4. ✅ Organize by feature/page for large test suites
5. ✅ Use tags for test categorization
6. ✅ Add meaningful logging and debugging capabilities

**Next Steps:**
- Add more feature files for different pages
- Expand page objects with additional methods
- Create shared step definitions for common actions
- Implement test data management
- Set up CI/CD pipeline with test reports
