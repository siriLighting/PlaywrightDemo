# Playwright BDD Testing Framework with Page Object Model

This project demonstrates a modern testing framework combining **Playwright** with **Cucumber/Gherkin** for Behavior-Driven Development (BDD) and **Page Object Model (POM)** for maintainability.

## Project Structure

```
.
├── features/                          # Gherkin feature files
│   ├── playwright_home.feature       # Playwright home page scenarios
│   ├── vscode_guide.feature          # VS Code documentation scenarios
│   └── step_definitions/
│       └── steps.js                  # Step implementations
├── src/
│   └── pages/                         # Page Object Model
│       ├── BasePage.js               # Base page with common methods
│       ├── PlaywrightHomePage.js     # Playwright home page object
│       ├── VSCodePage.js             # VS Code page object
│       └── index.js                  # Page exports
├── test-results/                      # Test reports
├── tests/                             # Playwright test files (legacy)
├── cucumber.js                        # Cucumber configuration
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Dependencies
```

## Framework Components

### 1. **Gherkin Features** (`features/*.feature`)
Business-readable test scenarios written in natural language:

```gherkin
Feature: Playwright Documentation - Home Page
  Scenario: Verify Playwright home page has correct title
    Given I navigate to Playwright home page
    Then the page title should contain "Playwright"
```

### 2. **Page Object Model** (`src/pages/`)

#### BasePage.js
- Base class for all page objects
- Common methods: `goto()`, `getTitle()`, `isHeadingVisible()`, `clickLink()`, etc.
- Reduces code duplication and improves maintainability

#### PlaywrightHomePage.js
- Specific methods for Playwright home page
- Methods: `navigate()`, `hasPlaywrightTitle()`, `clickGetStarted()`, etc.

#### VSCodePage.js
- Specific methods for VS Code documentation page
- Methods: `navigate()`, `isVSCodeSectionVisible()`, `isGettingStartedHeadingVisible()`, etc.

### 3. **Step Definitions** (`features/step_definitions/steps.js`)
- Connects Gherkin steps to page object methods
- Uses Before/After hooks for browser setup and cleanup
- Contains all test logic implementation

## Running Tests

### Run all BDD tests
```bash
npm run test:bdd
```

### Run all BDD tests in headed mode (browser window visible)
```bash
npm run test:bdd:headed
```

### Run Playwright tests (legacy)
```bash
npm run test
npm run test:headed
```

### View Cucumber report
After running BDD tests, view the HTML report:
```bash
open test-results/cucumber-report.html
```

## Test Results

**BDD Tests Status:**
- ✅ 3 scenarios passed
- ✅ 8 steps passed
- Execution time: ~7 seconds

**Tests Included:**
1. ✅ Playwright home page has correct title
2. ✅ Navigate to Installation page via Get Started link
3. ✅ VS Code documentation page displays VS Code section and Getting Started heading

## Key Features

### Gherkin/BDD Benefits
- **Readable**: Non-technical stakeholders can understand test scenarios
- **Maintainable**: Changes to tests don't require code changes
- **Reusable**: Steps can be reused across multiple scenarios

### Page Object Model Benefits
- **Maintainability**: UI changes only affect page objects, not tests
- **Readability**: Test code reads like English
- **Reusability**: Page methods can be reused across multiple tests
- **Scalability**: Easy to add new pages and test scenarios

## Adding New Tests

### 1. Create a Feature File (`features/newpage.feature`)
```gherkin
Feature: My Feature Name
  Scenario: My scenario description
    Given I navigate to some page
    Then some assertion should be true
```

### 2. Create a Page Object (`src/pages/MyPage.js`)
```javascript
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com';
  }

  async navigate() {
    await this.goto(this.url);
  }

  async myMethod() {
    // Implementation
  }
}

module.exports = MyPage;
```

### 3. Add Step Definitions (`features/step_definitions/steps.js`)
```javascript
Given('I navigate to some page', async function () {
  // Use page objects
});

Then('some assertion should be true', async function () {
  // Assertions
});
```

## Configuration Files

### cucumber.js
- Specifies feature file location
- Defines step definitions path
- Sets output formats (HTML, JSON)
- Configures parallel execution and retries

### playwright.config.ts
- Browser configuration
- Test timeout settings
- Reporter configuration
- Device/browser selections

### package.json
- Project dependencies
- NPM scripts for running tests
- Framework versions

## Best Practices

1. **One scenario per user action**: Keep scenarios focused
2. **Use background for common setup**: Reduce step duplication
3. **Keep pages simple**: Each page should have specific methods
4. **Use meaningful step descriptions**: Avoid technical jargon
5. **Maintain BasePage**: Add common methods for code reuse

## Troubleshooting

### Module not found errors
- Check relative paths in imports
- Ensure all files are created in correct directories

### Steps not found
- Verify step definitions are in `features/step_definitions/`
- Check step text matches exactly in feature files

### Timeout errors
- Increase timeout in `setDefaultTimeout()` in steps.js
- Check network connectivity to target URLs

## Dependencies

- **@cucumber/cucumber**: BDD framework for test scenarios
- **playwright**: Browser automation library
- **@playwright/test**: Playwright testing utilities

## License

ISC
