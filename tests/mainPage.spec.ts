import { test, expect, type Locator } from '@playwright/test';
import MainPage from '../pages/mainPage';
import CommonActions from '../utils/CommonActions';


let commonActions: CommonActions;
let mainPage: MainPage;

let logo: Locator;
let searchInput: Locator;
let searchButton: Locator;
let firstResult: Locator;
let popularSearchInput: Locator;
let popularSearchButton: Locator;
let popularCategories: Locator;
let partnersCarousel: Locator;
let carouselIndicators: Locator;


test.beforeEach(async ({ page }) => {

  mainPage = new MainPage(page);
  commonActions = new CommonActions(page);
  // Navigate to the base URL before each test
  mainPage.navigate();
  //Accepting cookies if the button is present
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000); // Wait for 1 second to ensure the
  await mainPage.acceptCookies();

  // Variables and constants
  logo = page.locator('#header-logo_1-0').first();
  searchInput = page.getByPlaceholder('Find a recipe or ingredient');
  popularSearchInput = page.getByPlaceholder('Search here...');
  searchButton = page.locator('xpath = //*[@id="mntl-search-form--open_1-0"]/form/div/button');
  popularSearchButton = page.locator('//*[@id="related-category-search__form_1-0"]/form/div/button');
  firstResult = page.locator('#mntl-search-form--hero__search-input');
  popularCategories = page.locator('.category-tag__list');
  partnersCarousel = page.locator('.comp.mntl-carousel__item.mntl-block.carousel-card');
  carouselIndicators = page.locator('.comp.mntl-carousel__indicator-item.mntl-block');

});

test.skip('logo is showing', async ({}) => {

  // Check if the logo is visible

  await commonActions.elVisible(logo);

});

test.skip('seach for something and search bar has the entered text', async ({}) => {
  // Type TEXT into the search input

await mainPage.search(searchInput, 'tortilla');

await commonActions.click(searchButton);

const value = await commonActions.getInputValue(firstResult);
  
  // Check if the first result contains 'chicken'

expect(value).toBe('tortilla');
});

test.skip('search with the popular searches searchbar', async ({}) => {

await commonActions.fillInput(popularSearchInput, 'chicken');
await commonActions.click(popularSearchButton);

const value = await commonActions.getInputValue(firstResult);
// Check if the first result contains 'chicken'
expect(value).toBe('chicken');


});

test.skip('check search with popular category items', async ({}) => {

// Check if the popular categories are visible
await commonActions.elVisible(popularCategories);
//Click an element from popular categories based on text
await commonActions.click(popularCategories.getByText('Banana Bread'));
// Check if the first result contains 'chicken'
const value = await commonActions.getInputValue(firstResult);
expect(value).toBe('Banana Bread');

  
});

test('check carousell items one by one', async ({}) => {
  const count = await partnersCarousel.count();

  for (let i = count - 1; i >= 0; i--) {
    const item = partnersCarousel.nth(i);
    const dot = carouselIndicators.nth(i);
    
    await commonActions.click(dot);
    await commonActions.elVisible(item);
  }

  

})