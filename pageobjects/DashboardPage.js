class DashboardPage {
    
    constructor(page) {
        this.page = page;
        this.pageTitle = '.title';
        this.addToCartButton = 'button[data-test="add-to-cart-sauce-labs-backpack"]';
        this.removeButton = 'button[data-test="remove-sauce-labs-backpack"]'; // Selector untuk tombol Remove
    }

    async validateOnDashboard() {
        return await this.page.isVisible(this.pageTitle);
    }

    async addItemToCart() {
        await this.page.click(this.addToCartButton);
    }

    async validateItemAdded() {
        return await this.page.isVisible(this.removeButton);
    }

    async takeScreenshotOnDashboard() {
        await this.page.screenshot({ path: 'screenshots/dashboardPage.png' });
    }

    async takeScreenshotAfterAddingItem() {
        await this.page.screenshot({ path: 'screenshots/dashboardItem.png' });
    }
}

module.exports = DashboardPage;