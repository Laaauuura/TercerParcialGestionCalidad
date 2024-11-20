import {expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly loginButton: Locator;
    readonly loginDialog: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        this.loginButton = page.locator('.HPHeaderLogin > a');
        this.loginDialog = page.locator('.HPloginDiv');
        this.emailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }
    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnLogin(){
        await this.loginButton.waitFor({ state: 'visible' }); 
        await this.loginButton.click();
        await expect(this.loginDialog).toBeVisible();
    }

    async fillEmailPass(email: string, password: string){
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);        
    }

    async submitLogin(){
        await this.submitButton.click();
    }
}
