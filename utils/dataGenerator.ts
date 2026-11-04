
import { faker } from '@faker-js/faker'; // CHANGED: Use named import for Faker v10+

export class RandomDataUtil {
  // Person methods
  static getFirstName(): string {
    return faker.person.firstName();

    
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getFullName(): string {
    return faker.person.fullName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

 static getUsername(): string {
  return faker.internet.username();
}

  static getPassword(length: number = 10): string {
    return faker.internet.password({ length });
  }

  // Address methods
  static getCountry(): string {
    return faker.location.country();
  }

  static getState(): string {
    return faker.location.state();
  }

  static getCity(): string {
    return faker.location.city();
  }

  static getStreet(): string {
    return faker.location.street();
  }

  static getStreetAddress(): string {
    return faker.location.streetAddress();
  }

  static getZipCode(): string {
    return faker.location.zipCode();
  }

  static getLatitude(): string {
    // CHANGED: Convert number to string to match the return type
    return faker.location.latitude().toString();
  }

  static getLongitude(): string {
    // CHANGED: Convert number to string to match the return type
    return faker.location.longitude().toString();
  }

  // Date & Time methods
  static getCurrentDate(): string {
    // CHANGED: Return today's date instead of a random future date
    return new Date().toISOString().slice(0, 10);
  }

  static getRecentDate(days: number = 10): string {
    // CHANGED: Generate a date within the recent past
    return faker.date.recent({ days }).toISOString().slice(0, 10);
  }

  static getFutureDate(years: number = 1): string {
    return faker.date.future({ years }).toISOString().slice(0, 10);
  }

  static getPastDate(years: number = 1): string {
    return faker.date.past({ years }).toISOString().slice(0, 10);
  }

  // Commerce methods
  static getProductName(): string {
    return faker.commerce.productName();
  }

  static getProductDescription(): string {
    return faker.commerce.productDescription();
  }

  static getProductPrice(): string {
    return faker.commerce.price({ min: 1, max: 500, dec: 2 });
  }

  static getDepartment(): string {
    return faker.commerce.department();
  }

  static getImageUrl(): string {
    return faker.image.url();
  }

  static getNumber(): number {
    return faker.number.int({ min: 1, max: 999 });
  }

  // API Payload Generators
  static generateInvalidLoginPayload() {
    return {
      username: this.getUsername(),
      password: this.getPassword()
    };
  }

  static generateProductPayload() {
    return {
      title: this.getProductName(),
      price: Number(this.getProductPrice()),
      description: this.getProductDescription(),
      image: this.getImageUrl(),
      category: this.getProductName().toLowerCase()
    };
  }

  static generateUpdatedProductPayload() {
    const payload = this.generateProductPayload();

    // Existing behavior: Add "Updated " to the product title
    payload.title = 'Updated ' + payload.title;

    return payload;
  }

  static generateUserPayload() {
    return {
      email: this.getEmail(),
      username: this.getUsername(),
      password: this.getPassword(),
      name: {
        firstname: this.getFirstName(),
        lastname: this.getLastName()
      },
      address: {
        city: this.getCity(),
        street: this.getStreet(),
        number: this.getNumber(),
        zipcode: this.getZipCode(),
        geolocation: {
          lat: this.getLatitude(),
          long: this.getLongitude()
        }
      },
      phone: this.getPhoneNumber()
    };
  }

  static generateUserUpdatePayload() {
    const payload = this.generateUserPayload();

    // Existing behavior: Update username with a prefix
    payload.username = 'Updated-' + payload.username;

    return payload;
  }

  static generateCartPayload(userId: number) {
    return {
      userId,
      date: this.getCurrentDate(),
      products: [
        {
          // CHANGED: Use a numeric product ID instead of a product name
          productId: this.getNumber(),
          quantity: this.getNumber()
        }
      ]
    };
  }

  static generateUpdatedCartPayload(userId: number) {
    // Existing behavior: Return a newly generated cart payload
    const payload = this.generateCartPayload(userId);

    return payload;
  }
}