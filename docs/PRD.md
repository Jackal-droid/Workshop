# PRD.md

# BuildWise - Goal Based E-Commerce Platform

## Project Overview

BuildWise is a modern goal-based e-commerce platform that transforms the traditional shopping experience. Instead of searching through hundreds of products, users begin by selecting a goal such as building a Coding Workspace, Gaming Setup, Home Office, Photography Kit, or Student Starter Kit.

Based on a few simple questions like budget and intended use, the platform generates a curated shopping kit. Users can customize the kit by replacing or removing products before purchasing everything in a single checkout.

---

# Problem Statement

Traditional e-commerce platforms expect users to know exactly what products they need. Beginners often struggle because they don't know:

* Which products to buy
* Which accessories are essential
* What fits their budget
* Which alternatives are available

This leads to decision fatigue and unnecessary browsing.

---

# Solution

BuildWise simplifies shopping by allowing users to shop based on goals rather than individual products.

The platform automatically creates recommended shopping kits that users can customize before placing an order.

---

# Target Users

### Primary

* College students
* Beginner gamers
* Remote workers
* First-time PC/laptop buyers
* Photography beginners

### Secondary

* Professionals upgrading setups
* Parents buying for students
* Gift shoppers

---

# Core Features (Priority Order)

## 1. Goal Selection ⭐⭐⭐⭐⭐

Users select one of the available journeys.

Examples:

* Coding Workspace
* Gaming Setup
* Home Office
* Photography Kit
* Student Starter Kit

---

## 2. Guided Questionnaire ⭐⭐⭐⭐⭐

Each journey asks a few simple questions.

Example:

Coding Workspace

* Budget
* Experience Level
* Need External Monitor?
* Preferred Brand

The answers determine the recommended kit.

---

## 3. Smart Kit Generator ⭐⭐⭐⭐⭐

The platform generates a complete shopping kit.

Example:

Coding Workspace

* Laptop
* Mouse
* Keyboard
* Laptop Stand
* Backpack

Optional Items

* Monitor
* Dock
* Webcam

---

## 4. Kit Customization ⭐⭐⭐⭐

Users can:

* Remove products
* Replace products with alternatives
* View product details
* See updated pricing instantly

---

## 5. Shopping Cart & Checkout ⭐⭐⭐⭐

Users add the generated kit to the cart and complete checkout.

Features:

* Quantity updates
* Order summary
* Shipping information
* Mock payment
* Order confirmation

---

## 6. Admin Dashboard ⭐⭐⭐⭐

Administrator can:

* Add products
* Edit products
* Delete products
* Manage categories
* Manage journeys
* View orders
* View users

---

# Standard E-Commerce Features

* User Registration
* Login
* JWT Authentication
* Product Catalog
* Categories
* Product Details
* Search
* Wishlist
* Cart
* Checkout
* Order History
* User Profile
* Admin Dashboard

---

# Out of Scope (Version 1)

To keep the project achievable within the available development time, the following features are intentionally excluded:

* AI-powered recommendations
* Real payment gateway integration
* Multiple sellers
* Live inventory synchronization
* Product reviews and ratings
* Advanced compatibility engine
* Chat support
* Coupons and promotions
* Email notifications
* Recommendation learning

---

# User Flow

Landing Page

↓

Choose a Journey

↓

Answer Questions

↓

Generate Recommended Kit

↓

Customize Kit

↓

Add to Cart

↓

Checkout

↓

Order Confirmation

↓

Order History

---

# Success Criteria

The project will be considered successful if users can:

* Register and log in successfully.
* Choose a shopping journey.
* Answer a short questionnaire.
* Receive a recommended shopping kit.
* Customize the generated kit.
* Add the kit to the cart.
* Complete checkout.
* View previous orders.
* Navigate the application easily on desktop and mobile devices.

---

# Project Goal

Develop a visually appealing, full-stack e-commerce application that demonstrates how goal-based shopping can simplify purchasing decisions while implementing standard e-commerce functionality using React, Flask, and MySQL.
