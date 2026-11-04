# Utility Files – Prompts

**Target Folder:** `utils/`

## Common Requirements

For every prompt below:

- Create the file in the existing `utils/` folder using TypeScript.
- Use only the existing dependencies already present in `package.json`:
  - `@faker-js/faker`
  - `mysql2`
  - `dotenv`
  - `csv-parse`
  - `xlsx`
- Do not add any other methods, classes, interfaces, types, constants, dependencies, validation, logging, or functionality beyond what the prompt specifies.
- Do not change the class names, method names, parameter names, return structures, values, or behavior specified below.
- Use clean, beginner-friendly TypeScript suitable for a Playwright automation framework.
- Do not create any additional files.
- Return only the complete code for the requested file.

---

# 1. Create `helper.ts`

## Prompt

Create or update a file named `helper.ts` in the existing folder `utils/`.

Create and export a class named `Helper` with exactly these static methods:

### 1.1 `convertPriceToNumber(price: string): number`

- Remove all characters from the input except digits and the decimal point.
- Convert the resulting value to a number.
- Return the number.

### 1.2 `getProductDetails()`

Return exactly this object structure:

- `productName: "MacBook"`
- `productQuantity: "1"`
- `totalPrice: "$592.00"`

### 1.3 `getLoginDetails()`

Return exactly this object structure:

- `email: "afnanjinabade279@gmail.com"`
- `password: "tiger123"`

## Expected Result

A `utils/helper.ts` file exporting the `Helper` class with the three specified static methods, used for price and test data utilities.

---

# 2. Create `dataGenerator.ts`

## Prompt

Create or update a file named `dataGenerator.ts` in the existing folder `utils/`.

Use the existing `@faker-js/faker` dependency.

Import Faker exactly from:

`@faker-js/faker`

Create and export a class named `RandomDataUtil`.

## 2.1 Person

Implement exactly these static methods:

- `getFirstName(): string`
- `getLastName(): string`
- `getFullName(): string`
- `getEmail(): string`
- `getPhoneNumber(): string`
- `getUsername(): string`
- `getPassword(length: number = 10): string`
- `getCountry(): string`
- `getState(): string`
- `getCity(): string`
- `getStreet(): string`
- `getStreetAddress(): string`
- `getZipCode(): string`
- `getLatitude(): string`
- `getLongitude(): string`

Use the corresponding Faker person, internet, and location APIs.

## 2.2 Date & Time

Implement exactly these static methods:

- `getCurrentDate(): string`
- `getRecentDate(days: number = 10): string`
- `getFutureDate(years: number = 1): string`
- `getPastDate(years: number = 1): string`

Use ISO date formatting so the returned value is in `YYYY-MM-DD` format.

## 2.3 Commerce

Implement exactly these static methods:

- `getProductName(): string`
- `getProductDescription(): string`
- `getProductPrice(): string`
- `getDepartment(): string`
- `getImageUrl(): string`
- `getNumber(): number`

Requirements:

- For product price, generate a Faker commerce price between 1 and 500 with 2 decimal places.
- For `getNumber()`, generate a random integer between 1 and 999.

## 2.4 API Payload Generators

**Reference Link:**  
https://documenter.getpostman.com/view/4790112/2sBY4WnGCZ

Implement exactly these static methods:

- `generateInvalidLoginPayload()`
- `generateProductPayload()`
- `generateUpdatedProductPayload()`
- `generateUserPayload()`
- `generateUserUpdatePayload()`
- `generateCartPayload(userId: number)`
- `generateUpdatedCartPayload(userId: number)`

### Required Return Structures

#### `generateInvalidLoginPayload()`

Must return:

- `username` generated using `getUsername()`
- `password` generated using `getPassword()`

#### `generateProductPayload()`

Must return:

- `title`
- `price` as a number
- `description`
- `image`
- `category` in lowercase

#### `generateUpdatedProductPayload()`

Must return the same product payload structure, but the title must start with `Updated`.

#### `generateUserPayload()`

Must return this structure:

- `email`
- `username`
- `password`
- `name`
  - `firstname`
  - `lastname`
- `address`
  - `city`
  - `street`
  - `number`
  - `zipcode`
  - `geolocation`
    - `lat`
    - `long`
- `phone`

#### `generateUserUpdatePayload()`

Must return the same user structure, with the username prefixed with `Updated-`.

#### `generateCartPayload(userId: number)` and `generateUpdatedCartPayload(userId: number)`

Must return:

- `userId`
- `date` in `YYYY-MM-DD` format
- `products`
  - `productId`
  - `quantity`

Use the existing methods within `RandomDataUtil` wherever applicable instead of duplicating Faker logic.

## Expected Result

A `utils/dataGenerator.ts` file exporting the `RandomDataUtil` class that generates random person, date, commerce, and API payload data for use in tests.

---

# 3. Create `dbClient.ts`

## Prompt

Create a new file named `dbClient.ts` in the existing folder `utils/`.

Use the existing `mysql2` and `dotenv` dependencies.

### Imports

Import:

- `mysql` from `'mysql2/promise'`
- `dotenv` from `'dotenv'`

Call:

`dotenv.config()`

### Function

Create and export exactly one asynchronous function:

`executeQuery(sql: string, params?: any[])`

The function must:

- Create a MySQL connection using `mysql.createConnection()`.
- Read the following connection details from environment variables:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
- Convert `DB_PORT` to a number when it is available. If it is not available, use `undefined`.
- Execute the SQL statement using `connection.execute(sql, params)`.
- Store the returned result.
- Close the database connection using `await connection.end()`.
- Return the query result.
- Use a single database connection for each `executeQuery()` call.
- Do not implement connection pooling.

### Restrictions

Do not add:

- Transactions
- Retry logic
- Logging
- Custom error handling
- Validation
- Classes
- Interfaces
- Types
- Additional functions
- Additional database functionality

## Expected Result

A `utils/dbClient.ts` file exporting an `executeQuery()` function that runs a parameterized SQL query against the configured MySQL database and returns the result.

---

# 4. Create `DataReader.ts`

## Prompt

Create a new file named `DataReader.ts` in the existing folder `utils/`.

Use the existing dependencies:

- `fs`
- `csv-parse`
- `xlsx`

Create and export a class named `DataProvider`.

Implement exactly these three static methods:

## 4.1 `readJson(filePath: string)`

- Read the JSON file using `fs.readFileSync(filePath, 'utf8')`.
- Parse the file contents using `JSON.parse()`.
- Return the parsed data.

## 4.2 `readCsv(filePath: string)`

- Read the CSV file content.
- Parse the content using `csv-parse` options:
  - `columns: true`
  - `skip_empty_lines: true`
- Return the parsed data.

## 4.3 `read