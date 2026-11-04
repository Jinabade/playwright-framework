
import { test, expect } from '../../fixtures/pageFixtures.js';
import { RandomDataUtil } from '../../utils/dataGenerator.js';
import { CustomerRegistration } from '../../pages/AccountPage.js';
import { Helper } from '../../utils/helper.js';

test('End-to-End Shopping Flow @master @end-to-end', async ({
  homePage,
  accountPage,
  productPage,
  cartPage
}) => {
  test.setTimeout(120_000);

  const customer: CustomerRegistration = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: RandomDataUtil.getEmail().replace('@', `-${Date.now()}@`),
    password: RandomDataUtil.getPassword(12)
  };

  const { productName, productQuantity } = Helper.getProductDetails();

  let productPrice = '';
  let productExTaxPrice = '';

  await test.step('1) Open the store homepage', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('2) Register a new customer', async () => {
    await homePage.openRegistration();

    expect(await accountPage.isRegistrationPageExists()).toBeTruthy();

    await accountPage.register(customer);

    expect(await accountPage.isAccountCreated()).toBeTruthy();
  });

  await test.step('3) Log out and return to the store', async () => {
    await accountPage.continueFromConfirmation();

    await accountPage.logout();

    expect(await accountPage.isLogoutPageExists()).toBeTruthy();

    await accountPage.continueAfterLogout();
  });

  await test.step('4) Log in with the newly created customer', async () => {
    await homePage.openLogin();

    await accountPage.login(customer.email, customer.password);

    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  await test.step('5) Search for the known product', async () => {
    await homePage.searchProduct(productName);

    await productPage.openFromSearchResults(productName);

    expect(await productPage.isProductPageExists(productName)).toBeTruthy();

    productPrice = await productPage.getProductPrice();
    productExTaxPrice = await productPage.getProductExTaxPrice();

    expect(productPrice.trim()).not.toBe('');
    expect(productExTaxPrice.trim()).not.toBe('');
  });

  await test.step('6) Add the product to the cart', async () => {
    await productPage.setQuantity(Number(productQuantity));

    await productPage.addToCart();

    expect(await productPage.isProductAddedToCart()).toBeTruthy();

    await cartPage.open();
  });

  await test.step('7) Verify the cart product, quantity, and price', async () => {
    const productRow = cartPage.getProductRow(productName);

    await expect(productRow).toBeVisible();

    const actualQuantity = await cartPage.getProductQuantity(productName);

    expect(Number(actualQuantity)).toBe(Number(productQuantity));

    const actualUnitPrice = await cartPage.getProductUnitPrice(productName);

    expect(actualUnitPrice).toBe(productPrice);

    const actualSubtotal = await cartPage.getCartSubtotal();

    expect(Helper.convertPriceToNumber(actualSubtotal)).toBeCloseTo(
      Helper.convertPriceToNumber(productExTaxPrice) *
        Number(productQuantity),
      2
    );

    const actualProductLineTotal = await cartPage.getProductLineTotal(
      productName
    );
    const actualCartTotal = await cartPage.getCartTotal();

    expect(actualCartTotal).toBe(actualProductLineTotal);
  });

  console.log('Completed the OpenCart end-to-end shopping flow.');
});
