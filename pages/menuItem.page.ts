import { expect, Locator, Page } from '@playwright/test';

export class MenuItemPage {
    readonly page: Page;
    readonly itemOptionsButton: Locator;
    readonly optionsButton: Locator;
    readonly deleteItemButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.itemOptionsButton = page.locator('#mainItemList .BaseItemLi').first(); // Primer ítem
        this.optionsButton = this.itemOptionsButton.locator('img[title="Options"]');
        this.deleteItemButton = page.locator('#itemContextMenu li.delete.separator > a[href="#delete"]'); 
    }

    async deleteItem() {
        await this.itemOptionsButton.hover();
        await this.optionsButton.click();
        await this.deleteItemButton.waitFor({ state: 'visible' });
        await this.deleteItemButton.click();
    }
}

