export class Helper {
  static convertPriceToNumber(price: string): number {
    const cleaned = price.replace(/[^\d.]/g, '');
    return Number(cleaned);
  }

  static getProductDetails() {
    return {
      productName: 'MacBook',
      productQuantity: '1',
      totalPrice: '$592.00'
    };
  }

  static getLoginDetails() {
    return {
      email: 'afnanjinabade279@gmail.com',
      password: 'tiger123'
    };
  }
}