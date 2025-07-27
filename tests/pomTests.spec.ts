import { test, expect, type Locator } from '@playwright/test';
import MainPage from '../pages/mainPage';
import CommonActions from '../utils/CommonActions';


let commonActions: CommonActions;
let mainPage: MainPage;

let logo: Locator;
let searchInput: Locator;
let searchButton: Locator;
let firstResult: Locator;


test.beforeEach(async ({ page }) => {

  mainPage = new MainPage(page);
  commonActions = new CommonActions(page);
  // Navigate to the base URL before each test
  mainPage.navigate();
  //Accepting cookies if the button is present
  await mainPage.acceptCookies();

  // Variables and constants
  logo = page.locator('#header-logo_1-0').first();
  searchInput = page.getByPlaceholder('Find a recipe or ingredient');
  searchButton = page.locator('xpath = //*[@id="mntl-search-form--open_1-0"]/form/div/button');
  firstResult = page.locator('#mntl-search-form--hero__search-input');

});

test('logo is showing', async ({ page }) => {

  // Check if the logo is visible

  await commonActions.elVisible(logo);
  await page.waitForTimeout(1000); // Wait for 1 second to visually confirm the logo

});

test('seach for something and search bar has the entered text', async ({ page }) => {
  // Type TEXT into the search input

await mainPage.search(searchInput, 'chicken');

await commonActions.click(searchButton);

const value = await commonActions.getInputValue(firstResult);
  
  // Check if the first result contains 'chicken'

expect(value).toBe('chicken');
});
