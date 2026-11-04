
import { faker } from '@faker-js/faker';

export class randomdata {
  getFirstName(): string {
    return faker.person.firstName();
  }

  getLastName(): string {
    return faker.person.lastName();
  }

  getEmail(): string {
    return faker.internet.email();
  }

  getPassword(): string {
    return faker.internet.password();
  }
}