
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly linkShoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkShoppingCart = page.getByRole('link', {
      name: 'Shopping Cart',
      exact: true
    });
  }

  /**
   * Opens the shopping cart.
   */
  async open(): Promise<void> {
    await expect(this.linkShoppingCart).toBeVisible();

    await Promise.all([
      this.page.waitForURL(
        url => /route=checkout\/cart/.test(url.search),
        { timeout: 15_000 }
      ),
      this.linkShoppingCart.click()
    ]);
  }

  /**
   * Locates the cart row for a product.
   * @param productName - Exact product name in the cart
   */
  getProductRow(productName: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('link', {
        name: productName,
        exact: true
      })
    });
  }

  /**
   * Reads the quantity displayed for a cart product.
   */
  async getProductQuantity(productName: string): Promise<string> {
    const quantityInput = this.getProductRow(productName)
      .getByRole('textbox');

    await expect(quantityInput).toBeVisible();

    return quantityInput.inputValue();
  }

  /**
   * Reads the unit price displayed for a cart product.
   */
  async getProductUnitPrice(productName: string): Promise<string> {
    const productRow = this.getProductRow(productName);

    await expect(productRow).toBeVisible();

    const priceCell = productRow.getByRole('cell').nth(3);
    await expect(priceCell).toBeVisible();

    const price = await priceCell.textContent();

    if (!price?.trim()) {
      throw new Error(
        `Unit price was not displayed for product: ${productName}`
      );
    }

    return price.trim();
  }

  /**
   * Reads the displayed total for a product row.
   */
  async getProductLineTotal(productName: string): Promise<string> {
    const productRow = this.getProductRow(productName);

    await expect(productRow).toBeVisible();

    const totalCell = productRow.getByRole('cell').nth(4);
    await expect(totalCell).toBeVisible();

    const total = await totalCell.textContent();

    if (!total?.trim()) {
      throw new Error(
        `Line total was not displayed for product: ${productName}`
      );
    }

    return total.trim();
  }

  /**
   * Reads the pre-tax subtotal displayed in the cart.
   */
  async getCartSubtotal(): Promise<string> {
    return this.getCartSummaryValue('Sub-Total');
  }

  /**
   * Reads the grand total displayed in the cart.
   */
  async getCartTotal(): Promise<string> {
    return this.getCartSummaryValue('Total');
  }

  private async getCartSummaryValue(label: string): Promise<string> {
    const summaryRow = this.page.getByRole('row').filter({
      has: this.page.getByText(label, { exact: true })
    });

    await expect(summaryRow.last()).toBeVisible();

    const value = await summaryRow.last().getByRole('cell').last().textContent();

    if (!value?.trim()) {
      throw new Error(`The cart summary value was not displayed: ${label}`);
    }

    return value.trim();
  }
}