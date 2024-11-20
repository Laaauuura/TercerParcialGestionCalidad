import {expect, Locator, Page } from '@playwright/test';

export class NewItemPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly table: Locator; //MainTableRight
    readonly newItemInput: Locator;
    readonly optionsButton: Locator; //AddItemMore
    readonly calendarButton: Locator; //AddItemCalIcon
    readonly nexMonthButton: Locator; //ui-icon ui-icon-circle-triangle-e
    readonly addItemButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        this.table = page.locator('#MainTableRight');
        this.newItemInput = page.locator('#NewItemContentInput');
        this.optionsButton = page.locator('#AddItemMore');
        this.calendarButton = page.locator('img[src="images/alarm.png"]');
        this.nexMonthButton = page.locator('.ui-icon-circle-triangle-e');
        this.addItemButton = page.locator('#NewItemAddButton');
    }

    async clickOnFillNameItem(content: string) {
        await this.newItemInput.waitFor({ state: 'visible' });
        await this.newItemInput.fill(content);
    }

    async selectDate() {
        await this.optionsButton.click();
        await this.calendarButton.click();
        await this.nexMonthButton.click();
    }

    async clickOnAddItem() {
        await this.addItemButton.click();
    }
}
