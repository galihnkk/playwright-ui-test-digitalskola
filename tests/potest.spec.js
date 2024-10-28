const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CartPage = require('../pageobjects/CartPage');

test.describe('SauceDemo PO Tests with Screenshot Validation', () => {
    let loginPage, dashboardPage, cartPage;

    test.beforeEach(async ({ page }) => {
        
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);

        await page.goto('https://www.saucedemo.com/');
    });

    test('User success login', async ({ page }) => {

        const loginScreenshotBefore = await page.screenshot();
    expect(loginScreenshotBefore).toMatchSnapshot('loginPage.png');

        await loginPage.login('standard_user', 'secret_sauce');

        await loginPage.takeScreenshotAfterLogin();
    
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    
        const loginScreenshotAfter = await page.screenshot();
        expect(loginScreenshotAfter).toMatchSnapshot('loginPageAfter.png'); 
    });    

    test('Validate that the user is on the dashboard after logging in', async ({ page }) => {
        
        await loginPage.login('standard_user', 'secret_sauce');

        const isOnDashboard = await dashboardPage.validateOnDashboard();
        expect(isOnDashboard).toBeTruthy();

        const dashboardScreenshot = await page.screenshot();
        expect(dashboardScreenshot).toMatchSnapshot('loginPageAfter.png');
    });

    test('Add item to cart from dashboard', async ({ page }) => {
        
        await loginPage.login('standard_user', 'secret_sauce');
        
        await dashboardPage.takeScreenshotOnDashboard();

        await dashboardPage.addItemToCart();

        const removeButtonVisible = await page.isVisible('button[data-test="remove-sauce-labs-backpack"]');
        expect(removeButtonVisible).toBeTruthy();

        await dashboardPage.takeScreenshotAfterAddingItem();

        const cartItemScreenshot = await page.screenshot();
        expect(cartItemScreenshot).toMatchSnapshot('dashboardItem.png');
    });

    test('Validate item in cart', async ({ page }) => {

        await loginPage.login('standard_user', 'secret_sauce');
        await dashboardPage.addItemToCart();
        await cartPage.navigateToCart();
    
        const itemInCart = await cartPage.validateItemInCart();
        expect(itemInCart).toBeTruthy();
    
        await cartPage.takeScreenshot(); 

        const cartScreenshot = await page.screenshot();
        expect(cartScreenshot).toMatchSnapshot('cartPage.png');
    });
});