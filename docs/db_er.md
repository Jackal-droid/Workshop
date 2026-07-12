# db_er.md

# BuildWise - Database Design (ER Model)

## Database

MySQL

ORM

SQLAlchemy (Flask)

---

# Entity Relationship Overview

```
Users
│
├── Orders
│     └── OrderItems
│
├── Cart
│     └── CartItems
│
└── Wishlist
      └── WishlistItems

Categories
│
└── Products

Journeys
│
├── JourneyQuestions
│
└── JourneyProducts
```

---

# Tables

---

## 1. Users

Stores user account information.

| Field         | Type                 | Constraints                 |
| ------------- | -------------------- | --------------------------- |
| id            | INT                  | Primary Key, Auto Increment |
| full_name     | VARCHAR(100)         | NOT NULL                    |
| email         | VARCHAR(120)         | UNIQUE, NOT NULL            |
| password_hash | VARCHAR(255)         | NOT NULL                    |
| role          | ENUM('user','admin') | Default 'user'              |
| created_at    | DATETIME             | Default Current Timestamp   |

### Indexes

* UNIQUE(email)

---

## 2. Categories

Groups products into categories.

Examples

* Laptop
* Mouse
* Keyboard
* Monitor
* Camera
* Backpack

| Field       | Type        | Constraints |
| ----------- | ----------- | ----------- |
| id          | INT         | Primary Key |
| name        | VARCHAR(80) | UNIQUE      |
| description | TEXT        | Nullable    |

### Relationship

One Category → Many Products

---

## 3. Products

Stores all product information.

| Field       | Type          | Constraints |
| ----------- | ------------- | ----------- |
| id          | INT           | Primary Key |
| category_id | INT           | Foreign Key |
| name        | VARCHAR(150)  | NOT NULL    |
| description | TEXT          | Nullable    |
| brand       | VARCHAR(80)   | NOT NULL    |
| price       | DECIMAL(10,2) | NOT NULL    |
| image_url   | VARCHAR(255)  | Nullable    |
| stock       | INT           | Default 0   |
| rating      | DECIMAL(2,1)  | Optional    |

### Indexes

* INDEX(category_id)
* INDEX(brand)

### Relationship

Many Products → One Category

---

## 4. Journeys

Represents each shopping journey.

Example Data

* Coding Workspace
* Gaming Setup
* Home Office
* Photography Kit
* Student Starter Kit

| Field       | Type         | Constraints |
| ----------- | ------------ | ----------- |
| id          | INT          | Primary Key |
| title       | VARCHAR(100) | UNIQUE      |
| description | TEXT         | Nullable    |
| image_url   | VARCHAR(255) | Nullable    |

---

## 5. JourneyQuestions

Stores questionnaire fields for each journey.

Example

Journey

Coding Workspace

Questions

* Budget
* Primary Use
* Need Monitor?
* Preferred Brand

| Field      | Type                                   | Constraints            |
| ---------- | -------------------------------------- | ---------------------- |
| id         | INT                                    | Primary Key            |
| journey_id | INT                                    | Foreign Key            |
| question   | VARCHAR(255)                           | NOT NULL               |
| input_type | ENUM('text','select','number','radio') | NOT NULL               |
| options    | TEXT                                   | JSON/String (optional) |

### Relationship

One Journey → Many Questions

---

## 6. JourneyProducts

Maps recommended products to a journey.

Example

Coding Workspace

↓

Laptop

Mouse

Keyboard

Stand

| Field         | Type    | Constraints   |
| ------------- | ------- | ------------- |
| id            | INT     | Primary Key   |
| journey_id    | INT     | Foreign Key   |
| product_id    | INT     | Foreign Key   |
| is_optional   | BOOLEAN | Default FALSE |
| display_order | INT     | Default 0     |

### Relationship

Many-to-Many

Journey ↔ Products

---

## 7. Cart

One active cart per user.

| Field      | Type     | Constraints               |
| ---------- | -------- | ------------------------- |
| id         | INT      | Primary Key               |
| user_id    | INT      | Foreign Key, UNIQUE       |
| created_at | DATETIME | Default Current Timestamp |

---

## 8. CartItems

Products inside the user's cart.

| Field      | Type | Constraints |
| ---------- | ---- | ----------- |
| id         | INT  | Primary Key |
| cart_id    | INT  | Foreign Key |
| product_id | INT  | Foreign Key |
| quantity   | INT  | Default 1   |

### Relationship

One Cart → Many CartItems

---

## 9. Wishlist

Stores a user's wishlist.

| Field   | Type | Constraints         |
| ------- | ---- | ------------------- |
| id      | INT  | Primary Key         |
| user_id | INT  | Foreign Key, UNIQUE |

---

## 10. WishlistItems

Products saved for later.

| Field       | Type | Constraints |
| ----------- | ---- | ----------- |
| id          | INT  | Primary Key |
| wishlist_id | INT  | Foreign Key |
| product_id  | INT  | Foreign Key |

---

## 11. Orders

Stores completed orders.

| Field            | Type                                              | Constraints               |
| ---------------- | ------------------------------------------------- | ------------------------- |
| id               | INT                                               | Primary Key               |
| user_id          | INT                                               | Foreign Key               |
| total_amount     | DECIMAL(10,2)                                     | NOT NULL                  |
| status           | ENUM('Pending','Confirmed','Shipped','Delivered') | Default 'Pending'         |
| shipping_address | TEXT                                              | NOT NULL                  |
| created_at       | DATETIME                                          | Default Current Timestamp |

### Indexes

* INDEX(user_id)
* INDEX(status)

---

## 12. OrderItems

Stores products belonging to an order.

| Field      | Type          | Constraints           |
| ---------- | ------------- | --------------------- |
| id         | INT           | Primary Key           |
| order_id   | INT           | Foreign Key           |
| product_id | INT           | Foreign Key           |
| quantity   | INT           | NOT NULL              |
| price      | DECIMAL(10,2) | Stores purchase price |

### Relationship

One Order → Many OrderItems

---

# Relationships Summary

```
Users
 ├── Cart
 │      └── CartItems
 │
 ├── Wishlist
 │      └── WishlistItems
 │
 └── Orders
        └── OrderItems

Categories
      │
      └── Products

Journeys
      ├── JourneyQuestions
      │
      └── JourneyProducts
                  │
                  └── Products
```

---

# Required Indexes

### Users

* email (UNIQUE)

### Categories

* name (UNIQUE)

### Products

* category_id
* brand

### Journeys

* title (UNIQUE)

### Orders

* user_id
* status

---

# Version 1 Notes

To keep development lightweight:

* Product recommendations are based on predefined `JourneyProducts` mappings rather than AI.
* Compatibility logic is implemented in the application layer, not the database.
* Product replacement uses products from the same category and similar price range.
* Journey answers are processed temporarily by the backend and are **not stored** in the database for Version 1, reducing schema complexity while still supporting the guided shopping experience.
