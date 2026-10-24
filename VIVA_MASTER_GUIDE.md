# 🎓 Golden Crust Bakery — Complete Viva Voce Masterclass Guide
## Web Technology Course Project | Everything You Need to Ace Your Oral Examination

> **How to use this guide:**
> This single file contains **EVERYTHING** about your bakery website. When your teacher asks *any* question about how you made the website, which functions, methods, hooks, HTML tags, CSS rules, or data structures were used, you will find the exact code line, explanation, and word-for-word answer right here.

---

## 📑 Table of Contents
1. [The 60-Second Opening Pitch (What to Say First)](#1-the-60-second-opening-pitch)
2. [Project Architecture & File-by-File Breakdown](#2-project-architecture--file-by-file-breakdown)
3. [Deep-Dive into Every Website Component](#3-deep-dive-into-every-website-component)
4. [Every JavaScript Function & Method Explained](#4-every-javascript-function--method-explained)
5. [React Hooks Used & Their Exact Purpose](#5-react-hooks-used--their-exact-purpose)
6. [CSS3 Layouts, Styling & Design System](#6-css3-layouts-styling--design-system)
7. [How LocalStorage Data Persistence Works](#7-how-localstorage-data-persistence-works)
8. [Live Demonstration Script for Your Teacher](#8-live-demonstration-script-for-your-teacher)
9. [30 Top Viva Questions & Word-for-Word Answers](#9-30-top-viva-questions--word-for-word-answers)
10. [Teacher "Gotcha" Live Coding Challenges & Solutions](#10-teacher-gotcha-live-coding-challenges--solutions)

---

## 1. The 60-Second Opening Pitch

When your teacher sits in front of you and says: **"Tell me about your website and how you built it"**, do NOT hesitate. Speak this confidently:

> *"Good morning/afternoon, Sir/Madam. For my Web Technology project, I designed and coded **Golden Crust**, a modern, responsive artisan bakery web application built using **React 18, JavaScript ES6+, HTML5 semantic elements, and handcrafted Vanilla CSS**.*
>
> *I structured the website around a clean component-based architecture. It features:*
> 1. *An **artisan product catalog** with category filtering, dietary preference tags (Eggless, Vegan, Gluten-Free), real-time live keyword search, and price sorting.*
> 2. *A **Quick-View modal** disclosing nutritional facts, calories, allergens, and ingredients.*
> 3. *An **interactive custom cake designer** that dynamically calculates prices based on flavor, weight, tiers, and eggless preferences using a real-time mathematical formula.*
> 4. *A **slide-over shopping cart drawer** with quantity adjustment, promo coupon validation (`SWEET10`), and free shipping thresholds.*
> 5. *An **express checkout modal** with customer address inputs, payment selection (COD, UPI, Card), and order receipt generation.*
> 6. *A **customer review module** with a live 5-star rating selector.*
> 7. *And a **Staff Kitchen Portal** where staff can monitor incoming orders and update preparation statuses from Pending to Baking to Delivered.*
>
> *All state is managed using **React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`)** and data is persisted across browser reloads using the browser's native **`LocalStorage` API** without needing an external database. I am ready to walk you through any function or component in the codebase."*

---

## 2. Project Architecture & File-by-File Breakdown

Your project lives inside `web_tech_project/`. Here is the complete file directory:

```text
web_tech_project/
├── index.html                  <-- Root HTML5 entry point with Google Fonts & metadata
├── vite.config.js              <-- Vite build tool configuration
├── package.json                <-- Project dependencies (React, Vite, Lucide-React)
├── VIVA_MASTER_GUIDE.md        <-- This complete defense manual
├── README.md                   <-- Setup & project overview
│
├── public/                     <-- Static assets
│   ├── favicon.svg             <-- Bakery icon (croissant 🥐)
│   └── icons.svg
│
└── src/                        <-- React Source Code
    ├── main.jsx                <-- Renders <App /> into the root DOM element
    ├── App.jsx                 <-- Coordinates Navbar, Storefront, Admin view & Modals
    ├── index.css               <-- Master handcrafted Vanilla CSS design system
    │
    ├── data/
    │   └── bakeryData.js       <-- Catalog data, initial reviews, and kitchen orders
    │
    ├── context/
    │   ├── CartContext.jsx     <-- Global shopping cart state & LocalStorage sync
    │   └── AuthContext.jsx     <-- Client-side user login & session persistence
    │
    └── components/
        ├── Navbar.jsx          <-- Sticky header with logo, navigation & cart badge
        ├── Hero.jsx            <-- Artisanal banner, freshness indicator & CTAs
        ├── MenuCatalog.jsx     <-- Filterable bakery catalog with search & sorting
        ├── ProductModal.jsx    <-- Quick-view popup (calories, allergens, ingredients)
        ├── CustomCakeBuilder.jsx <-- Bespoke cake designer with live price formula
        ├── CartDrawer.jsx      <-- Slide-over cart panel with promo coupon input
        ├── CheckoutModal.jsx   <-- Delivery address form & order receipt confirmation
        ├── CustomerReviews.jsx <-- Community ratings list & 5-star review form
        ├── AdminDashboard.jsx  <-- Kitchen staff portal for order tracking & publishing
        ├── AuthModal.jsx       <-- Login/Register modal with 1-click demo filler buttons
        └── Footer.jsx          <-- Operating hours, bakery address & coursework attribution
```

---

## 3. Deep-Dive into Every Website Component

If the teacher points to a specific screen element and asks: *"Which component is this and how does it work?"*, here is the exact breakdown:

### A. `Navbar.jsx`
- **Location on Page:** The fixed header at the very top.
- **Key Features:**
  - Bakery logo (`🥐 Golden Crust Artisan Bakery & Patisserie`).
  - Anchor navigation links (`#home`, `#menu`, `#custom-cakes`, `#reviews`, `#about`) that smoothly scroll to sections.
  - **"Staff Portal" Toggle Button:** Toggles between customer storefront and the kitchen admin dashboard (`isAdminView` state in `App.jsx`).
  - **"Sign In" / User Profile Button:** Opens `AuthModal` or displays the logged-in customer's first name.
  - **Cart Trigger with Animated Badge:** Uses `totalItems` from `CartContext` to display the total count of items in the cart (e.g. `1`, `3`).

### B. `Hero.jsx`
- **Location on Page:** The top banner area with warm bakery imagery.
- **Key Features:**
  - **Freshness Indicator Pill:** Displays a pulsing green dot (`.dot`) indicating `Batch #3 Just Out of the Hearth`.
  - **Artisanal Headline:** *"Baked With Patience, Flour, & Pure Passion."*
  - **Call to Action (CTA) Buttons:** "Explore Daily Bakes" (scrolls to `#menu`) and "Design Custom Cake" (scrolls to `#custom-cakes`).
  - **Bakery Quality Badges:** Highlights 36-hr sourdough fermentation, 100% organic flour, and 4.9★ rating.
  - **Floating Chef Card:** Highlights Head Baker Chef Julian Vance with an award badge.

### C. `MenuCatalog.jsx`
- **Location on Page:** The main bakery treats catalog grid.
- **Key Features:**
  - **Category Tabs:** `All Treats`, `Cakes`, `Breads`, `Pastries`, `Cookies`, `Savory`.
  - **Live Search Bar:** Real-time text input that filters by product name and ingredients using `.includes()`.
  - **Dietary Filter Dropdown:** Allows filtering by `100% Eggless`, `Vegan`, and `Gluten-Free`.
  - **Sort By Dropdown:** Sorts products by `Price: Low to High`, `Price: High to Low`, and `Top Rated (Stars)`.
  - **Product Card:** Displays image, dietary badge, bestseller tag, title, description, price, original price with strikethrough, Quick-View trigger button, and "+ Add" button.
  - **Performance Optimization:** Uses `useMemo` so that filtering and sorting only re-compute when search or filter states change!

### D. `ProductModal.jsx` (Quick View)
- **Location on Page:** Modal popup opened when clicking "Quick View" on any product card.
- **Key Features:**
  - Displays high-res product image with dietary tags.
  - Displays **Nutritional Calories** (e.g., `340 kcal/slice`).
  - Discloses **Allergen Information** (e.g., `Gluten, Dairy`).
  - Lists **Handcrafted Artisanal Ingredients** as pills (e.g., `Belgian Dark Chocolate`, `Organic Flour`, `Sea Salt`).
  - Quantity counter (`-` / `+`) and "Add to Cart" button with instant checkmark feedback (`Added to Cart!`).

### E. `CustomCakeBuilder.jsx`
- **Location on Page:** The interactive celebration cake designer section.
- **Key Features:**
  - **Step 1:** Select Sponge & Flavor (`Belgian Dark Truffle`, `Madagascar Vanilla Bean`, `Red Velvet Romance`, `Sicilian Pistachio Rose`, `Salted Butter Caramel`, `Mango Passionfruit`).
  - **Step 2:** Select Weight (`0.5 kg`, `1.0 kg`, `1.5 kg`, `2.0 kg`) and Tiers (`Single Tier`, `2 Tiers +45%`, `3 Tiers +85%`).
  - **Step 3:** Select Outer Frosting and toggle the `🌱 100% Eggless` checkbox.
  - **Step 4:** Enter piped message on cake (e.g., *"Happy 21st Birthday Rhea!"*) and celebration date.
  - **Live Mathematical Estimate Formula:**
    ```javascript
    const basePrice = 24.00;
    const weightObj = WEIGHTS.find((w) => w.value === Number(weight));
    let price = basePrice * weightObj.priceFactor;
    if (tiers === '2 Tiers') price *= 1.45;
    if (tiers === '3 Tiers') price *= 1.85;
    if (isEggless) price += 3.00;
    return price.toFixed(2);
    ```
  - **Booking Submission:** Generates an inquiry quote with ref code `CAKE-XXXX` and displays an immediate confirmation receipt.

### F. `CartDrawer.jsx`
- **Location on Page:** Slide-over drawer on the right side of the screen.
- **Key Features:**
  - Displays list of cart items with thumbnail, title, unit price, quantity increment (`+`) and decrement (`-`) buttons, and a trash can delete button.
  - **Promo Coupon Code Form:**
    - Type `SWEET10` ➔ Applies 10% discount to items subtotal.
    - Type `FIRST5` ➔ Applies 15% discount to items subtotal.
  - **Bill Breakdown:** Subtotal, Discount amount, Delivery fee ($3.50, or **FREE** on orders over $35), and Final Total.
  - **"Proceed to Checkout" Button:** Opens the `CheckoutModal`.

### G. `CheckoutModal.jsx`
- **Location on Page:** Modal window for placing orders.
- **Key Features:**
  - Customer Information form: Full Name, Phone, Email, Street Address, City, Postal Code.
  - Payment Method toggle: `Cash on Delivery (COD)`, `UPI / QR Code`, or `Online Card`.
  - Itemized order bill summary.
  - **Order Placement:** Generates order ID `GCB-XXXXXX`, saves into `LocalStorage` under `'golden_crust_orders'` (so it immediately appears in the Staff Portal!), clears the cart, and displays a formal confirmation receipt.

### H. `CustomerReviews.jsx`
- **Location on Page:** Words From Our Community section.
- **Key Features:**
  - Displays customer reviews with star ratings (1 to 5), reviewer name, verified customer badge, and review date.
  - **Interactive Review Form:** Input name, interactive star clicker (1 to 5 stars), and tasting comments textarea.
  - **LocalStorage Sync:** Submitting a review immediately adds it to the list and writes to `localStorage.setItem('golden_crust_reviews', ...)`.

### I. `AdminDashboard.jsx` (Staff / Kitchen Portal)
- **Location on Page:** Accessed by clicking the "Staff Portal" button in the navbar.
- **Key Features:**
  - **Top Metrics Cards:** Total orders placed, active hearth tickets (Pending / Baking), total order revenue ($), and total inventory items count.
  - **Tab 1: Incoming Customer Orders Table:**
    - Displays Order Ref, Customer Name, Phone, Delivery Destination, Items list, Total Paid, and Payment Method.
    - **Live Status Dropdown:** Staff can change the preparation stage (`Pending` ➔ `Baking` ➔ `Out for Delivery` ➔ `Delivered`).
  - **Tab 2: Publish New Bakery Item:**
    - Form to add new products: Name, Category, Price, Dietary classification, Calories, Image URL, Ingredients, and Description.
    - Adds the product directly to `localStorage` and publishes it to the live menu!
  - **Tab 3: Inventory Catalog:** Allows deleting products from the menu.

### J. `AuthModal.jsx`
- **Location on Page:** Modal for user login and registration.
- **Key Features:**
  - Mode switcher tabs: "Sign In" and "Create Account".
  - Form validation for email format and minimum 6-character passwords.
  - **1-Click Demo Buttons:**
    - `Demo Customer` fills `customer@goldencrust.com` / `bakery123`.
    - `Demo Admin (Staff)` fills `admin@goldencrust.com` / `admin123`.

### K. `Footer.jsx`
- **Location on Page:** Bottom of every page.
- **Key Features:**
  - Bakery working hours (Mon-Fri 6:30 AM - 9:00 PM, Sat-Sun 7:00 AM - 10:00 PM).
  - Location address: 42 Baker Street, Indiranagar, Bengaluru.
  - Coursework accreditation: *"Crafted with ❤️ using React for Web Technology Coursework"*.

---

## 4. Every JavaScript Function & Method Explained

During viva, professors ask: *"Which built-in JavaScript functions and methods did you use?"*

| Method / Function | Where It Is Used | Purpose & What It Does |
|---|---|---|
| `.map()` | `MenuCatalog.jsx`, `CartDrawer.jsx`, `CustomerReviews.jsx` | Iterates over arrays to transform data into React JSX components. |
| `.filter()` | `MenuCatalog.jsx`, `CartContext.jsx` | Returns items matching criteria (category, diet, search) and removes deleted items from cart. |
| `.reduce()` | `CartContext.jsx`, `AdminDashboard.jsx` | Calculates single aggregate sums: total items in cart, bill subtotal, and total revenue. |
| `.find()` | `CustomCakeBuilder.jsx`, `CartContext.jsx` | Locates the specific object matching a condition (e.g. finding matching cake weight object). |
| `.findIndex()` | `CartContext.jsx` | Checks if a product ID already exists in the cart before deciding to increment or add new. |
| `.some()` | `AuthContext.jsx` | Checks if an email is already registered in the users array. |
| `.sort()` | `MenuCatalog.jsx` | Sorts product cards by price ascending, descending, or star rating. |
| `.includes()` | `MenuCatalog.jsx` | Performs case-insensitive substring search across product names and descriptions. |
| `.trim()` | `CustomerReviews.jsx`, `CheckoutModal.jsx` | Strips leading and trailing whitespace from user input strings. |
| `.toLowerCase()` | `MenuCatalog.jsx`, `AuthContext.jsx` | Normalizes text to lowercase so searches and emails are case-insensitive. |
| `.split()` | `AdminDashboard.jsx`, `ProductModal.jsx` | Splits a comma-separated ingredients string into an array of individual strings. |
| `.toFixed(2)` | `CartContext.jsx`, `CustomCakeBuilder.jsx` | Formats decimal numbers to two decimal places for currency display (e.g. `$28.50`). |
| `Math.max()` | `ProductModal.jsx`, `CartDrawer.jsx` | Prevents quantity from dropping below 1: `Math.max(1, q - 1)`. |
| `Math.random()` | `CheckoutModal.jsx`, `CustomCakeBuilder.jsx` | Generates random 6-digit order tracking numbers: `GCB-` + random digits. |
| `JSON.stringify()` | `CartContext.jsx`, `CustomerReviews.jsx` | Converts JavaScript state objects into JSON strings to store in `LocalStorage`. |
| `JSON.parse()` | `CartContext.jsx`, `MenuCatalog.jsx` | Parses JSON strings back into JavaScript objects when reading from `LocalStorage`. |
| Spread `...` | All components | Clones objects and arrays immutably: `[...prevCart, newItem]` or `{ ...item, quantity }`. |

---

## 5. React Hooks Used & Their Exact Purpose

### 1. `useState`
- **Definition:** React Hook that allows components to have mutable state variables. When updated, React triggers a re-render of that component.
- **Example in Code (`MenuCatalog.jsx`):**
  ```jsx
  const [selectedCategory, setSelectedCategory] = useState('All');
  ```
  *When a user clicks "Pastries", `setSelectedCategory('Pastries')` is called, causing React to immediately re-render the catalog showing only pastries.*

### 2. `useEffect`
- **Definition:** Executes side-effects after the component renders. Can run once on mount, or whenever specified dependencies change.
- **Example in Code (`CartContext.jsx`):**
  ```jsx
  useEffect(() => {
    localStorage.setItem('golden_crust_cart', JSON.stringify(cart));
  }, [cart]);
  ```
  *Every time `cart` changes (adding, removing, or changing quantity), this effect automatically synchronizes the new cart array to the browser's `LocalStorage`.*

### 3. `useContext`
- **Definition:** Provides a way to pass data deeply through the component tree without having to manually pass props at every level ("prop drilling").
- **Example in Code (`CartContext.jsx` & `Navbar.jsx`):**
  ```jsx
  // In CartContext.jsx
  const CartContext = createContext();
  export const useCart = () => useContext(CartContext);

  // In Navbar.jsx
  const { totalItems } = useCart();
  ```
  *`Navbar` directly reads the number of cart items without needing `App.jsx` to pass it down.*

### 4. `useMemo`
- **Definition:** Memoizes (caches) the result of a calculation to optimize performance and prevent redundant recalculations on unrelated renders.
- **Example in Code (`MenuCatalog.jsx`):**
  ```jsx
  const filteredProducts = useMemo(() => {
    return products
      .filter(item => /* category, diet, search matches */)
      .sort((a, b) => /* sort by price or rating */);
  }, [products, selectedCategory, selectedDiet, searchTerm, sortBy]);
  ```
  *Filtering and sorting 12 products only executes when the search keyword, category, or sorting changes, not on every keystroke in unrelated components.*

---

## 6. CSS3 Layouts, Styling & Design System

Teachers frequently test your CSS knowledge. Here is what makes `src/index.css` special:

### A. CSS Custom Properties (`:root` Variables)
Instead of hardcoding color hex codes, we defined design tokens:
```css
:root {
  --color-primary: #854d0e;       /* Golden honey amber */
  --color-secondary: #3e2723;     /* Dark cocoa espresso */
  --color-accent: #c2410c;        /* Baked crust terracotta */
  --color-bg-main: #fffdf9;       /* Sourdough ivory cream */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --shadow-hover: 0 18px 36px rgba(133, 77, 14, 0.16);
}
```
*Why this is good:* It creates a cohesive, warm artisanal aesthetic and allows changing colors site-wide in one place.

### B. Responsive Grid Layout for Catalog
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
```
*How to explain this to the teacher:*
- `display: grid`: Activates two-dimensional CSS Grid.
- `repeat(auto-fill, minmax(280px, 1fr))`: Automatically fits as many cards per row as possible. Each card is at least `280px` wide and expands equally (`1fr`) to fill extra room.
- On a 1080p desktop: renders 4 columns.
- On a tablet: renders 2 columns.
- On a mobile phone: renders 1 column automatically without breaking!

### C. Flexbox for Dynamic Controls
Used in `.nav-container`, `.product-card-footer`, `.cart-qty-controls`, and `.search-sort-row`:
```css
.product-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### D. Micro-Animations & Transitions
- `@keyframes popScale`: Makes the cart counter badge bounce when an item is added.
- `@keyframes slideLeft`: Slides the cart drawer in smoothly from the right edge.
- `@keyframes fadeIn`: Smooth backdrop blur fade-in for modal windows.
- Card hover lift: `transform: translateY(-6px); box-shadow: var(--shadow-hover);`

---

## 7. How LocalStorage Data Persistence Works

Teachers will ask: *"Where is the data stored if there is no database?"*

### Answer:
We use the browser's native **`window.localStorage` Web Storage API**.
It allows web applications to store up to **5MB** of key-value string data directly inside the client's browser with **no expiration date**.

### The 4 Keys Used in Golden Crust:
1. `'golden_crust_cart'`: Stores the array of current basket items `[{ product, quantity }]`.
2. `'golden_crust_orders'`: Stores customer placed orders `[{ orderId, customerName, items, totalAmount, status }]`. This is read directly by the Staff Kitchen Portal!
3. `'golden_crust_reviews'`: Stores customer feedback and 5-star ratings.
4. `'golden_crust_user'`: Stores the currently logged-in user profile.

### Code Pattern (Read & Write):
```javascript
// Reading from LocalStorage on mount:
const savedData = localStorage.getItem('golden_crust_cart');
const initialCart = savedData ? JSON.parse(savedData) : [];

// Writing to LocalStorage on update:
localStorage.setItem('golden_crust_cart', JSON.stringify(cart));
```

---

## 8. Live Demonstration Script for Your Teacher

Follow these 5 steps when demonstrating your project live on screen:

### Step 1: Open the Storefront
1. Open terminal: `npm run dev`.
2. Open `http://localhost:5173`.
3. Point out the **freshness indicator** (*Batch #3*) and the **Google Fonts typography** (*Playfair Display* for headers, *Plus Jakarta Sans* for body text).

### Step 2: Demonstrate Menu Filtering & Search
1. Click the **"Cakes"** category pill ➔ show that only cakes appear.
2. Click the **"Dietary"** dropdown and pick **"🌱 100% Eggless"** ➔ show that only eggless cakes appear.
3. In the search box, type `"truffle"` ➔ show instant filtering.
4. Click **"Quick View"** on the Belgian Truffle Cake ➔ show the modal with calories, allergens, and handcrafted ingredients.

### Step 3: Add to Cart & Apply Coupon
1. Click **"+ Add"** on a product ➔ watch the cart counter badge bounce to `1` and the cart drawer slide open.
2. Increment the quantity with `+` ➔ subtotal doubles.
3. In the coupon box, type `SWEET10` and click Apply ➔ show that a **10% discount** is immediately subtracted.
4. Point out that if the subtotal exceeds $35, the delivery charge changes to **FREE**!

### Step 4: Checkout & Order Placement
1. Click **"Proceed to Checkout"**.
2. Type in name and address.
3. Select payment mode (`UPI / QR Code` or `Cash on Delivery`).
4. Click **"Confirm & Place Order"** ➔ show the generated **Order Confirmation Receipt** with the unique tracking reference (`GCB-XXXXXX`).
5. Refresh the browser page (`F5`) ➔ show that the cart remains properly updated.

### Step 5: Switch to Staff Portal
1. Click the **"Staff Portal"** button in the top navigation.
2. Show the **Kitchen & Order Control Center**.
3. Point out the order that you just placed in Step 4 sitting right at the top of the table!
4. Change its status from `Pending` to `🔥 Baking in Hearth` or `✅ Delivered`.
5. Click **"➕ Add New Bakery Item"** ➔ type a new item name and price ➔ click Publish ➔ switch back to the customer storefront and show that the new item is live on the menu!

---

## 9. 30 Top Viva Questions & Word-for-Word Answers

### Q1: What is React and why did you use it?
**Answer:** React is an open-source, component-based JavaScript library developed by Facebook for building dynamic user interfaces. I used it because it allows breaking the UI into reusable components, manages state efficiently with hooks, and uses the Virtual DOM for fast, optimized rendering.

### Q2: What is the Virtual DOM and how does it work?
**Answer:** The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes, React updates the Virtual DOM, performs a "diffing" comparison with the previous snapshot, and only updates the specific changed nodes in the real browser DOM. This avoids expensive full-page DOM repainting.

### Q3: What is the difference between State and Props?
**Answer:**
- **Props (Properties):** Immutable, read-only data passed from a parent component down to a child component (unidirectional data flow).
- **State:** Mutable data managed internally within a component that can change based on user actions, triggering a UI re-render.

### Q4: Why did you use React Context instead of Redux?
**Answer:** React Context is natively built into React. For our bakery application (managing cart items and user sessions), Context provides clean global state management without the complex boilerplate, action creators, reducers, and heavy bundle size of Redux.

### Q5: What is the difference between `localStorage` and `sessionStorage`?
**Answer:**
- `localStorage` stores data with no expiration time; it persists even after closing the browser tab or restarting the computer.
- `sessionStorage` stores data only for the duration of the current page session; it is cleared immediately when the tab is closed.

### Q6: What are Controlled Components in React?
**Answer:** A controlled component is an input element (like `<input>`, `<select>`, or `<textarea>`) whose value is bound to and controlled by React state via `value` and `onChange`. React serves as the "single source of truth".

### Q7: What is the difference between CSS Flexbox and CSS Grid?
**Answer:**
- **Flexbox:** A one-dimensional layout model designed for distributing space along either a single row OR a single column (e.g. navbars, button groups).
- **CSS Grid:** A two-dimensional layout model designed for managing both rows AND columns simultaneously (e.g. our responsive product catalog cards).

### Q8: What are CSS Custom Properties (Variables)?
**Answer:** CSS variables declared inside `:root` (e.g. `--color-primary: #854d0e;`) allow values to be defined once and reused throughout the stylesheet, ensuring design consistency and clean maintenance.

### Q9: Why is the `key` prop required when rendering lists with `.map()`?
**Answer:** The `key` prop provides a stable, unique identifier for each element. It allows React's diffing algorithm to determine which items were added, removed, or reordered, avoiding unnecessary re-renders of the entire list.

### Q10: How does keyword search work on your menu?
**Answer:** In `MenuCatalog.jsx`, as the user types, the `searchTerm` state updates on every keystroke (`onChange`). The `.filter()` method performs a case-insensitive check: `item.name.toLowerCase().includes(searchTerm.toLowerCase())`, instantly filtering matching products.

### Q11: How does the Custom Cake Builder calculate live prices?
**Answer:** It uses a dynamic price calculation function:
$$\text{Price} = (\text{BaseRate} \times \text{WeightMultiplier} \times \text{TierMultiplier}) + \text{EgglessCharge}$$
Whenever the user changes dropdown selections, React re-renders the component and calculates the new estimate in real time.

### Q12: What is Event Bubbling in JavaScript?
**Answer:** Event bubbling is the process where an event triggered on a nested child element propagates upwards through its parent elements in the DOM tree. In our modal windows, we use `e.stopPropagation()` on the modal content to prevent clicks inside the modal from bubbling to the background overlay and accidentally closing it.

### Q13: What is the difference between `==` and `===` in JavaScript?
**Answer:** `==` (abstract equality) converts operands to the same type before comparing. `===` (strict equality) compares both value and data type without coercion. We always use `===` for predictable code.

### Q14: What is Vite and why did you use it over Create React App (CRA)?
**Answer:** Vite is a modern frontend build tool that leverages native ES modules in the browser. It provides near-instant server starts (<500ms) and lightning-fast Hot Module Replacement (HMR), unlike Create React App which is deprecated and significantly slower.

### Q15: What is Semantic HTML5 and why is it important?
**Answer:** Semantic HTML uses tags that convey the meaning and structure of content (e.g. `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) rather than generic `<div>` tags. It improves code readability, search engine optimization (SEO), and accessibility for screen readers.

### Q16: How does your Promo Coupon Code logic work?
**Answer:** In `CartContext.jsx`, the `applyCoupon(code)` method checks the trimmed string: if `SWEET10`, it applies a 10% discount; if `FIRST5`, it applies a 15% discount. The subtotal, discount, and final bill update dynamically.

### Q17: What is the purpose of the `aria-label` attribute?
**Answer:** `aria-label` provides an accessible text description for interactive elements (such as icon-only buttons or close triggers `X`) so assistive technologies like screen readers can announce their purpose to visually impaired users.

### Q18: What is the difference between `null` and `undefined` in JavaScript?
**Answer:** `undefined` means a variable has been declared but has not yet been assigned a value. `null` is an explicit assignment representing the intentional absence of any object value.

### Q19: What are Arrow Functions in ES6?
**Answer:** Arrow functions (`() => {}`) provide a concise syntax for writing function expressions. Unlike standard functions, they do not bind their own `this` keyword; they inherit `this` lexically from their enclosing scope.

### Q20: How does the Admin / Staff Portal work without a backend?
**Answer:** The Admin Portal is integrated into the client application. It reads orders directly from `localStorage.getItem('golden_crust_orders')`. When staff change an order's status from `Pending` to `Baking` or `Delivered`, the state updates and the modified array is saved back to `localStorage`.

### Q21: What is Destructuring Assignment in ES6?
**Answer:** Destructuring is syntax that allows unpacking properties from objects or arrays directly into distinct variables, e.g., `const { name, price } = product;` instead of `const name = product.name;`.

### Q22: What is the purpose of `package.json`?
**Answer:** It is the project manifest file. It lists project metadata, operational scripts (`dev`, `build`, `preview`), and direct library dependencies (`react`, `react-dom`, `lucide-react`).

### Q23: How do you achieve mobile responsiveness in your bakery website?
**Answer:** We use responsive CSS:
1. Flexible percentages and viewport units.
2. CSS Grid with `repeat(auto-fill, minmax(280px, 1fr))` for fluid product card wrapping.
3. Media queries (`@media (max-width: 768px)`) that adjust typography sizes and stack flex columns.

### Q24: What is an Asynchronous Function in JavaScript?
**Answer:** An asynchronous function executes in the background without blocking the single-threaded JavaScript execution loop, returning a Promise that resolves when the operation completes.

### Q25: Why is client-side validation important in web forms?
**Answer:** Client-side validation (e.g., verifying phone numbers, required email fields, and password lengths in `CheckoutModal.jsx` and `AuthModal.jsx`) provides instant, user-friendly feedback before submission without unnecessary processing delays.

### Q26: What is the spread operator (`...`) and where did you use it?
**Answer:** The spread operator expands an iterable (like an array or object) into individual elements. In `CartContext.jsx`, we use `[...prevCart, { product, quantity }]` to add a new item immutably without mutating the previous array.

### Q27: What is the difference between Inline, Internal, and External CSS?
**Answer:**
- **Inline:** Written directly within an HTML element's `style` attribute.
- **Internal:** Written inside a `<style>` tag in the `<head>` of an HTML document.
- **External:** Written in a separate `.css` file (like our `src/index.css`) and linked into the application. External CSS is best practice because it separates concerns and enables browser caching.

### Q28: How does your cart calculate whether delivery is Free?
**Answer:** In `CartContext.jsx`, we use a conditional ternary operator:
```javascript
const deliveryFee = subtotal > 35 || subtotal === 0 ? 0 : 3.50;
```
If the customer's items subtotal is greater than $35, delivery is automatically set to $0 (Free), encouraging larger orders.

### Q29: What happens if LocalStorage is empty when the website first opens?
**Answer:** We wrote fallback initializers. For example, in `MenuCatalog.jsx`:
```javascript
const saved = localStorage.getItem('golden_crust_products');
return saved ? JSON.parse(saved) : initialProducts;
```
If `localStorage` is empty or cleared, it gracefully falls back to `initialProducts` in `src/data/bakeryData.js`.

### Q30: What is Single Responsibility Principle in React components?
**Answer:** It is the principle that each component should be responsible for one specific UI piece or task. For example, `Navbar` only handles navigation, `MenuCatalog` only handles product display, and `CartDrawer` only handles shopping basket modifications.

---

## 10. Teacher "Gotcha" Live Coding Challenges & Solutions

Sometimes, a skeptical teacher will test if you really wrote the code by asking you to make a small change live on screen. Here are the most common requests and how to do them in 5 seconds:

### Challenge 1: "Change the price of the Sourdough Boule"
- **File to Open:** `src/data/bakeryData.js`
- **Line to Change:** Find `name: "Classic Sourdough Boule"` and change `price: 7.50` to `price: 8.99`.
- **Result:** Save the file (`Ctrl + S`), and Vite will hot-reload instantly on screen!

### Challenge 2: "Add a new coupon code named COLLEGE20 for 20% discount"
- **File to Open:** `src/context/CartContext.jsx`
- **Line to Change:** In the `applyCoupon` function, add:
  ```javascript
  else if (cleaned === 'COLLEGE20') {
    setDiscountPercent(0.20);
    setCouponMessage('🎉 College 20% discount applied!');
    return true;
  }
  ```

### Challenge 3: "Change the free delivery threshold from $35 to $50"
- **File to Open:** `src/context/CartContext.jsx`
- **Line to Change:** Find:
  ```javascript
  const deliveryFee = subtotal > 35 || subtotal === 0 ? 0 : 3.50;
  ```
  Change `35` to `50`.

### Challenge 4: "Change the primary theme color from Golden Honey Amber to Ruby Rose"
- **File to Open:** `src/index.css`
- **Line to Change:** Inside `:root`, change:
  ```css
  --color-primary: #854d0e;
  ```
  to:
  ```css
  --color-primary: #be123c;
  ```
  The entire website's primary buttons, highlights, and borders will instantly update!

---
*Prepared for Web Technology Coursework Submission & Viva Voce Examination.*
