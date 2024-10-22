class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[data-test="username"]';
        this.passwordInput = 'input[data-test="password"]';
        this.loginButton = 'input[data-test="login-button"]';
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;