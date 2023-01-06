import { test, expect } from '@playwright/test';

/*
  The code here is compiled to CommonJS by the babel transpiler used by playwright 
  since it infers the type=commonjs from the package.json

  Since CommonJS are then compiled to require imports from the babel code,
  this works without any error.
*/

import jsonData from './test.json';

console.log('jsonData', jsonData);

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});