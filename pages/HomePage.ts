
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly btnMyAccount: Locator;
  private readonly txtSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnMyAccount = page.getByRole('button', { name: 'My Account' });
    this.txtSearch = page.getByRole('textbox', { name: 'Search' });
  }

  /**
   * Verifies that the store homepage is displayed.
   * @returns Promise<boolean> - true when the Featured section is visible
   */
  async isHomePageExists(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Featured' }).isVisible();
  }

  /**
   * Opens the customer registration page through the account menu.
   */
  async openRegistration(): Promise<void> {
    await this.btnMyAccount.click();

    await this.page.getByRole('link', {
      name: 'Register',
      exact: true
    }).click();
  }

  /**
   * Opens the customer login page through the account menu.
   */
  async openLogin(): Promise<void> {
    await this.btnMyAccount.click();

    await this.page.getByRole('link', {
      name: 'Login',
      exact: true
    }).click();
  }

  /**
   * Searches for a product using the store's main search field.
   * @param productName - Product name to search for
   */
  async searchProduct(productName: string): Promise<void> {
    await this.txtSearch.waitFor({ state: 'visible' });
    await this.txtSearch.fill(productName);

    await Promise.all([
      this.page.waitForURL(
        url => url.searchParams.get('route') === 'product/search',
        { timeout: 15_000 }
      ),
      this.txtSearch.press('Enter')
    ]);

    // Confirm the search results page
    await this.page.getByRole('heading', {
      name: /Search/i,
      level: 1
    }).waitFor({ state: 'visible', timeout: 10_000 });
  }
}
