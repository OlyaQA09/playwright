import { test, expect } from '../fixtures/garage-fixture.js';

test.describe('Garage — already logged in user', () => {
  test('should open Garage page and see Add car button', async ({ userGaragePage }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
  });

  test('should be able to click Add car button', async ({ userGaragePage }) => {
    await userGaragePage.addCarButton.click();

    await expect(userGaragePage.page.locator('#addCarMileage')).toBeVisible({ timeout: 2000 });
  });
});