
import { Page, Locator, expect } from '@playwright/test';

export type CustomerRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class AccountPage {
  private readonly page: Page;
  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtRegistrationEmail: Locator;
  private readonly txtRegistrationPassword: Locator;
  private readonly chkPrivacyPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly linkContinue: Locator;
  private readonly txtLoginEmail: Locator;
  private readonly txtLoginPassword: Locator;
  private readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;

    this.txtFirstName = page.getByPlaceholder('First Name');
    this.txtLastName = page.getByPlaceholder('Last Name');
    this.txtRegistrationEmail = page.getByPlaceholder('E-Mail');
    this.txtRegistrationPassword = page.getByPlaceholder('Password');

    this.chkPrivacyPolicy = page.locator('input[name="agree"]');

    this.btnContinue = page.getByRole('button', {
      name: 'Continue',
      exact: true
    });

    this.linkContinue = page.getByRole('link', {
      name: 'Continue',
      exact: true
    });

    this.txtLoginEmail = page.getByRole('textbox', {
      name: 'E-Mail Address'
    });

    this.txtLoginPassword = page.getByRole('textbox', {
      name: 'Password'
    });

    this.btnLogin = page.getByRole('button', {
      name: 'Login',
      exact: true
    });
  }

  /**
   * Verifies that the registration page is displayed.
   */
  async isRegistrationPageExists(): Promise<boolean> {
    return this.page.getByRole('heading', {
      name: 'Register Account'
    }).isVisible();
  }

  /**
   * Registers a new customer.
   */
  async register(customer: CustomerRegistration): Promise<void> {
    await expect(this.txtFirstName).toBeVisible();
    await this.txtFirstName.fill(customer.firstName);

    await this.txtLastName.fill(customer.lastName);
    await this.txtRegistrationEmail.fill(customer.email);
    await this.txtRegistrationPassword.fill(customer.password);

    await this.chkPrivacyPolicy.check();

    await this.btnContinue.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Your Account Has Been Created!',
        exact: true
      })
    ).toBeVisible({ timeout: 30_000 });
  }

  /**
   * Verifies the account-created confirmation page.
   */
  async isAccountCreated(): Promise<boolean> {
    return this.page.getByRole('heading', {
      name: 'Your Account Has Been Created!',
      exact: true
    }).isVisible();
  }

  /**
   * Continues from the account-created confirmation page.
   */
  async continueFromConfirmation(): Promise<void> {
    await expect(this.linkContinue).toBeVisible();
    await this.linkContinue.click();
  }

  /**
   * Verifies that the account dashboard is displayed.
   */
  async isMyAccountPageExists(): Promise<boolean> {
    return this.page.getByRole('heading', {
      name: 'My Account',
      exact: true,
      level: 1
    }).isVisible();
  }

  /**
   * Logs in with customer credentials.
   */
  async login(email: string, password: string): Promise<void> {
    await expect(this.txtLoginEmail).toBeVisible();

    await this.txtLoginEmail.fill(email);
    await this.txtLoginPassword.fill(password);

    await Promise.all([
      this.page.waitForURL(
        url => url.searchParams.get('route') === 'account/account',
        { timeout: 15_000 }
      ),
      this.btnLogin.click()
    ]);

    await expect(
      this.page.getByRole('heading', {
        name: 'My Account',
        exact: true,
        level: 1
      })
    ).toBeVisible();
  }

  /**
   * Logs out through the account menu.
   */
  async logout(): Promise<void> {
    const accountButton = this.page.getByRole('button', {
      name: 'My Account'
    });

    await accountButton.click();

    const logoutLink = this.page.locator('#top').getByRole('link', {
      name: 'Logout',
      exact: true
    });

    await expect(logoutLink).toBeVisible();
    await logoutLink.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Account Logout'
      })
    ).toBeVisible();
  }

  /**
   * Verifies the logout confirmation page.
   */
  async isLogoutPageExists(): Promise<boolean> {
    return this.page.getByRole('heading', {
      name: 'Account Logout'
    }).isVisible();
  }

  /**
   * Continues from the logout confirmation page.
   */
  async continueAfterLogout(): Promise<void> {
    await expect(this.linkContinue).toBeVisible();
    await this.linkContinue.click();
  }
}