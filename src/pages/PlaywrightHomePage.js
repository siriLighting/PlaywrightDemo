const BasePage = require('./BasePage');

/**
 * Playwright Home Page Object
 * Represents https://playwright.dev/
 */
class PlaywrightHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://playwright.dev/';
  }

  /**
   * Navigate to Playwright homepage
   */
  async navigate() {
    await this.goto(this.url);
  }

  /**
   * Verify page has Playwright title
   * @returns {Promise<boolean>} True if title contains "Playwright"
   */
  async hasPlaywrightTitle() {
    return await this.titleMatches(/Playwright/);
  }

  /**
   * Click on "Get started" link
   */
  async clickGetStarted() {
    await this.clickLink('Get started');
  }

  /**
   * Verify Installation heading is visible
   * @returns {Promise<boolean>} True if Installation heading is visible
   */
  async isInstallationHeadingVisible() {
    return await this.isHeadingVisible('Installation', 1);
  }
}

module.exports = PlaywrightHomePage;
