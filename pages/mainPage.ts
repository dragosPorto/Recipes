import {Page, type Locator} from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class MainPage {
    private actions: CommonActions;

    constructor(page: Page) {
        this.actions = new CommonActions(page);
    }

    async navigate() {
        // Navigate to the base URL
        await this.actions.navigate('/');
    }

    async acceptCookies() {
        // Accept cookies if the button is present
        await this.actions.acceptCookies();
    }

    async search(locator: Locator, words: string) {
        // Type TEXT into the search input 
        await this.actions.fillInput(locator, words);
}
}