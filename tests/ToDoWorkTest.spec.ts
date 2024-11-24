import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginUser.page';
import { ItemsListPage } from '../pages/itemsList.page';
import { MenuItemPage } from '../pages/menuItem.page';

test.beforeEach(async ({ page }) => {
    await page.goto('https://todo.ly/');
});

test('Crear item en Work', async ({ page }) => {
    // Inicio de sesión
    const loginPage = new LoginPage(page);
    const itemsListPage = new ItemsListPage(page);

    await loginPage.clickOnLogin();
    await loginPage.fillEmailPass("prueba3@fakemail.com", "12345");
    await loginPage.submitLogin();

    // Crear ítem
    await itemsListPage.clickOnFillNameItem("Item nuevo");
    await itemsListPage.selectDate();
    await itemsListPage.clickOnAddItem();

    // Verificación
    console.log('Verificación');
    const createdItem = page.locator('#mainItemList .BaseItemLi:has-text("Item nuevo")');
    await expect(createdItem).toBeVisible();
    console.log('Ítem creado correctamente.');
});

test('Borrar el primer item', async ({ page }) => {
    // Inicio de sesión
    const loginPage = new LoginPage(page);
    const menuItemPage = new MenuItemPage(page);

    await loginPage.clickOnLogin();
    await loginPage.fillEmailPass("prueba3@fakemail.com", "12345");
    await loginPage.submitLogin();
    console.log('Inicio de sesión enviado.');

    // Obtener el texto del primer ítem
    const firstItem = page.locator('#mainItemList .BaseItemLi').first();
    const firstItemText = (await firstItem.innerText()).trim();
    console.log(`Texto del primer ítem: "${firstItemText}"`);

    // Eliminar el ítem
    await menuItemPage.deleteItem();

    // Verificación
    console.log('Verificación');
    const deletedItem = page.locator(`#mainItemList .BaseItemLi:has-text("${firstItemText}")`);
    await expect(deletedItem).not.toBeVisible();
    console.log('El ítem fue eliminado correctamente.');
});
