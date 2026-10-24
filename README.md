# 🥐 Golden Crust Artisan Bakery & Café
### Full MERN Stack Web Technology Course Project

A complete, responsive, full-stack bakery web application built using **MongoDB, Express.js, React.js, and Node.js (MERN Stack)**. Designed and handcrafted with modern artisanal aesthetics, interactive cart management, custom celebration cake builder, customer reviews, and a kitchen operations staff portal.

---

## 🌟 Key Features

1. **Artisanal Product Catalog (`MenuCatalog.jsx`)**
   - Filter by categories: *Cakes, Artisan Breads, Pastries, Cookies, Savory*.
   - Filter by dietary preferences: *🌱 100% Eggless, 🌿 Vegan, 🌾 Gluten-Free*.
   - Live real-time search with instant feedback.
   - Price and customer rating sorting.
   - Quick-View modal with nutrition facts, allergens, and ingredients list.

2. **Interactive Custom Cake Designer (`CustomCakeBuilder.jsx`)**
   - 4-step interactive bespoke cake customizer.
   - Live real-time price estimation formula based on weight, tiers, flavors, and eggless preference.
   - Personalized chocolate piped message input.
   - Direct inquiry booking submission with unique confirmation tracking code.

3. **Persistent Shopping Cart & Checkout (`CartDrawer.jsx`, `CheckoutModal.jsx`)**
   - Slide-over cart drawer with quantity increments (`+`) and decrements (`-`).
   - LocalStorage synchronization (cart remains intact even after browser refresh).
   - Promo coupon code system (`SWEET10` for 10% off, `FIRST5` for 15% off).
   - Dynamic free delivery calculation (free on orders over $35).
   - Complete checkout with Cash on Delivery (COD), UPI / QR Code, or Card options.
   - Immediate order confirmation receipt with tracking ID.

4. **Customer Reviews & Testimonials (`CustomerReviews.jsx`)**
   - Interactive 5-star rating selector.
   - Real-time review submission communicating with backend `/api/reviews`.

5. **Bakery Operations / Staff Portal (`AdminDashboard.jsx`)**
   - Switchable via "Staff Portal" button in the top navigation.
   - Live Orders Board with kitchen preparation status updates:
     `Pending` ➔ `Baking in Hearth` ➔ `Out for Delivery` ➔ `Delivered`.
   - Publish new bakery items directly into the MongoDB catalog with form inputs.
   - Live inventory inspection and deletion.

6. **Authentication & User Profiles (`AuthModal.jsx`, `AuthContext.jsx`)**
   - User registration and login with secure password hashing (`bcryptjs`) and JSON Web Tokens (JWT).
   - 1-Click quick demo auto-fill buttons for fast testing and viva demonstration.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 18, Vite | Single Page Application (SPA), React Hooks, Context API |
| **Styling** | Handcrafted Vanilla CSS | CSS Custom Properties, Flexbox, Grid, Micro-animations |
| **Backend** | Node.js, Express.js | Modular REST API, MVC Architecture, CORS, JSON Parsers |
| **Database** | MongoDB & Mongoose | Schemas, Validation, Timestamps, Pre-save bcrypt hooks |
| **Auth** | JWT & Bcrypt.js | Cryptographic password hashing and signed tokens |

---

## 🚀 How to Run the Project Locally

### Prerequisites:
- **Node.js** (v18 or higher) installed on your system.

### Step 1: Start the Backend Server (Port 5000)
Open your terminal:
```bash
cd backend
npm install
npm run dev
# Or run with node:
# node server.js
```
The backend will launch at: `http://localhost:5000`

> **Note on MongoDB:**
> If you have local MongoDB or MongoDB Atlas, configure your connection URI in `backend/.env`. If MongoDB is offline, the backend automatically activates the integrated fallback store so the application runs without any interruptions during presentations!

### Step 2: Start the Frontend Application (Port 5173)
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser and visit: **`http://localhost:5173`**

---

## 🔑 Demo Credentials for Testing / Viva Evaluation

| Role | Email | Password | Access |
|---|---|---|---|
| **Demo Customer** | `customer@goldencrust.com` | `bakery123` | Browsing, ordering, reviewing |
| **Bakery Staff (Admin)** | `admin@goldencrust.com` | `admin123` | Kitchen order statuses, catalog publishing |

### Available Promo Coupon Codes:
- `SWEET10` - 10% discount on order subtotal
- `FIRST5` - 15% discount on order subtotal

---

## 📚 Viva Exam & Defense Guide

Before your viva / project defense, make sure to read:
👉 **[`VIVA_EXAM_GUIDE.md`](./VIVA_EXAM_GUIDE.md)**

It contains:
- Complete breakdown of every React hook used (`useState`, `useEffect`, `useContext`, `useMemo`).
- Detailed explanation of JavaScript methods (`map`, `filter`, `reduce`, `find`).
- Express and Mongoose architecture walkthrough.
- Exact answers to **25 common viva questions** professors ask during project evaluations.
