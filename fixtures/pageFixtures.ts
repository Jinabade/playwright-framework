
import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { HomePage } from '../pages/HomePage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

dotenv.config();

type PageFixtures = {
  homePage: HomePage;
  accountPage: AccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

const APP_URL = process.env.WEB_APP_URL;

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    if (!APP_URL) {
      throw new Error(
        'WEB_APP_URL must be set in your .env file to run web tests.'
      );
    }

    await page.goto(APP_URL);

    await use(new HomePage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export { expect };