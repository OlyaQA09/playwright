// global-setup.js
import { chromium, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { faker } from '@faker-js/faker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: false }); // change to true in CI

  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  console.log('→ Navigating to site (Basic Auth should be handled automatically)...');

  await page.goto('https://qauto.forstudy.space/', { waitUntil: 'domcontentloaded' });

  console.log('→ Page title after navigation:', await page.title());

  // Click Sign Up
  const signUpBtn = page.getByRole('button', { name: 'Sign up' });
  await signUpBtn.waitFor({ state: 'visible', timeout: 15000 });
  await signUpBtn.click();

  console.log('→ Sign Up modal opened');

  // Generate valid data
  const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, '');
  const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, '');
  const email = `aqa.test.${Date.now()}@example.com`;
  const password = 'Test1234!'; // meets: uppercase, lowercase, digit, special char

  console.log('Generated user:', { firstName, lastName, email, password });

  // Fill form + trigger validation on each field
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

  console.log('→ Fields filled. Waiting for Register button to become enabled...');

  const registerBtn = page.getByRole('button', { name: 'Register' });

  // Wait for button to be enabled (Playwright auto-waits for !disabled)
  await expect(registerBtn).toBeEnabled({ timeout: 20000 });

  // Extra safety check + small retry if needed
  let attempts = 0;
  while (attempts < 5) {
    if (await registerBtn.isEnabled()) {
      console.log('→ Register button enabled after', attempts, 'extra checks');
      break;
    }
    await page.waitForTimeout(1000);
    attempts++;
  }

  if (attempts >= 5) {
    console.error('Register button still disabled after waiting. Check form validation.');
    await page.pause(); // ← stops execution so you can inspect
  }

  console.log('→ Clicking Register...');

  await registerBtn.click();

  console.log('→ Waiting for redirect to garage page...');

  await page.waitForURL(/.*(garage|panel\/garage)/i, { timeout: 30000 });

  console.log('→ Registration completed. Current URL:', page.url());

  const statePath = path.join(__dirname, 'auth-user.json');
  await context.storageState({ path: statePath });

  console.log('→ Auth state saved to:', statePath);

  await browser.close();
}