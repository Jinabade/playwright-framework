FakeStore REST API – API Test Prompts

Base URL: https://fakestoreapi.com

COMMON REQUIREMENTS

- Create API tests using TypeScript and Playwright.
- Follow the existing project and framework conventions.
- Use the existing request fixture or APIRequestContext.
- Use existing Routes constants. Do not invent route names.
- Validate HTTP status codes, response structure, and business fields.
- Use meaningful assertion messages.
- Avoid weak assertions.
- Reuse response data in workflows.
- Keep independent tests independent.
- For CRUD workflows, create deterministic test data and capture generated IDs.
- Validate the API contract without assuming behavior that is not guaranteed.

AUTHENTICATION

1. Successful Login
- Use AUTH_LOGIN with valid credentials.
- Send a POST request.
- Verify status 201.
- Verify the response contains a non-empty token.

2. Invalid Login
- Use AUTH_LOGIN with invalid credentials.
- Verify status 401.
- Verify the error message is "username or password is incorrect".

PRODUCTS

3. Get All Products
- Use GET_ALL_PRODUCTS.
- Verify status 200.
- Verify the response is a non-empty array.
- Validate product fields: id, title, price, category, and image.

4. Get Product by ID
- Use GET_PRODUCT_BY_ID.
- Replace {id} with a valid product ID.
- Verify status 200.
- Verify the returned ID matches the requested ID.
- Validate the required product fields.

5. Get Products with Limit
- Use GET_PRODUCTS_WITH_LIMIT.
- Verify status 200.
- Verify the response is an array.
- Verify the number of products matches the requested limit.

6. Get Products Sorted Ascending
- Use the appropriate existing route.
- Verify status 200.
- Verify product IDs are in ascending order.

7. Get Products Sorted Descending
- Use the appropriate existing route.
- Verify status 200.
- Verify product IDs are in descending order.

8. Get All Categories
- Use GET_ALL_CATEGORIES.
- Verify status 200.
- Verify the response is a non-empty array.

9. Get Products by Category
- Use GET_PRODUCTS_BY_CATEGORY.
- Replace {category} with a valid category, such as electronics.
- Verify status 200.
- Verify the response is an array.
- Verify every returned product belongs to the requested category.

10. Create Product
- Use the existing product creation route.
- Send a POST request with valid product data.
- Verify status 201.
- Verify the response contains a generated ID.
- Verify the submitted product fields are returned as expected.

11. Update Product
- Use the existing product update route.
- Send a PUT request using an existing product ID.
- Verify status 200.
- Verify the updated values and product ID.

12. Delete Product
- Use the existing product deletion route.
- Send a DELETE request using a valid product ID.
- Verify status 200.
- Validate the response body when the API contract provides one.

USERS

13. Get All Users
- Use GET_ALL_USERS.
- Verify status 200.
- Verify the response is a non-empty array.

14. Get User by ID
- Use GET_USER_BY_ID.
- Replace {id} with a valid user ID.
- Verify status 200.
- Verify the returned ID matches the requested ID.

15. Get Users with Limit
- Use the existing users limit route.
- Verify status 200.
- Verify the response is an array.
- Verify the number of users matches the requested limit.

16. Get Users Sorted
- Test ascending and descending order.
- Verify status 200.
- Verify user IDs follow the requested sorting order.

17. Create User
- Use the existing user creation route.
- Send a POST request with valid user data.
- Verify status 201.
- Verify the response contains an ID and expected user information.

18. Update User
- Use the existing user update route.
- Send a PUT request with an existing user ID.
- Verify status 200.
- Verify the updated values.

19. Delete User
- Use the existing user deletion route.
- Send a DELETE request using a valid user ID.
- Verify status 200.
- Validate the response body where applicable.

CARTS

20. Get All Carts
- Use the existing all-carts route.
- Verify status 200.
- Verify the response is a non-empty array.

21. Get Cart by ID
- Use the existing cart-by-ID route.
- Replace {id} with a valid cart ID.
- Verify status 200.
- Verify the returned cart ID matches the requested ID.

22. Get Carts by Date Range
- Use valid start and end dates.
- Verify status 200.
- Verify the response is an array.
- Validate the returned dates against the requested range according to the response format.

23. Get User Cart
- Use a valid user ID.
- Verify status 200 where applicable.
- Verify returned carts belong to the requested user.

24. Get Carts with Limit
- Use the existing carts limit route.
- Verify status 200.
- Verify the response is an array.
- Verify the number of carts matches the requested limit.

25. Get Carts Sorted
- Test ascending and descending order.
- Verify status 200.
- Verify cart IDs follow the requested sorting order.

26. Create Cart
- Send a POST request with a valid user ID and product details.
- Verify status 201.
- Verify the response contains a cart ID.
- Verify the expected user and product information.

27. Update Cart
- Send a PUT request using an existing cart ID.
- Update a product quantity.
- Verify status 200.
- Verify the updated values in the response.

28. Delete Cart
- Send a DELETE request using a valid cart ID.
- Verify status 200.
- Validate the response body where applicable.

JSON SCHEMA VALIDATION

29. Validate Product Response Schema
- Use GET_PRODUCT_BY_ID.
- Verify status 200.
- Validate the product response structure and required field types.

30. Validate User Response Schema
- Use GET_USER_BY_ID.
- Verify status 200.
- Validate the user response structure and required field types.

31. Validate Cart Response Schema
- Use the existing cart-by-ID route.
- Verify status 200.
- Validate the cart response structure and required field types.

END-TO-END API WORKFLOWS

32. Product CRUD Workflow
- Create a product and verify status 201.
- Capture the generated product ID.
- Update the same product and verify status 200.
- Verify the updated product values.
- Delete the same product using the captured ID.
- Verify status 200.

33. User CRUD Workflow
- Create a user and verify status 201.
- Capture the generated user ID.
- Update the same user and verify status 200.
- Verify the updated user values.
- Delete the same user using the captured ID.
- Verify status 200.

34. Cart CRUD Workflow
- Create a cart and verify status 201.
- Capture the generated cart ID.
- Verify the expected user and product information.
- Update the same cart and verify status 200.
- Verify the updated product quantity.
- Delete the same cart using the captured ID.
- Verify status 200.

FINAL SUCCESS CRITERIA

- Use TypeScript and Playwright API testing.
- Follow the existing framework conventions.
- Reuse existing Routes constants and fixtures.
- Validate status codes and response content.
- Use strong, meaningful assertions.
- Provide useful assertion failure messages.
- Avoid duplicate setup when existing fixtures are available.
- Keep independent tests isolated.
- Chain responses only when required by a workflow.
- Keep the implementation simple, readable, and beginner-friendly.
- Do not invent routes, methods, or framework conventions that do not exist in the project.