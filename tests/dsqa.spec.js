const { test, expect } = require('@playwright/test');

test('SauceDemo UI Tests', async ({ page }) => {
  
  // Login with standart_user
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // User is on the dashboard after logging in
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  const inventoryHeader = page.locator('.title');
  await expect(inventoryHeader).toHaveText('Products');

  // Add item on dashboard to cart
  const firstItemAddToCartButton = page.locator('.btn_inventory').first();
  await firstItemAddToCartButton.click();

  // Validate item on cart
  const cartIcon = page.locator('.shopping_cart_badge');
  await expect(cartIcon).toHaveText('1');
  
});