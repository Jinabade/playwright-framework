
import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;
  private readonly txtQuantity: Locator;
  private readonly btnAddToCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtQuantity = page.locator('input[name="quantity"]');
    this.btnAddToCart = page.getByRole('button', {
      name: 'Add to Cart',
      exact: true
    });
  }

  /**
   * Opens a matching product from the search results.
   * @param productName - Exact product name to open
   */
  async openFromSearchResults(productName: string): Promise<void> {
    const productHeading = this.page.getByRole('heading', {
      name: productName,
      exact: true
    });

    await expect(productHeading).toBeVisible();

    const productLink = productHeading.getByRole('link');

    await Promise.all([
      this.page.waitForURL(
        url => /route=product\/product/.test(url.search),
        { timeout: 15_000 }
      ),
      productLink.click()
    ]);
  }

  /**
   * Verifies that the selected product details are displayed.
   * @param productName - Expected product name
   */
  async isProductPageExists(productName: string): Promise<boolean> {
    const productHeading = this.page.getByRole('heading', {
      name: productName,
      exact: true,
      level: 1
    });

    await expect(productHeading).toBeVisible();

    return productHeading.isVisible();
  }

  /**
   * Reads the displayed product price.
   */
  async getProductPrice(): Promise<string> {
    const priceLocator = this.page.locator(
      '.price-new, #content .price, .product-price'
    ).first();

    await expect(priceLocator).toBeVisible();

    const price = await priceLocator.textContent();

    if (!price?.trim()) {
      throw new Error('The product price was not displayed.');
    }

    return price.trim();
  }

  /**
   * Reads the displayed pre-tax product price.
   */
  async getProductExTaxPrice(): Promise<string> {
    const exTaxLocator = this.page.getByText(/^Ex Tax:/);

    await expect(exTaxLocator).toBeVisible();

    const text = await exTaxLocator.textContent();
    const price = text?.replace(/^Ex Tax:\s*/, '').trim();

    if (!price) {
      throw new Error('The product pre-tax price was not displayed.');
    }

    return price;
  }

  /**
   * Sets the product quantity.
   * @param quantity - Quantity to add to the cart
   */
  async setQuantity(quantity: number): Promise<void> {
    await expect(this.txtQuantity).toBeVisible();
    await this.txtQuantity.fill(String(quantity));
  }

  /**
   * Adds the selected product to the cart.
   */
  async addToCart(): Promise<void> {
    await expect(this.btnAddToCart).toBeVisible();

    await Promise.all([
      this.page.waitForResponse(
        response =>
          response.url().includes('route=checkout/cart.add') &&
          response.ok(),
        { timeout: 15_000 }
      ),
      this.btnAddToCart.click()
    ]);
  }

  /**
   * Verifies that the add-to-cart confirmation is displayed.
   */
  async isProductAddedToCart(): Promise<boolean> {
    return this.page.getByText('Success: You have added', {
      exact: false
    }).isVisible();
  }
}
