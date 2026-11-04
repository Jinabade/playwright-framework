import { Page, Locator, expect } from '@playwright/test';

export class searchpage {
  private readonly page: Page;
  private readonly searchfiled: Locator;
  private readonly add: Locator;
  // private readonly clk: Locator;
  private readonly addcard: Locator;
  // private readonly card: Locator;
  // private readonly productlink: Locator;
  // private readonly cardpage: Locator;
 

  constructor(page: Page) {
    this.page = page;

    // Search field
    this.searchfiled = page.getByRole('textbox', {
      name: 'Search',
      exact: true
    });

    // Add to Cart button
    this.add = page.getByRole('button', {
      name: 'Add to Cart'
    }).first();


    // this.clk=page.locator("button[class='btn btn-lg btn-dark d-block dropdown-toggle'] ");
     
    this.addcard=page.locator("a[title='Shopping Cart']");

  



  }

  // Search product
  async searchproduct(productname: string): Promise<void> {
    await expect(this.searchfiled).toBeVisible();

    await this.searchfiled.fill(productname);
    await this.searchfiled.press('Enter');


await expect(this.page.locator('h1')).toHaveText(
  `Search - ${productname}`,
  { timeout: 15000 }
);
  }

  // Verify product image
  async searchproductverify(productname: string): Promise<void> {
    await expect(
      this.page.getByTitle(productname, { exact: true })
    ).toBeVisible();
  }

  // Click product link and verify product details heading
  async openproduct(productname: string): Promise<void> {
    const productLink = this.page.getByRole('link', {
      name: productname,
      exact: true
    });

    await expect(productLink).toBeVisible();
    await productLink.click();

    await expect(this.page.locator('h1')).toHaveText(
      productname,
      { timeout: 10000 }
    );
  }

  // Add product to cart and verify success message
  async addproducttocart(): Promise<void> {
    await expect(this.add).toBeVisible();
    await this.add.click();

    await expect(this.page.locator('#alert')).toContainText(
      'Success',
      { timeout: 10000 }
    );


  }


  // Verify product added to cart
  // async verifyproductaddedtocart(): Promise<void> {
  //  expect(this.clk).toBeVisible();
  //    this.clk.click();
    
  // }

  async viewcardpage(): Promise<void> {
    await expect(this.addcard).toBeVisible();
    await this.addcard.click(); 

  }


  
}