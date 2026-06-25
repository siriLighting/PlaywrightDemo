/**
 * Base Page Object
 * Contains common methods for all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Get page title
   * @returns {Promise<string>} The page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Check if a heading with specific name and level is visible
   * @param {string} name - The heading text (supports regex)
   * @param {number} level - The heading level (1-6)
   * @returns {Promise<boolean>} True if heading is visible
   */
  async isHeadingVisible(name, level = null) {
    const options = { name };
    if (level) {
      options.level = level;
    }
    const heading = this.page.getByRole('heading', options);
    return await heading.isVisible();
  }

  /**
   * Wait for a heading to be visible
   * @param {string} name - The heading text (supports regex)
   * @param {number} level - The heading level (1-6)
   */
  async waitForHeading(name, level = null) {
    const options = { name };
    if (level) {
      options.level = level;
    }
    await this.page.getByRole('heading', options).waitFor({ state: 'visible' });
  }

  /**
   * Click a link by name
   * @param {string} name - The link text
   */
  async clickLink(name) {
    await this.page.getByRole('link', { name }).click();
  }

  /**
   * Check if title matches pattern
   * @param {RegExp} pattern - The pattern to match
   * @returns {Promise<boolean>} True if title matches
   */
  async titleMatches(pattern) {
    const title = await this.getTitle();
    return pattern.test(title);
  }
}

module.exports = BasePage;
