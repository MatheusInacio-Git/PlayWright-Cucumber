const {Given, When, Then} = require("@cucumber/cucumber")
const {chromium, expect} = require("@playwright/test")

let browser 
let page
Given('I\'m on the login page', async function () {
    browser = await chromium.launch({headless: false})
    page = await browser.newPage()

    page.goto('https://front.serverest.dev/login');
});

When('I type my {string} and {string}',async function (email, password) {
    await page.locator("[data-testid='email']").fill(email);
    await page.locator("[data-testid='senha']").fill(password);
    await page.locator("[data-testid='entrar']").click();
});

Then('I have a successful login', async function () {
    const homeTitle = await page.locator("h1");
    await expect(homeTitle).toContainText('Serverest Store');
    await browser.close();
});

Then('I receive an error message', async function () {
    await page.setDefaultTimeout(10000); // Aumenta o tempo limite para 10 segundos
    const invalidLoginAlert = await page.locator(".alert-dismissible");
    await expect(invalidLoginAlert).toContainText('Email e/ou senha inválidos');
    await browser.close();
});