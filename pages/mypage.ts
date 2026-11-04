
import { Page, Locator, expect } from '@playwright/test';
import { CustomerRegistration } from '../../pages/mycustomerreg';
export class mypage {
  private readonly firstname: Locator;
  private readonly lastname: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly regheading: Locator;
  private readonly privacyPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly accountcreatedheading: Locator;
  private readonly accountDropdown: Locator;
  private readonly lnkLogout: Locator;

  // private readonly login:Locator;
   private readonly clk:Locator;
  private readonly submitlogin:Locator



  constructor(page: Page) {
    this.regheading = page.getByRole('heading', {
      name: 'Register Account'
    });

    this.firstname = page.getByPlaceholder('First Name');
    this.lastname = page.getByRole('textbox', {
      name: 'Last Name'
    });
    this.email = page.getByPlaceholder('E-Mail');
    this.password = page.getByLabel('Password', {
      exact: true
    });


    this.accountcreatedheading = page.getByRole('heading', {
      name: 'Your Account Has Been Created!'
    })

  this.privacyPolicy = page.locator('input[name="agree"]');

    this.btnContinue = page.getByRole('button', {
      name: 'Continue',
      exact: true
    });


       this.accountDropdown = page.locator('ul.dropdown-menu.show');

    this.lnkLogout = this.accountDropdown.getByRole('link', {
      name: 'Logout',
      exact: true
    });

    // this.login=page.locator("ul[data-popper-placement=bottom-start]");
       
     this.clk=page.getByRole('link', { name: 'Login',exact: true
});


    this.submitlogin=page.getByRole('button', { name: 'Login',exact: true});


}

   async verifyregistrationpage(): Promise<void> {
    await expect(this.regheading).toBeVisible();


   }


  async fillregistrationform(
    customer: CustomerRegistration
  ): Promise<void> {
    await this.firstname.fill(customer.firstName);
    await this.lastname.fill(customer.lastName);
    await this.email.fill(customer.email);
    await this.password.fill(customer.password);
  }

  async submitregistrationform(): Promise<void> {
    await this.privacyPolicy.check();
    await expect(this.btnContinue).toBeEnabled();
    await this.btnContinue.click();
  }

  async accountverify(){

    await expect(this.accountcreatedheading).toBeVisible();
  }

  
  async logoutbtaccount(){
    await expect(this.lnkLogout).toBeVisible();
    await this.lnkLogout.click();

  }

    async loginpage(): Promise<void> {
    await expect(this.clk).toBeVisible();
    await this.clk.click();
   }



   async logindata(
    customer: CustomerRegistration
  ): Promise<void> {
    await this.email.fill(customer.email);
    await this.password.fill(customer.password);
  }


  async submitloginform(): Promise<void> {
    await expect(this.submitlogin).toBeEnabled();
    await this.submitlogin.click();
  } 
}
