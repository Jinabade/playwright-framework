import { Page,test,Locator, expect } from '@playwright/test';

export class myhome {
  private readonly page: Page;
  private readonly search:Locator;
  private readonly product:Locator;
  // private readonly url: string;

  constructor(page: Page) {
    this.page = page;

    this.search=page.locator("input[class='desktop-searchBar']");

    this.product = this.page
  .locator('h3.product-brand')
  .filter({ hasText: 'HRX by Hrithik Roshan' });
  }

   async openhomepage(): Promise<void> {
    await this.page.goto('https://www.myntra.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

    async searchproduct()
    {
    await  this.search.fill('tshirt');
    await  this.search.press('Enter');

   expect(this.product.first()).toBeVisible();


    }

}