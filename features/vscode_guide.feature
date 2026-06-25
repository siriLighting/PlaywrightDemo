Feature: Playwright Documentation - VS Code Guide
  Scenario: Verify VS Code documentation page exists
    Given I navigate to VS Code documentation page
    Then the page should display "VS Code" section
    And the page should display "Getting Started" heading
