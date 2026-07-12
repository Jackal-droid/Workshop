# security.md

# BuildWise - Security Design (Version 1)

## Purpose

This document defines the security approach for BuildWise. The goal is to implement practical security measures appropriate for a workshop-scale full-stack application while following good development practices.

---

# Authentication

## Method

JWT (JSON Web Tokens)

After successful login, the backend generates a JWT token.

The frontend stores the token and sends it with every protected request.

Example

```http
Authorization: Bearer <JWT_TOKEN>
```

Protected routes cannot be accessed without a valid token.

---

# Password Security

Passwords are **never stored in plain text**.

Use Werkzeug's password hashing functions.

```python
generate_password_hash(password)
check_password_hash(hash, password)
```

Only the hashed password is stored in the database.

---

# Authorization

Two roles are supported.

## User

Can

* View products
* Browse journeys
* Generate shopping kits
* Manage cart
* Place orders
* View order history
* Update profile

---

## Admin

Can

* Manage products
* Manage categories
* Manage journeys
* View all orders
* Update order status
* View dashboard statistics
* Manage users (optional)

Every admin endpoint validates both:

* Valid JWT
* Admin role

---

# Input Validation

All incoming data should be validated before database operations.

Examples

Registration

* Name required
* Valid email format
* Password minimum length

Product

* Price must be positive
* Stock cannot be negative
* Required fields cannot be empty

Journey

* Title cannot be empty
* Questions cannot be empty

---

# Database Protection

Use SQLAlchemy ORM for all database operations.

Benefits

* Prevents SQL Injection
* Parameterized queries
* Easier validation
* Cleaner code

Avoid raw SQL unless absolutely necessary.

---

# API Protection

Protected endpoints require authentication.

Examples

Protected

```
/api/cart
/api/orders
/api/users/profile
/api/admin/*
```

Public

```
/api/auth/login
/api/auth/register
/api/products
/api/journeys
```

---

# Cross-Origin Resource Sharing (CORS)

Only allow requests from the React frontend.

Development

```
http://localhost:5173
```

Production

Replace with the deployed frontend URL.

---

# Error Handling

Do not expose

* Stack traces
* Database errors
* Internal server information

Instead return

```json
{
    "success": false,
    "message": "An unexpected error occurred."
}
```

---

# Data Protection

Sensitive Data

* Password hashes
* JWT tokens
* User profile information
* Shipping addresses

Non-sensitive Data

* Product catalog
* Categories
* Journey information

Only authenticated users can access their personal data.

---

# Session Management

JWT tokens expire after a configurable duration.

Recommended

```
24 Hours
```

Users must log in again after expiration.

---

# File Uploads

Version 1

Only product image URLs are stored.

No user file uploads are supported.

This reduces complexity and security risks.

---

# Logging

Log

* Login attempts
* Failed authentication
* Product creation
* Product updates
* Order creation
* Admin actions

Do not log

* Passwords
* JWT tokens
* Personal payment information

---

# Security Best Practices

* Hash all passwords.
* Validate every request.
* Protect all authenticated endpoints with JWT.
* Verify admin role before accessing admin APIs.
* Sanitize all user input.
* Use HTTPS in production.
* Keep secret keys in environment variables.
* Never expose database credentials in source code.

---

# Environment Variables

Sensitive configuration should be stored in a `.env` file.

Example

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=buildwise
```

The `.env` file must be excluded from version control.

---

# Deferred for Version 1

The following features are intentionally excluded to keep the project achievable:

* OAuth (Google, GitHub login)
* Two-factor authentication (2FA)
* Email verification
* Password reset via email
* Rate limiting
* CAPTCHA
* Audit logs
* Account lockout after repeated failed logins
* Refresh tokens
* Payment gateway security
* Product image upload validation
* Advanced role-based permissions

---

# Security Summary

For a workshop-scale project, BuildWise focuses on essential security practices:

* Secure password hashing
* JWT-based authentication
* Role-based authorization
* SQL injection protection through SQLAlchemy
* Input validation
* Restricted CORS configuration
* Environment-based secret management

These measures provide a solid security foundation while keeping the implementation lightweight and appropriate for the project's scope.
