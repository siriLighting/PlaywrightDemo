Feature: Playwright Documentation - Home Page
  Scenario: Verify Playwright home page has correct title
    Given I navigate to Playwright home page
    Then the page title should contain "Playwright"

  Scenario: Navigate to Installation page via Get Started link
    Given I navigate to Playwright home page
    When I click on "Get started" link
    Then the "Installation" heading should be visible
