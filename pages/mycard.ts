
import { Page, Locator, expect } from '@playwright/test';

export class shopingcard {
  private readonly heading: Locator;
  private readonly page: Page;
  private readonly product: Locator;
  private readonly unitPrice: Locator;
  private readonly totalPrice: Locator;
  private readonly checkout:Locator;


  constructor(page: Page) {
    this.page = page;

    this.heading = page.locator('h1');

    // Product name link
    this.product = page
      .locator('#output-cart tbody tr td')
      .nth(1)
      .getByRole('link', { name: 'MacBook', exact: true });

    // Complete product row
    // this.productRow = page.locator('#output-cart tbody tr');

    this.unitPrice = page.locator('#output-cart tbody tr td').nth(3);
    this.totalPrice = page.locator('#output-cart tbody tr td').nth(4);

    this.checkout= page.getByRole('link',{name:'Checkout',exact:true}).last();
  }

  async verifycartheading(): Promise<void> {
    await expect(this.heading).toBeVisible();

    await expect(this.heading).toHaveText(
      'Shopping Cart (0.00kg)',
      { timeout: 10000 }
    );

    await expect(this.page).toHaveURL(/route=checkout\/cart/);
  }

  async verifyProductname(): Promise<void> {
    await expect(this.product).toBeVisible();
  }


  async verifyproductprice(): Promise<void> {
  await expect(this.unitPrice).toHaveText('$602.00');
  await expect(this.totalPrice).toHaveText('$602.00');

  await expect(this.checkout).toBeVisible();
  await this.checkout.click();
}


 
}
