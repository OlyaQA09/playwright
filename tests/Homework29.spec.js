import { test, expect } from '@playwright/test';

import { GetElement } from "../Helpers/Page Objects/GetElement";
import { HomePage } from "../Helpers/Page Objects/HomePage";
import { faker } from '@faker-js/faker';
test.describe('Registration → Login → Profile mock', () => {

    let homePage, getElement, firstName, lastName, email, password;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);
        firstName = faker.person.firstName(6);
        lastName = faker.person.lastName(6);
        email = `aqa.${faker.internet.email()}`; //faker.internet.email()
        password = faker.internet.password(18);

        await homePage.navigateAndAuth();

    });


    test('Register → Login → see mocked profile', async ({ page }) => {
        await getElement.signUpBtn.click();
        await getElement.registrationName.fill(firstName);
        await getElement.registrationLastName.fill(lastName);
        await getElement.registrationEmail.fill(email);
        await getElement.registrationPassword.fill(password);
        await getElement.registrationReenterPassword.fill(password);
        await getElement.registerBtn.click();

        await expect(page.locator('.alert-success')).toBeVisible({ timeout: 8000 });

        await page.route('**/api/users/profile', route => route.fulfill({
            json: {
                status: "ok",
                data: {
                    userId: 327650,
                    photoFilename: "default-user.png",
                    name: "Hello",
                    lastName: "world"
                }
            }
        }));

        await page.goto('https://qauto.forstudy.space/panel/profile');
        await expect(page.getByText('Hello')).toBeVisible();
        await expect(page.getByText('world')).toBeVisible();
    });

    test('Add car using API - positive check', async ({ request }) => {
        await request.post('https://qauto.forstudy.space/api/auth/signin', {
            data: {
                "email": "41frozen@virgilian.com",
                "password": "41frozen@Q",
                "remember": false
            }
        });
        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }
        });
        expect(response.status()).toBe(201);

    });

    test('Add car using API - negative check with 400 error', async ({ request }) => {
        await request.post('https://qauto.forstudy.space/api/auth/signin', {
            data: {
                "email": "41frozen@virgilian.com",
                "password": "41frozen@Q",
                "remember": false
            }
        });
        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": "abcd"
            }
        });
        expect(response.status()).toBe(400);

    });

    test('Add car using API - negative check with 404 error', async ({ request }) => {
        await request.post('https://qauto.forstudy.space/api/auth/signin', {
            data: {
                "email": "41frozen@virgilian.com",
                "password": "41frozen@Q",
                "remember": false
            }
        });
        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: {
                "carBrandId": 80,
                "carModelId": 1,
                "mileage": 66
            }
        });
        expect(response.status()).toBe(404);

    });


});

