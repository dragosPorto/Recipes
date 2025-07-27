import { Page, type Locator } from '@playwright/test'; // or '@playwright/test' if you're using @playwright/test

export default class CommonActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        // Navigate to the base URL
        await this.page.goto(url);
    }
        
    async acceptCookies() {
        // Accept cookies if the button is present
        const acceptCookiesButton = this.page.locator("button[id='onetrust-accept-btn-handler']");
        if (await acceptCookiesButton.isVisible()) {
            await acceptCookiesButton.click();
        }
    }

    async click(locator: Locator) {
        // Click on an element specified by the selector
        const element = locator;
        await element.click();
    }

    async fillInput(locator: Locator, text: string) {
        // Fill an input field specified by the selector with the given text
        const input = locator;
        await input.fill(text);
    }

    // Method that gets the value inside an input field
    async getInputValue(locator: Locator): Promise<string> {
        // Get the value of an input field specified by the selector
        const input = locator;
        return await input.inputValue();
    }

    // Method that gets the text content of an element
    async getText(selector: string): Promise<string> {
        // Get the text content of an element specified by the selector
        const element = this.page.locator(selector);
        return await element.textContent() || '';
    }

    async isChecked(selector: string): Promise<boolean> {
        // Check if a checkbox or radio button is checked
        const element = this.page.locator(selector);
        return await element.isChecked();
    }

    async elVisible(locator: Locator): Promise<boolean> {
        // Check if an element is visible
        const element = locator;
        return await element.isVisible();
    }
}