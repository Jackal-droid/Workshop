# design.md

# BuildWise - UI/UX Design Guide

## Design Vision

BuildWise should feel different from a traditional e-commerce website.

Instead of overwhelming users with hundreds of products, the interface should guide them step by step toward building the perfect shopping kit.

The overall experience should feel clean, modern, interactive, and beginner-friendly.

---

# Design Style

## Theme

Modern Minimal

Inspired by

* Apple
* Stripe
* Linear
* Notion
* Vercel

---

## Color Palette

Primary

* Indigo (#4F46E5)

Secondary

* Blue (#3B82F6)

Accent

* Emerald (#10B981)

Background

* White (#FFFFFF)

Cards

* Light Gray (#F8FAFC)

Text

* Dark Gray (#1F2937)

Danger

* Red (#EF4444)

---

## Typography

Heading

* Poppins Bold

Body

* Inter

Buttons

* Semi Bold

---

## Border Radius

Large rounded cards

16px

Buttons

12px

Input Fields

12px

---

## Shadows

Soft shadows only

Hover cards should slightly elevate.

---

# Application Layout

Navbar

↓

Hero Section

↓

Journey Cards

↓

Features

↓

Footer

---

# Main Pages

## 1. Landing Page

Purpose

Introduce the platform and encourage users to start a shopping journey.

Sections

### Hero

Headline

> Build Your Perfect Setup, Not Just a Shopping Cart.

Subheading

> Choose your goal, answer a few questions, and receive a personalized shopping kit in minutes.

Primary CTA

* Start Building

Secondary CTA

* Browse Products

---

### Journey Cards

Display five large clickable cards.

* 💻 Coding Workspace
* 🎮 Gaming Setup
* 🏠 Home Office
* 📸 Photography Kit
* 🎒 Student Starter Kit

Each card contains:

* Icon
* Short description
* "Build Now" button

---

### Why BuildWise

Three feature cards

* Goal-Based Shopping
* Smart Recommendations
* Easy Customization

---

### Featured Products

A small section showing popular products from different categories.

---

## 2. Login & Register

Simple centered authentication form.

Fields

Login

* Email
* Password

Register

* Name
* Email
* Password
* Confirm Password

---

## 3. Journey Questionnaire

Step-by-step form.

Example

Step 1

Budget

Step 2

Primary Purpose

Step 3

Experience Level

Step 4

Brand Preference

Navigation

* Previous
* Next
* Generate Kit

Progress bar displayed at the top.

---

## 4. Generated Kit Page

The most important page.

Layout

Left Panel

Journey Summary

* Budget
* Selected answers
* Estimated total

Right Panel

Product cards

Each product card contains

* Product image
* Product name
* Price
* Short description
* Replace button
* Remove button
* View Details button

Sticky sidebar

Budget Tracker

Example

Budget

₹80,000

Current

₹74,500

Remaining

₹5,500

Buttons

* Add Entire Kit to Cart
* Save for Later

---

## 5. Product Details

Displays

* Large product image
* Multiple images (optional)
* Specifications
* Price
* Availability
* Alternative products
* Add to Cart

---

## 6. Product Replacement Modal

Appears when Replace is clicked.

Displays

Alternative products in the same category.

Each card includes

* Image
* Name
* Price
* Key specifications
* Select button

Selecting a replacement updates the kit and total instantly.

---

## 7. Shopping Cart

Displays

* Products
* Quantity
* Price
* Remove option
* Total
* Proceed to Checkout

Order Summary card remains visible on desktop.

---

## 8. Checkout

Sections

Shipping Address

Delivery Method

Mock Payment

Order Summary

Place Order button

---

## 9. Order History

Card layout.

Each order displays

* Order ID
* Date
* Total
* Status
* View Details

---

## 10. User Profile

Contains

* Personal Information
* Saved Kits (optional placeholder)
* Order History
* Logout

---

## 11. Admin Dashboard

Sidebar Navigation

Dashboard

Products

Journeys

Orders

Users

Categories

Main Dashboard

Statistics Cards

* Total Products
* Total Users
* Orders
* Revenue (mock)

Tables

Recent Orders

Latest Users

---

# Navigation

Top Navigation

Logo

Journeys

Products

Cart

Profile

Login / Logout

Responsive hamburger menu on mobile.

---

# Responsive Design

Desktop

3–4 card grid

Tablet

2 card grid

Mobile

Single column layout

Navigation collapses into a drawer.

---

# Animations

Use Framer Motion sparingly.

* Fade-in sections
* Card hover scale
* Button hover transitions
* Smooth page transitions
* Progress bar animation
* Modal open/close animation

Avoid excessive animations that slow down the interface.

---

# User Journey

Landing Page

↓

Choose Journey

↓

Questionnaire

↓

Generated Kit

↓

Customize Products

↓

Cart

↓

Checkout

↓

Order Confirmation

↓

Order History

---

# UX Principles

* Guide users instead of overwhelming them.
* Keep forms short (3–5 questions).
* Display live budget updates whenever products change.
* Make customization simple with one-click replacement.
* Use clear progress indicators.
* Ensure all important actions are reachable within one or two clicks.

---

# Future UI Enhancements (Not in V1)

* Dark Mode
* Drag-and-drop kit editing
* Product comparison view
* Compatibility badges
* AI chat assistant
* Personalized dashboard
* Saved multiple shopping journeys
* 3D room or setup visualization
