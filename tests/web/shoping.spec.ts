
import { test, expect } from '@playwright/test';

import { shopingcard } from '../../pages/mycard.js';
import { MyHomePage } from '../../pages/myhomepage.js';
import { mypage } from '../../pages/mypage.js';
import { CustomerRegistration } from '../../pages/mycustomerreg.js';
import { randomdata } from '../../utils/fakerdatagenerator.js';
import { searchpage } from '../../pages/myproductpage.js';

import productData from '../../testdata/productData.json';

test('Verify OpenCart customer registration', async ({ page }) => {
  const myhomepage = new MyHomePage(page);
  const registrationpage = new mypage(page);
  const fakerdata = new randomdata();
   const myproductpage = new searchpage(page);  

   const mycard=new shopingcard(page);

  // Step 1: Open homepage
  await myhomepage.openhomepage();
  await myhomepage.verifheading();

  // Step 2: Open registration page
  await myhomepage.openmyaccount();
  await myhomepage.openregistration();

  // Step 3: Verify registration page
  await registrationpage.verifyregistrationpage();

  // Step 4: Generate customer data
  const firstName = fakerdata.getFirstName();
  const lastName = fakerdata.getLastName();
  const email = fakerdata.getEmail();
  const password = fakerdata.getPassword();

  // Step 5: Create CustomerRegistration object
  const customerreg = new CustomerRegistration(
    firstName,
    lastName,
    email,
    password
  );

  // Step 6: Fill registration form
  await registrationpage.fillregistrationform(customerreg);

  // Step 7: Submit registration form
  await registrationpage.submitregistrationform();

  // Step 8: Verify successful registration
    await registrationpage.accountverify();

  // Step 9: Click on the MY Account
 
   myhomepage.openmyaccount();

  //step 10: Logout from the accou

  await registrationpage.logoutbtaccount();

//  step 11: verify login page is displayed
  await registrationpage.loginpage();

  //step 12: fill login data
  await registrationpage.logindata(customerreg);

 
  
  // Step 13: Submit login form
  await registrationpage.submitloginform();

  // Step 14: Verify login successful
  await expect(page).toHaveURL(/route=account\/account/);

  // Sirf page ka main H1 verify karo, footer ka H5 nahi
  await expect(
    page.locator('h1')
  ).toHaveText('My Account');

  console.log('Login successful');

  // Step 15: Search product AFTER login verification
  const productname = productData.productname;

  await myproductpage.searchproduct(productname);

  // Step 16: Verify search result heading
  await expect(
    page.locator('h1')
  ).toHaveText(`Search - ${productname}`);

  console.log(`Search successful: ${productname}`);

// Step 17: Verify product is visible in search results
  await myproductpage.searchproductverify(productname);

  // step 18: Add product to cart

  await myproductpage.addproducttocart();

// view card page 
await myproductpage.viewcardpage();

 // verify product 
 mycard.verifyProductname();
mycard.verifyproductprice();

 await page.waitForTimeout(5000);
})