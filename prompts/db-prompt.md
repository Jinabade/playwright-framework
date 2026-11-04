# OpenCart UI + Admin + MySQL End-to-End Test

## Objective

Implement one independent end-to-end Playwright test that registers a new customer through the OpenCart frontend and verifies the same customer's details in both the Admin Portal and MySQL database.

Follow all framework conventions defined in `playwright-mcp-context.md`.

## Application Details

**Frontend URL:** `http://localhost/opencart/upload/`

**Admin Portal URL:** `http://localhost/opencart/upload/admin/index.php`

**MySQL Configuration:**
- Host: `localhost`
- Port: `3306`
- Database: `openshop`
- Username: `root`
- Password: Empty string
- Table: `oc_customer`

Use the existing project configuration and utilities wherever available. Use the administrator credentials configured for the test environment. Do not hardcode unknown administrator credentials.

## Common Implementation Requirements

- Inspect `playwright-mcp-context.md` and the existing project structure before creating or modifying files.
- Follow the existing Page Object Model (POM), fixtures, naming conventions, and test organization.
- Use Playwright MCP to inspect and interact with the frontend and Admin Portal before finalizing locators.
- Verify locators through MCP and prefer `getByRole`, `getByLabel`, `getByPlaceholder`, and existing test IDs where appropriate.
- Avoid brittle XPath, unnecessarily complex CSS selectors, and fixed time-based waits.
- Reuse existing utilities and dependencies. Use `@faker-js/faker` for dynamically generated customer data if it is already available.
- Use the existing `mysql2` dependency and database utility conventions if available.
- Do not add dependencies unless absolutely necessary and explicitly permitted by the framework instructions.
- Keep the implementation readable, maintainable, and beginner-friendly.
- Do not invent existing file paths, methods, configuration keys, selectors, or environment variable names. Inspect the project first.
- Create one independent end-to-end test covering all three validation layers.
- Do not skip any validation layer.

## Step 1: Register a Customer Through the Frontend

1. Navigate to the OpenCart frontend URL.
2. Open **My Account → Register**.
3. Verify that the registration page is displayed.
4. Generate unique customer data for every test execution:
   - First Name
   - Last Name
   - Unique Email Address
   - Telephone
   - Password
   - Password Confirmation
5. Use a unique email address, preferably generated with Faker and a unique suffix, to prevent collisions between test runs.
6. Fill in all mandatory registration fields using the verified locators.
7. Accept the Privacy Policy.
8. Submit the registration form.
9. Verify that registration succeeds.
10. Verify the account-created confirmation, such as **"Your Account Has Been Created!"**.
11. Preserve the generated customer data in test variables so that the same values can be used for Admin Portal and MySQL validation.

**Assertions:**
- Registration page is visible.
- Required fields accept the generated values.
- Privacy Policy is accepted.
- Registration succeeds.
- The account-created confirmation is visible.

## Step 2: Verify the Customer in the Admin Portal

1. Navigate to the configured Admin Portal URL.
2. Log in using administrator credentials provided by the existing test environment configuration.
3. Verify that the administrator login succeeds.
4. Navigate to the Customers section using the actual UI flow discovered through Playwright MCP.
5. Open the customer listing.
6. Search for the newly registered customer using the unique email address.
7. Verify that the matching customer record is present.
8. Open the customer record or details page when the interface supports it.
9. Validate the following fields against the generated customer data:
   - First Name
   - Last Name
   - Email
   - Customer Status

**Assertions:**
- Admin login succeeds.
- The customer listing is accessible.
- Searching by the unique email returns the expected customer.
- First Name matches the generated value.
- Last Name matches the generated value.
- Email matches the generated value.
- Customer Status matches the expected application behavior.

Do not assume a customer status without inspecting the application's behavior and configuration. Determine the expected status from the actual registration and Admin Portal behavior.

## Step 3: Verify the Customer in MySQL

1. Use the existing database utility if one is already available.
2. Connect to MySQL using the configured database settings:
   - Host: `localhost`
   - Port: `3306`
   - Database: `openshop`
   - Username: `root`
   - Password: Empty string
3. Query the `oc_customer` table using the unique email address generated in Step 1.
4. Verify that exactly one matching customer record exists.
5. Validate the following database fields:
   - `firstname` matches the generated First Name.
   - `lastname` matches the generated Last Name.
   - `email` matches the generated Email.
   - `status` matches the expected registration status.
   - `date_added` exists and contains a valid value when the column is available.
6. Use parameterized SQL rather than concatenating the email address into the SQL statement.
7. Ensure the database connection is closed reliably, even when a query or assertion fails.

**Example query pattern:**

```sql
SELECT customer_id, firstname, lastname, email, status, date_added
FROM oc_customer
WHERE email = ?;
```

Use the query only after confirming the relevant table and column names in the actual database schema. If `date_added` is unavailable, handle it according to the existing framework conventions rather than failing with an unexplained SQL error.

**Assertions:**
- The database connection succeeds.
- The query returns exactly one matching record.
- `firstname` matches the generated First Name.
- `lastname` matches the generated Last Name.
- `email` matches the generated Email.
- `status` matches the expected application behavior.
- `date_added` is valid when the column exists.

## Step 4: Test Structure and Resource Cleanup

- Implement one independent test that performs frontend registration, Admin Portal verification, and MySQL verification in that order.
- Use the existing POM architecture for UI interactions.
- Keep test data consistent across all three layers.
- Use clear, descriptive assertion messages that identify the failing layer and field.
- Use appropriate Playwright auto-waiting and explicit state-based waits.
- Do not use `page.waitForTimeout()` as a substitute for proper waiting.
- Close the MySQL connection in a `finally` block or through the existing database utility's guaranteed cleanup mechanism.
- Use the project's existing browser and database fixtures where available.
- Do not create unnecessary duplicate helpers, classes, interfaces, or configuration files.
- Do not log passwords or other credentials.
- Do not report a successful test unless all three validation layers have passed.

## Expected Result

The test must pass only when the same newly generated customer:

1. Registers successfully through the frontend.
2. Appears in the Admin Portal with the expected First Name, Last Name, Email, and Status.
3. Exists exactly once in the `oc_customer` table with the expected database values.

If any layer contains missing or mismatched customer data, the test must fail with a clear assertion message identifying the affected layer and field.

## Success Criteria

- Playwright MCP was used to inspect the actual frontend and Admin Portal workflows.
- All important UI locators were verified before use.
- Customer data is dynamically generated and unique per execution.
- The same generated customer data is validated across all three layers.
- The test follows the existing POM and framework conventions.
- SQL queries use parameterized inputs.
- Database resources are cleaned up reliably.
- The test executes successfully against the configured local environment.
- No required validation is skipped or replaced with a weak assertion.
- Final reporting accurately states which checks passed and which failed.