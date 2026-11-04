
import { Page, Locator, expect } from '@playwright/test';

export class MyHomePage {
  private readonly page: Page;
  private readonly headingfeature: Locator;
  private readonly myaccount: Locator;
  private readonly register: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headingfeature = page.getByRole('heading', {
      name: 'Featured'
    });

    this.myaccount = page.getByRole('button', {
      name: 'My Account'
    });

    this.register = page.getByRole('link', {
      name: 'Register',
      exact: true
    });
  }

async openhomepage(): Promise<void> {
  const url = process.env.WEB_APP_URL;

  if (!url) {
    throw new Error('WEB_APP_URL is missing in .env file');
  }

  await this.page.goto(url);
}

  async verifheading(): Promise<void> {
    await expect(this.headingfeature).toBeVisible();
  }

  async openmyaccount(): Promise<void> {
    await expect(this.myaccount).toBeVisible();
    await this.myaccount.click();
  }

  async openregistration(): Promise<void> {
    await expect(this.register).toBeVisible();
    await this.register.click();
  }
}
