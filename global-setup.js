// global-setup.js
import { chromium, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { faker } from '@faker-js/faker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: true }); // headless for CI

  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  await page.goto('https://qauto.forstudy.space/', { waitUntil: 'domcontentloaded' });

  const signUpBtn = page.getByRole('button', { name: 'Sign up' });
  await signUpBtn.waitFor({ state: 'visible', timeout: 15000 });
  await signUpBtn.click();

  const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, '');
  const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, '');
  const email = `aqa.test.${Date.now()}@example.com`;
  const password = 'Test1234!';

  await page.locator('#signupName').click();
  await page.locator('#signupName').fill(firstName);
  await page.locator('#signupName').press('Tab');

  await page.locator('#signupLastName').click();
  await page.locator('#signupLastName').fill(lastName);
  await page.locator('#signupLastName').press('Tab');

  await page.locator('#signupEmail').click();
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupEmail').press('Tab');

  await page.locator('#signupPassword').click();
  await page.locator('#signupPassword').fill(password);
  await page.locator('#signupPassword').press('Tab');

  await page.locator('#signupRepeatPassword').click();
  await page.locator('#signupRepeatPassword').fill(password);
  await page.locator('#signupRepeatPassword').press('Tab');


  const registerBtn = page.getByRole('button', { name: 'Register' });

  await expect(registerBtn).toBeEnabled({ timeout: 20000 });

  let attempts = 0;
  while (attempts < 5) {
    if (await registerBtn.isEnabled()) {
      break;
    }
    await page.waitForTimeout(1000);
    attempts++;
  }

  if (attempts >= 5) {
    console.error('Register button still disabled after waiting. Check form validation.');
  }

  await registerBtn.click();

  await page.waitForURL(/.*(garage|panel\/garage)/i, { timeout: 30000 });

  const statePath = path.join(__dirname, 'auth-user.json');
  await context.storageState({ path: statePath });

  await browser.close();
}