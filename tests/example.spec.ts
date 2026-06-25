import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('verify VSCode section in Docs', async ({ page }) => {
  // Navigate to the VS Code documentation page
  await page.goto('https://playwright.dev/docs/getting-started-vscode');

  // Verify there is a VS Code section (main heading)
  await expect(page.getByRole('heading', { name: /VS Code/i, level: 1 })).toBeVisible();

  // Verify there is a Get Started heading within the page
  await expect(page.getByRole('heading', { name: /Getting Started/i, level: 2 })).toBeVisible();
});
