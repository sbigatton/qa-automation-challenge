import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 * 6. Assert the page goes dark when the 'Dark' color option is selected
 * 7. Assert the page goes light when the 'Light' color option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Assert total number of articles is less than 7,000,000 */
    const totalArticlesLink = page.getByTitle('Special:Statistics').nth(1);
    const totalArticles = await totalArticlesLink.textContent();
    const cleanTotalNumber = Number(totalArticles?.toString().replaceAll(',', ''));
    expect(cleanTotalNumber).toBeLessThan(7000000);

    /** STEP: Click the link to view the total number of articles in English */
    await totalArticlesLink.click();

    /**
     * Options are disabled using my user account.
     * From this point I have tried to play with viewportsize and a function to go into settings appearence and set size and colors but it does not work for me.
     */

    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
    await smallTextSizeOption.click();

    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();

    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeButton = page.getByLabel('Standard').first();
    await standardTextSizeButton.click();

    /** STEP: Click the 'Dark' color radio button to change the theme */
    const darkColorRadioButton = page.getByRole('radio', { name: 'Dark' });
    await darkColorRadioButton.click();

    /** STEP: Click the 'Light' color radio button to change the appearance settings */
    const lightColorRadioButton = page.getByRole('radio', { name: 'Light' });
    await lightColorRadioButton.click();
}
