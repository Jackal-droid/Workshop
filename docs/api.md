# api.md

# BuildWise - REST API Specification

## Base URL

```text
/api
```

---

# Authentication

Authentication uses **JWT (JSON Web Tokens)**.

Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# API Groups

* Authentication
* Journeys
* Products
* Cart
* Wishlist
* Orders
* Users
* Admin

---

# 1. Authentication

---

## Register

**POST**

```http
/api/auth/register
```

**Public**

Request

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "message": "Registration successful"
}
```

---

## Login

**POST**

```http
/api/auth/login
```

**Public**

Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "name": "John Doe",
    "role": "user"
  }
}
```

---

## Get Current User

**GET**

```http
/api/auth/me
```

**Authenticated**

Returns logged-in user information.

---

# 2. Journeys

---

## Get All Journeys

**GET**

```http
/api/journeys
```

**Public**

Returns

* Coding Workspace
* Gaming Setup
* Home Office
* Photography Kit
* Student Starter Kit

---

## Get Journey Details

**GET**

```http
/api/journeys/<journey_id>
```

**Public**

Returns

* Journey information
* Questions
* Default products

---

## Generate Shopping Kit

**POST**

```http
/api/journeys/<journey_id>/generate
```

**Public**

Request Example

```json
{
  "budget": 80000,
  "purpose": "Programming",
  "experience": "Student",
  "monitor": true,
  "brand": "Any"
}
```

Response

```json
{
  "recommended_products": [],
  "estimated_total": 76400
}
```

> **Version 1:** The recommendation engine uses predefined rules and product mappings rather than AI.

---

# 3. Products

---

## Get All Products

**GET**

```http
/api/products
```

**Public**

Supports optional query parameters:

* category
* brand
* min_price
* max_price
* search

Example

```http
/api/products?category=Laptop
```

---

## Get Product Details

**GET**

```http
/api/products/<product_id>
```

**Public**

Returns

* Product details
* Specifications
* Similar products

---

## Get Alternative Products

**GET**

```http
/api/products/<product_id>/alternatives
```

**Public**

Returns products from the same category within a similar price range.

---

# 4. Cart

---

## Get Cart

**GET**

```http
/api/cart
```

**Authenticated**

Returns current user's cart.

---

## Add Product to Cart

**POST**

```http
/api/cart
```

**Authenticated**

Request

```json
{
  "product_id": 12,
  "quantity": 1
}
```

---

## Update Cart Item

**PUT**

```http
/api/cart/<cart_item_id>
```

**Authenticated**

Updates quantity.

---

## Remove Cart Item

**DELETE**

```http
/api/cart/<cart_item_id>
```

**Authenticated**

Removes item from cart.

---

## Clear Cart

**DELETE**

```http
/api/cart
```

**Authenticated**

Deletes all cart items.

---

# 5. Wishlist

---

## Get Wishlist

**GET**

```http
/api/wishlist
```

**Authenticated**

---

## Add to Wishlist

**POST**

```http
/api/wishlist
```

**Authenticated**

---

## Remove from Wishlist

**DELETE**

```http
/api/wishlist/<wishlist_item_id>
```

**Authenticated**

---

# 6. Orders

---

## Checkout

**POST**

```http
/api/orders
```

**Authenticated**

Request

```json
{
  "shipping_address": "123 Main Street"
}
```

Creates an order from the current cart.

---

## Get My Orders

**GET**

```http
/api/orders
```

**Authenticated**

Returns all orders for the logged-in user.

---

## Get Order Details

**GET**

```http
/api/orders/<order_id>
```

**Authenticated**

Returns

* Products
* Quantities
* Prices
* Status
* Shipping Address

---

# 7. User Profile

---

## Get Profile

**GET**

```http
/api/users/profile
```

**Authenticated**

---

## Update Profile

**PUT**

```http
/api/users/profile
```

**Authenticated**

Allows updating:

* Name
* Email

---

# 8. Admin APIs

> **Access:** Admin only

---

## Dashboard Statistics

**GET**

```http
/api/admin/dashboard
```

Returns

* Total Users
* Total Products
* Total Orders
* Total Revenue (mock)

---

## Products

### Get All Products

```http
GET /api/admin/products
```

---

### Create Product

```http
POST /api/admin/products
```

---

### Update Product

```http
PUT /api/admin/products/<id>
```

---

### Delete Product

```http
DELETE /api/admin/products/<id>
```

---

## Categories

### Get Categories

```http
GET /api/admin/categories
```

---

### Create Category

```http
POST /api/admin/categories
```

---

### Update Category

```http
PUT /api/admin/categories/<id>
```

---

### Delete Category

```http
DELETE /api/admin/categories/<id>
```

---

## Journeys

### Get All Journeys

```http
GET /api/admin/journeys
```

---

### Create Journey

```http
POST /api/admin/journeys
```

---

### Update Journey

```http
PUT /api/admin/journeys/<id>
```

---

### Delete Journey

```http
DELETE /api/admin/journeys/<id>
```

---

## Orders

### Get All Orders

```http
GET /api/admin/orders
```

---

### Update Order Status

```http
PUT /api/admin/orders/<id>/status
```

Allows updating order status:

* Pending
* Confirmed
* Shipped
* Delivered

---

# Error Response Format

All endpoints return errors in a consistent format.

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

# Success Response Format

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

---

# Version 1 Notes

* JWT protects all authenticated endpoints.
* Mock checkout is used instead of integrating a real payment gateway.
* Journey recommendations are generated using predefined rules and `JourneyProducts` mappings.
* Product replacement is handled through the alternatives endpoint using category and price similarity.
* The API is designed to be consumed by the React frontend via Axios with a clear separation between public and protected routes.
