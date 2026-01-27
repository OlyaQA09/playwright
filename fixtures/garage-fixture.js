// fixtures/garage-fixture.js
import { test as base, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { GaragePage } from './pages/GaragePage.js';

const test = base.test.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      // auth-user.json is in project root → go up one level
      storageState: path.join(__dirname, '../auth-user.json'),
      // Alternative (more robust): path.join(process.cwd(), 'auth-user.json')
    });

    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    await garagePage.goto();

    await use(garagePage);

    await context.close();
  },
});

export { test, expect };