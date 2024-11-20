import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginUser.page';
import { NewItemPage } from '../pages/newWork.page';
import { DeleteItemPage } from '../pages/deleteItemWork.page';

test.beforeEach(async ({ page }) => {
    await page.goto('https://todo.ly/');
});


test('Crear item en Work / Borrar el primer item', async ({ page }) => {

    //Inicio sesión
    const loginPage = new LoginPage(page);
    const newItemPage = new NewItemPage(page);
    const deleteItemPage = new DeleteItemPage(page);
    await loginPage.clickOnLogin();
    await loginPage.fillEmailPass("prueba3@fakemail.com", "12345");
    await loginPage.submitLogin();
    
    //Crear item
    await newItemPage.clickOnFillNameItem("Item de prueba");
    await newItemPage.selectDate();
    await newItemPage.clickOnAddItem();

    //Delete
    await deleteItemPage.deleteItem();

});
