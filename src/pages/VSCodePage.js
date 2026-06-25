const BasePage = require('./BasePage');

/**
 * VS Code Page Object
 * Represents https://playwright.dev/docs/getting-started-vscode
 */
class VSCodePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://playwright.dev/docs/getting-started-vscode';
  }

  /**
   * Navigate to VS Code documentation page
   */
  async navigate() {
    await this.goto(this.url);
  }

  /**
   * Verify VS Code section heading is visible
   * @returns {Promise<boolean>} True if "VS Code" heading (level 1) is visible
   */
  async isVSCodeSectionVisible() {
    return await this.isHeadingVisible(/VS Code/i, 1);
  }

  /**
   * Verify Getting Started heading is visible
   * @returns {Promise<boolean>} True if "Getting Started" heading (level 2) is visible
   */
  async isGettingStartedHeadingVisible() {
    return await this.isHeadingVisible(/Getting Started/i, 2);
  }

  /**
   * Wait for VS Code section to be loaded
   */
  async waitForVSCodeSection() {
    await this.waitForHeading(/VS Code/i, 1);
  }

  /**
   * Wait for Getting Started heading to be loaded
   */
  async waitForGettingStartedHeading() {
    await this.waitForHeading(/Getting Started/i, 2);
  }
}

module.exports = VSCodePage;
