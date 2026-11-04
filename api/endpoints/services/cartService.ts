import 'dotenv/config';
import { APIRequestContext } from '@playwright/test';
import { routes } from '../routes.js';

export class cartService {

    async addToCart(request: APIRequestContext, quantity: string) {

        const response = await request.post(
            `${process.env.WEB_APP_URL}${routes.addToCart}`,
            {
                form: {
                    product_id: '43',
                    quantity: quantity
                }
            }
        );

        return response;
    }

    async getCartDetails(request: APIRequestContext) {

    const response = await request.get(
        `${process.env.WEB_APP_URL}index.php?route=common/cart.info&language=en-gb`
    );

    return response;
}
}