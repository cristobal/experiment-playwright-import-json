import { test, expect } from '@playwright/test';

/*
  The code here is compiled to ESM by the babel transpiler used by playwright 
  since it infers the type=module from the package.json

  Since ESM expects assertion for imports of type json we get an error here.
*/

/* 
  1. Without assert we get the error:
  > needs an import assertion of type "json"
*/
// import jsonData from './test.json';

/*
  2. After adding assert here we get the following error:
  > Support for the experimental syntax 'importAssertions' isn't currently enabled
  > Add @babel/plugin-syntax-import-assertions ...  to the 'plugins' section of your Babel config to enable parsing.
*/
import jsonData from './test.json' assert { type: 'json' };

/*
  This console.log() here is added deliberately so that we get an error otherwise 
  the compiler would just tree shake away the unused json import.
*/
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