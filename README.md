# 🥐 Golden Crust Artisan Bakery & Café
### Web Technology Course Project — Frontend Web Application

A modern, responsive, and handcrafted **Frontend Web Technology Project** built using **React, Vanilla CSS, JavaScript (ES6+), and Vite**. 

Designed specifically to demonstrate core front-end engineering fundamentals: semantic HTML5, modern CSS3 layout techniques (CSS Grid & Flexbox), component-based UI architecture, dynamic state management with React Hooks, and client-side persistence via the browser's `LocalStorage` API.

---

## 🌟 Key Features

1. **Artisanal Product Catalog (`MenuCatalog.jsx`)**
   - Filter by categories: *All Treats, Cakes, Artisan Breads, Pastries, Cookies, Savory*.
   - Filter by dietary preferences: *🌱 100% Eggless, 🌿 Vegan, 🌾 Gluten-Free*.
   - Real-time instant text search filtering by product name and ingredients.
   - Price sorting (*Low to High, High to Low*) and rating sorting.
   - Quick-View modal with nutritional information, calorie counts, allergens, and ingredients list.

2. **Interactive Custom Cake Designer (`CustomCakeBuilder.jsx`)**
   - 4-step interactive bespoke cake customizer.
   - Live real-time price estimation formula updating dynamically as the user modifies flavor, weight, tiers, and eggless choices:
     $$\text{Price} = (\text{BaseRate} \times \text{WeightFactor} \times \text{TierMultiplier}) + \text{EgglessCharge}$$
   - Custom chocolate piped message input.
   - Instant booking quote confirmation receipt with unique tracking ID.

3. **Persistent Shopping Cart & Checkout (`CartDrawer.jsx`, `CheckoutModal.jsx`)**
   - Slide-over drawer with item increment (`+`) and decrement (`-`) quantity controls.
   - **LocalStorage Persistence:** Cart items remain saved even after refreshing or closing the browser.
   - Promo coupon code verification (`SWEET10` for 10% discount, `FIRST5` for 15% discount).
   - Dynamic free delivery calculation (free delivery on orders over $35).
   - Interactive checkout form with delivery address inputs and payment modes (COD, UPI / QR, Card).
   - Instant order confirmation receipt with itemized breakdown and delivery timeline.

4. **Customer Reviews & Testimonials (`CustomerReviews.jsx`)**
   - Community review cards with verified buyer tags and star ratings.
   - Interactive review submission form with live 5-star rating selector, saving feedback in `LocalStorage`.

5. **Bakery Operations / Staff Portal (`AdminDashboard.jsx`)**
   - Toggled via the **"Staff Portal"** button in the top navigation.
   - Live kitchen orders board allowing staff to update order preparation status:
     `Pending` ➔ `Baking in Hearth` ➔ `Out for Delivery` ➔ `Delivered`.
   - Publish new bakery items directly into the live catalog using form controls.
   - Catalog inventory manager to inspect or delete products.

6. **Client-Side Authentication (`AuthModal.jsx`, `AuthContext.jsx`)**
   - User sign-in and registration forms with validation and session persistence in `LocalStorage`.
   - 1-Click **Demo Account Fillers** (`Demo Customer` and `Demo Admin`) for fast viva demonstrations.

---

## 🛠️ Technology Stack & Web Tech Concepts

| Domain | Technology / Concept | Implementation Details |
|---|---|---|
| **Structure** | HTML5 Semantic Elements | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| **Styling** | Handcrafted Vanilla CSS | CSS Custom Properties (`:root`), Flexbox, CSS Grid, Media Queries |
| **UI Framework** | React 18 & Vite | Single Page Application (SPA), Component Architecture, Fast HMR |
| **State Management** | React Hooks & Context | `useState`, `useEffect`, `useContext`, `useMemo` |
| **Persistence** | Browser `LocalStorage` API | Persistent storage for Cart, Orders, Reviews, and User Sessions |
| **Icons** | Lucide React | Lightweight, accessible SVG icons |

---

## 🚀 How to Run the Project Locally

### Prerequisites:
- **Node.js** (v18 or higher) installed on your system.

### Step-by-Step Instructions:
1. Open your terminal in this project directory:
   ```powershell
   cd d:\application_development\web_tech_project
   ```

2. Install dependencies (only needs to be run once):
   ```powershell
   npm install
   ```

3. Start the Vite local development server:
   ```powershell
   npm run dev
   ```

4. Open your browser and visit:  
   👉 **`http://localhost:5173`**

---

## 🔑 Demo Credentials for Testing / Evaluation

| Role | Email | Password | Access |
|---|---|---|---|
| **Demo Customer** | `customer@goldencrust.com` | `bakery123` | Browsing, ordering, submitting reviews |
| **Bakery Staff (Admin)** | `admin@goldencrust.com` | `admin123` | Kitchen order statuses, catalog publishing |

### Available Promo Coupon Codes:
- `SWEET10` - 10% discount on order subtotal
- `FIRST5` - 15% discount on order subtotal

---

## 📖 Viva Voce Defense Guide
Be sure to read the comprehensive question bank and oral exam guide before your presentation:  
👉 **[`VIVA_EXAM_GUIDE.md`](./VIVA_EXAM_GUIDE.md)**
