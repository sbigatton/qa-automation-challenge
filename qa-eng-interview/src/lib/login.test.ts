import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }

    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin');
    const usernameField = page.getByPlaceholder('Enter your username');
    await usernameField.fill(wikipediaUsername);
    const passwordField = page.getByPlaceholder('Enter your password');
    await passwordField.fill(wikipediaPassword);
    const loginButton = page.getByRole('button', {name: 'Log in'});
    await loginButton.click();

    await page.waitForURL('https://en.wikipedia.org/wiki/Main_Page');

    await page.context().storageState({ path: authFile });
});
