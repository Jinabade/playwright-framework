
import { test, expect } from '@playwright/test';

import { shopingcard } from '../../pages/mycard.js';
import { MyHomePage } from '../../pages/myhomepage.js';
import { mypage } from '../../pages/mypage.js';
import { CustomerRegistration } from '../../pages/mycustomerreg.js';
import { randomdata } from '../../utils/fakerdatagenerator.js';
import { searchpage } from '../../pages/myproductpage.js';

import productData from '../../testdata/productData.json' with { type: 'json' };

test('Verify OpenCart customer registration and shopping flow @e2e', async ({ page }) => {

    const myhomepage = new MyHomePage(page);
    const registrationpage = new mypage(page);
    const fakerdata = new randomdata();
    const myproductpage = new searchpage(page);
    const mycard = new shopingcard(page);

    // Step 1: Open Home Page
    await myhomepage.openhomepage();
    await myhomepage.verifheading();

    // Step 2: Registration
    await myhomepage.openmyaccount();
    await myhomepage.openregistration();
    await registrationpage.verifyregistrationpage();

    const firstName = fakerdata.getFirstName();
    const lastName = fakerdata.getLastName();
    const email = fakerdata.getEmail();
    const password = fakerdata.getPassword();

    const customerreg = new CustomerRegistration(
        firstName,
        lastName,
        email,
        password
    );

    await registrationpage.fillregistrationform(customerreg);
    await registrationpage.submitregistrationform();
    await registrationpage.accountverify();

    // Step 3: Logout
    await myhomepage.openmyaccount();
    await registrationpage.logoutbtaccount();

    // Step 4: Login
    await registrationpage.loginpage();
    await registrationpage.logindata(customerreg);
    await registrationpage.submitloginform();

    await expect(page).toHaveURL(/route=account\/account/);
    await expect(page.locator('h1')).toHaveText('My Account');

    // Step 5: Search Product
    const productname = productData.productname;

    await myproductpage.searchproduct(productname);
    await myproductpage.searchproductverify(productname);

    // Step 6: Add Product to Cart
    await myproductpage.addproducttocart();

    // Step 7: Open Shopping Cart
    await myproductpage.viewcardpage();

    // Step 8: Verify Cart
    await mycard.verifycartheading();
    await mycard.verifyProductname();
    await mycard.verifyproductprice();

});