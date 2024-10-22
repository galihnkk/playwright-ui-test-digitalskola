const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CartPage = require('../pageobjects/CartPage');

test.describe('SauceDemo PO Tests', () => {
    let loginPage, dashboardPage, cartPage;

    test('User success login', async ({ page }) => {
        loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);

        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Validate that the user is on the dashboard after logging in', async () => {
        const isOnDashboard = await dashboardPage.validateOnDashboard();
        expect(isOnDashboard).toBeTruthy();
    });

    test('Add item to cart from dashboard', async ({ page }) => {
        await dashboardPage.addItemToCart();

        const removeButtonVisible = await page.isVisible('button[data-test="remove-sauce-labs-backpack"]');
        expect(removeButtonVisible).toBeTruthy();
    });

    test('Validate item in cart', async () => {
        await dashboardPage.addItemToCart();

        await cartPage.navigateToCart();
        const itemInCart = await cartPage.validateItemInCart();
        expect(itemInCart).toBeTruthy();
    });
});