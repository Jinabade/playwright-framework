
import { test, expect } from '@playwright/test';
import { cartService } from '../../api/endpoints/services/cartService.js';

test('Add MacBook and Get Cart Details API', async ({ playwright }) => {

    // Create one API context
    const apiContext = await playwright.request.newContext({
        baseURL: process.env.WEB_APP_URL
    });

    const cart = new cartService();

    // Step 1: Add MacBook
    const addResponse = await cart.addToCart(apiContext, '2');

    console.log('Add Cart Status:', addResponse.status());

    const addBody = await addResponse.json();

    console.log('Add Cart Response:', addBody);

    expect(addResponse.status()).toBe(200);
    expect(addBody.success).toContain('MacBook');

    // Step 2: Get Cart Details
    const cartResponse = await cart.getCartDetails(apiContext);

    console.log('Cart Status:', cartResponse.status());

    const cartBody = await cartResponse.text();

    console.log('Cart Details:', cartBody);

    expect(cartResponse.status()).toBe(200);
    expect(cartResponse.status()).toBe(200);

   expect(cartBody).toContain('MacBook');

  expect(cartBody).toContain('x 2');

   expect(cartBody).toContain('$1,202.00');

    // Close API context
    await apiContext.dispose();

});
test('Add to Cart with Zero Quantity', async ({ playwright }) => {

    const apiContext = await playwright.request.newContext({
        baseURL: process.env.WEB_APP_URL
    });

    const cart = new cartService();

    const response = await cart.addToCart(apiContext, '0');

    console.log('Zero Quantity Status:', response.status());

    const responseBody = await response.json();

    console.log('Zero Quantity Response:', responseBody);

    const cartResponse = await cart.getCartDetails(apiContext);

    const cartBody = await cartResponse.text();

console.log('Cart After Zero Quantity:', cartBody);

expect(response.status()).toBe(200);

expect(cartResponse.status()).toBe(200);

expect(cartBody).toContain('0 item(s)');

expect(cartBody).toContain('Your shopping cart is empty!');

    await apiContext.dispose();
});