import { test, expect, type Locator } from '@playwright/test';
import MainPage from '../pages/mainPage';
import CommonActions from '../utils/CommonActions';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target,
    ClassicRunner
} from '@applitools/eyes-playwright';

let commonActions: CommonActions;
let mainPage: MainPage;

export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;

test.beforeAll(async () => {
    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({testConcurrency: 1});
    } else {
        Runner = new ClassicRunner();
    }

    const runnerName = USE_ULTRAFAST_GRID ? 'Ultrafast Grid' : 'Classic Runner';
    Batch = new BatchInfo({name: `Playwright Tests - ${runnerName}`});
    Config = new Configuration();

    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.setViewportSize({ width: 800, height: 600 });
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1024, 768, BrowserType.FIREFOX);
        Config.addBrowser(1200, 800, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    }
});

test.beforeEach(async ({ page }) => {

    eyes = new Eyes(Runner , Config);
    await eyes.open(
        page,
         'Playwright',
         test.info().title,
        { width: 800, height: 600 }
        );
    mainPage = new MainPage(page);
    commonActions = new CommonActions(page);
    // Navigate to the base URL before each test
    await mainPage.navigate();

});

test.afterEach(async ({ page }) => {
    // Close the eyes instance after each test
    await eyes.close();
});

test.afterAll(async () => {
    // Wait for all tests to complete
    const results = await Runner.getAllTestResults();
    console.log(results);
});

test('Visual Regression Test for Main Page', async ({ page }) => {
    // Accept cookies if the button is present
    await mainPage.acceptCookies();
    await page.locator(".icon.close-icon.mntl-button__icon").click();
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is loaded

    // Take a visual snapshot of the main page
    await eyes.check('Main Page', Target.window());

    // Perform a search operation
    const searchInput = page.locator('#search-input'); // Adjust the locator as needed
    await mainPage.search(searchInput, 'Playwright');

    // Take a visual snapshot after performing the search
    await eyes.check('Search Results', Target.window());
});