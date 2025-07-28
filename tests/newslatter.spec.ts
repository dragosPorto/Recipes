import { test, expect, type Locator } from '@playwright/test';
import MainPage from '../pages/mainPage';
import CommonActions from '../utils/CommonActions';

let commonActions: CommonActions;
let mainPage: MainPage;

// Define locators for the newsletter section
let newsletterButton: Locator;
let newsletterDialog: Locator;
let emailError: Locator;
let subscriptionError: Locator;
let subscribeButton: Locator;
let newsletterCheckboxes: Locator;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  commonActions = new CommonActions(page);
  // Navigate to the base URL before each test
  await mainPage.navigate();
  // Accepting cookies if the button is present
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is loaded
  await mainPage.acceptCookies();

    // Initialize the locator for the newsletter section
    newsletterButton = page.locator('#mntl-newsletter-dialog--footer-link_1-0');
    newsletterDialog = page.locator('#newsletter-dialog-footer_1-0');
    emailError = page.locator('xpath = //*[@id="mntl-newsletter_2-0"]/form/div[2]/div');
    subscriptionError = page.locator('xpath = //*[@id="mntl-newsletter_2-0"]/form/div[3]/div[2]/div');
    subscribeButton = page.locator('xpath=//*[@id="mntl-newsletter_2-0"]/form/button');
    newsletterCheckboxes = page.locator('xpath = //*[@id="mntl-newsletter_2-0"]/form/div[3]/div[1]/ul/li/input');
});

test.skip('Newslatter is displayed', async ({ page }) => {
    let isVisible = await commonActions.elVisible(newsletterDialog);
    // Check if the newsletter dialog is not visible initially
    expect(isVisible).toBeFalsy();

    isVisible = await commonActions.elVisible(newsletterButton);

  // Check if the newsletter section is visible
  await commonActions.click(newsletterButton);
    expect(isVisible).toBeTruthy();
});

test('Subscribe with an invalid email', async ({ page }) => {
    // Click the newsletter button to open the dialog
    await commonActions.click(newsletterButton);

// Uncheck all checkboxes in the newsletter dialog
await expect(newsletterCheckboxes.first()).toBeVisible({ timeout: 5000 });

    const count = await newsletterCheckboxes.count();

    for (let i = 0; i < count; i++) {
        const checkbox = newsletterCheckboxes.nth(i);
        await checkbox.evaluate((el: HTMLElement) => el.click());
    }

    // Click the subscribe button
    await commonActions.click(subscribeButton);

    // Check if the error message for invalid email is displayed
    const emailErrorMessage = await commonActions.getText(emailError);
    const subscriptionErrorMessage = await commonActions.getText(subscriptionError);


    expect(emailErrorMessage).toContain('Please enter your email address');
    expect(subscriptionErrorMessage).toContain('Please select a newsletter');
});