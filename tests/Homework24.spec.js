import { test, expect } from '@playwright/test';

import { GetElement } from "../Helpers/Page Objects/GetElement";
import { HomePage } from "../Helpers/Page Objects/HomePage";
import { faker } from '@faker-js/faker';


test.describe('Testing Name field', () => {
    let homePage;
    let getElement;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);

        await homePage.navigateAndAuth();
        await getElement.signUpBtn.click();
    });

    test('Registration name test - empty field', async ({ page }) => (
        await getElement.registrationName.click(),
        await getElement.outClick.click(),
        await expect(page.getByText("Name required")).toBeVisible(),
        await expect(getElement.registrationName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration name test - wrong data', async ({ page }) => (
        await getElement.registrationName.click(),
        await getElement.registrationName.fill("1234"),
        await getElement.outClick.click(),
        await expect(page.getByText("Name is invalid")).toBeVisible(),
        await expect(getElement.registrationName).toHaveCSS('border-color', 'rgb(220, 53, 69)')

    ));

    test('Registration name test - wrong lenth', async ({ page }) => (
        await getElement.registrationName.click(),
        await getElement.registrationName.fill("a"),
        await getElement.outClick.click(),
        await expect(page.getByText("Name has to be from 2 to 20 characters long")).toBeVisible(),
        await expect(getElement.registrationName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration name test wrong lenth', async ({ page }) => (
        await getElement.registrationName.click(),
        await getElement.registrationName.fill("abcdefghijklmnopqrstuvw"),
        await getElement.outClick.click(),
        await expect(page.getByText("Name has to be from 2 to 20 characters long")).toBeVisible(),
        await expect(getElement.registrationName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration name test - positive check', async ({ page }) => (
        await getElement.registrationName.click(),
        await getElement.registrationName.fill("Ivan"),
        await expect(getElement.registrationName).toHaveCSS('border-color', 'rgb(92, 179, 253)')
    ));

})

test.describe("Testing Last Name field", () => {

    let homePage;
    let getElement;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);

        await homePage.navigateAndAuth();
        await getElement.signUpBtn.click();
    });

    test('Registration Last name test - empty field', async ({ page }) => (
        await getElement.registrationLastName.click(),
        await getElement.outClick.click(),
        await expect(page.getByText("Last name required")).toBeVisible(),
        await expect(getElement.registrationLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Last name test - wrong data', async ({ page }) => (
        await getElement.registrationLastName.click(),
        await getElement.registrationLastName.fill("1234"),
        await getElement.outClick.click(),
        await expect(page.getByText("Last name is invalid")).toBeVisible(),
        await expect(getElement.registrationLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Last name test - wrong lenth', async ({ page }) => (
        await getElement.registrationLastName.click(),
        await getElement.registrationLastName.fill("a"),
        await getElement.outClick.click(),
        await expect(page.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible(),
        await expect(getElement.registrationLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Last name test wrong lenth', async ({ page }) => (
        await getElement.registrationLastName.click(),
        await getElement.registrationLastName.fill("abcdefghijklmnopqrstuvw"),
        await getElement.outClick.click(),
        await expect(page.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible(),
        await expect(getElement.registrationLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Last name test - positive check', async ({ page }) => (
        await getElement.registrationLastName.click(),
        await getElement.registrationLastName.fill("Petrenko"),
        await expect(getElement.registrationLastName).toHaveCSS('border-color', 'rgb(92, 179, 253)')
    ));

})

test.describe("Testing Email field", () => {

    let homePage;
    let getElement;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);

        await homePage.navigateAndAuth();
        await getElement.signUpBtn.click();
    });

    test('Registration Email test - empty field', async ({ page }) => (
        await getElement.registrationEmail.click(),
        await getElement.outClick.click(),
        await expect(page.getByText("Email required")).toBeVisible(),
        await expect(getElement.registrationEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Email test - wrong data', async ({ page }) => (
        await getElement.registrationEmail.click(),
        await getElement.registrationEmail.fill("abcd"),
        await getElement.outClick.click(),
        await expect(page.getByText("Email is incorrect")).toBeVisible(),
        await expect(getElement.registrationEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Email test - positive check', async ({ page }) => (
        await getElement.registrationEmail.click(),
        await getElement.registrationEmail.fill("abcdtestingexample@test.ui"),
        await expect(getElement.registrationEmail).toHaveCSS('border-color', 'rgb(92, 179, 253)')
    ));

})

test.describe("Testing Password field", () => {

    let homePage;
    let getElement;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);

        await homePage.navigateAndAuth();
        await getElement.signUpBtn.click();
    });

    test('Registration Password test - empty field', async ({ page }) => (
        await getElement.registrationPassword.click(),
        await getElement.outClick.click(),
        await expect(page.getByText("Password required")).toBeVisible(),
        await expect(getElement.registrationPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Password test - wrong data', async ({ page }) => (
        await getElement.registrationPassword.click(),
        await getElement.registrationPassword.fill("abcd"),
        await getElement.outClick.click(),
        await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible(),
        await expect(getElement.registrationPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Password test - positive check', async ({ page }) => (
        await getElement.registrationPassword.click(),
        await getElement.registrationPassword.fill("abcdefj1!A"),
        await expect(getElement.registrationPassword).toHaveCSS('border-color', 'rgb(92, 179, 253)')
    ));

})

test.describe("Testing Re-enter Password field", () => {

    let homePage;
    let getElement;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);

        await homePage.navigateAndAuth();
        await getElement.signUpBtn.click();
    });

    test('Registration Re-enter Password test - empty field', async ({ page }) => (
        await getElement.registrationReenterPassword.click(),
        await getElement.outClick.click(),
        await expect(page.getByText("Re-enter password required")).toBeVisible(),
        await expect(getElement.registrationReenterPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Re-enter Password test - passwords do not match', async ({ page }) => (
        await getElement.registrationPassword.click(),
        await getElement.registrationPassword.fill("abcdefj1!A"),
        await expect(getElement.registrationPassword).toHaveCSS('border-color', 'rgb(92, 179, 253)'),
        await getElement.registrationReenterPassword.click(),
        await getElement.registrationReenterPassword.fill("abcdefj1!B"),
        await getElement.outClick.click(),
        await expect(page.getByText("Passwords do not match")).toBeVisible(),
        await expect(getElement.registrationReenterPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    ));

    test('Registration Re-enter Password test - passwords are match', async ({ page }) => (
        await getElement.registrationPassword.click(),
        await getElement.registrationPassword.fill("abcdefj1!A"),
        await expect(getElement.registrationPassword).toHaveCSS('border-color', 'rgb(92, 179, 253)'),
        await getElement.registrationReenterPassword.click(),
        await getElement.registrationReenterPassword.fill("abcdefj1!A"),
        await expect(getElement.registrationReenterPassword).toHaveCSS('border-color', 'rgb(92, 179, 253)'),

        //await expect(getElement.registerBtn).toContainText('Register'),

        await expect(getElement.registerBtn).toBeDisabled()
    ));

})

test.describe("Registration", () => {

    let homePage;
    let getElement;
    let firstName;
    let lastName;
    let email;
    let password;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page, 'https://qauto.forstudy.space/');
        getElement = new GetElement(page);
        firstName = faker.person.firstName(6);
        lastName = faker.person.lastName(6);
        email = `aqa.${faker.internet.email()}`; //faker.internet.email()
        password = faker.internet.password(18);

        await homePage.navigateAndAuth();

    });


    test('User creation', async ({ page }) => (
        await getElement.signUpBtn.click(),
        await getElement.registrationName.click(),
        await getElement.registrationName.fill(firstName),
        await getElement.registrationLastName.click(),
        await getElement.registrationLastName.fill(lastName),
        await getElement.registrationEmail.click(),
        await getElement.registrationEmail.fill(email),
        await getElement.registrationPassword.click(),
        await getElement.registrationPassword.fill(password),
        await getElement.registrationReenterPassword.click(),
        await getElement.registrationReenterPassword.fill(password),

        //await expect(getElement.registerBtn).toContainText('Register'),

        await getElement.registerBtn.click()
    ));

    test('Sign in', async ({ page }) => (
        await getElement.signInBtn.click(),
        await getElement.signInEmail.click(),
        await getElement.signInEmail.fill(email),
        await getElement.signInPassword.click(),
        await getElement.signInPassword.fill(password),

        await expect(getElement.loginBtn).toContainText('Login'),

        await getElement.loginBtn.click(),
        await expect(page.locator('.alert alert-danger', { hasText: 'Wrong email or password' })).not.toBeVisible()
    ))

})



