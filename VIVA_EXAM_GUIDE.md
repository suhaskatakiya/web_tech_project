# 🎓 Web Technology Coursework: Viva Voce & Project Defense Guide
## Project: Golden Crust Artisan Bakery & Café (Full MERN Stack)

> **Important Note for the Student:**
> Read this guide carefully before your presentation. During your project viva, professors typically test whether you understand the code you wrote, why you chose specific libraries, and how data moves across the MERN stack. Every section below is written to give you clear, confident answers.

---

## 📑 Table of Contents
1. [Project Overview & Key Statistics](#1-project-overview--key-statistics)
2. [High-Level MERN Architecture & Request Life Cycle](#2-high-level-mern-architecture--request-life-cycle)
3. [Frontend Codebase Breakdown (React + Vite)](#3-frontend-codebase-breakdown-react--vite)
4. [React Hooks Used & Why](#4-react-hooks-used--why)
5. [Core JavaScript ES6+ Methods Used](#5-core-javascript-es6-methods-used)
6. [Backend Codebase Breakdown (Node.js + Express)](#6-backend-codebase-breakdown-nodejs--express)
7. [Database Schema & Mongoose Operations](#7-database-schema--mongoose-operations)
8. [Authentication, Security & JWT Flow](#8-authentication-security--jwt-flow)
9. [25 Most Common Viva Questions & Model Answers](#9-25-most-common-viva-questions--model-answers)
10. [How to Run the Project (Step-by-Step)](#10-how-to-run-the-project-step-by-step)

---

## 1. Project Overview & Key Statistics

- **Project Title:** Golden Crust Artisan Bakery Web Application
- **Technology Stack:**
  - **M** - MongoDB / Mongoose (NoSQL database for products, users, orders, reviews)
  - **E** - Express.js (REST API framework on Node.js)
  - **R** - React.js with Vite (Single Page Application UI)
  - **N** - Node.js (JavaScript server runtime environment)
- **Key Modules Implemented:**
  1. **Artisan Catalog:** Category filtering (*Cakes, Breads, Pastries, Cookies, Savory*), live text search, dietary filters (*Eggless, Vegan, Gluten-Free*), and sorting (*Price, Rating*).
  2. **Product Quick-View:** Modal showing nutritional info, allergen disclosures, and key ingredients.
  3. **Interactive Custom Cake Builder:** 4-step cake designer (flavor, weight, tiers, eggless, piped message, date) with live price estimation and quote submission.
  4. **Shopping Cart & Checkout:** Slide-over cart drawer, quantity increments/decrements, promo discount coupons (`SWEET10`, `FIRST5`), free shipping threshold, and checkout receipt generation.
  5. **Customer Reviews Module:** 5-star interactive rating and review submission.
  6. **Bakery Operations Portal (Staff/Admin):** Kitchen order tracking with live status toggles (*Pending ➔ Baking ➔ Out for Delivery ➔ Delivered*), and product catalog publishing.
  7. **User Authentication:** Registration and login with `bcryptjs` password hashing and `jsonwebtoken` (JWT).

---

## 2. High-Level MERN Architecture & Request Life Cycle

```
[ User Browser / React UI (Port 5173) ]
             │
             │ HTTP Request (fetch / REST API)
             ▼
[ Express.js Server (Port 5000) ]
      ├── cors() & express.json() Middleware
      ├── Route Matchers (/api/products, /api/orders, /api/auth, /api/reviews)
      ├── authMiddleware.js (JWT validation)
      └── Controllers (Business logic & calculations)
             │
             │ Mongoose Driver ODM
             ▼
[ MongoDB Database (Port 27017 / Atlas Cloud) ]
  (Collections: products, orders, users, reviews)
```

### The 7-Step Request/Response Cycle (Explain this to the teacher!):
1. **Trigger:** The customer clicks "Add to Cart" or "Place Order" in React.
2. **Client Dispatch:** React calls `fetch('/api/orders', { method: 'POST', body: ... })`.
3. **CORS & JSON Parsing:** Express middleware parses the incoming JSON request body and validates that the origin is allowed.
4. **Routing:** The request hits `server.js` ➔ forwards to `orderRoutes.js` ➔ calls `orderController.js -> createOrder()`.
5. **Business Logic & Validation:** The controller verifies cart items, calculates subtotal, checks discount coupons, and prepares the order document.
6. **Database Persistence:** Mongoose executes `Order.create(orderPayload)` to save the document into MongoDB.
7. **Client State Update:** Express responds with `res.status(201).json({ success: true, data: newOrder })`. React receives the JSON, updates state, clears the cart, and renders the confirmation receipt modal!

---

## 3. Frontend Codebase Breakdown (React + Vite)

### File Structure:
- `frontend/src/index.css`: Handcrafted Vanilla CSS design system (warm sourdough ivory `#fffdf9`, dark cocoa `#3e2723`, golden honey amber `#854d0e`). Uses CSS custom properties (`:root`), flexbox, CSS grid, and responsive media queries.
- `frontend/src/context/CartContext.jsx`: Global state container for shopping cart items, persistence via `localStorage`, quantity controls, and coupon math.
- `frontend/src/context/AuthContext.jsx`: Manages logged-in user session, JWT token in `localStorage`, login, registration, and logout.
- `frontend/src/components/Navbar.jsx`: Header with brand logo, section anchors, staff portal toggle, user sign-in, and cart item counter badge.
- `frontend/src/components/Hero.jsx`: Artisanal banner with live oven batch indicators, primary call-to-actions, and bakery quality badges.
- `frontend/src/components/MenuCatalog.jsx`: Filterable product grid with category pills, live keyword search, dietary dropdown, and price sorting.
- `frontend/src/components/ProductModal.jsx`: Quick-view popup displaying ingredients, calories, allergens, and quantity selection.
- `frontend/src/components/CustomCakeBuilder.jsx`: Step-by-step interactive bespoke cake customizer with live price formula and booking quote generator.
- `frontend/src/components/CartDrawer.jsx`: Slide-out panel for modifying cart items, applying coupon codes, and bill breakdown.
- `frontend/src/components/CheckoutModal.jsx`: Delivery address collection, payment method selector (COD/UPI/Card), order submission, and receipt view.
- `frontend/src/components/CustomerReviews.jsx`: Community testimonials and interactive review submission with 5-star picker.
- `frontend/src/components/AdminDashboard.jsx`: Staff operations dashboard with operational metrics, live kitchen order status updates, and catalog publishing form.
- `frontend/src/components/AuthModal.jsx`: Login/register popup with 1-click demo account filler buttons for quick viva testing.
- `frontend/src/App.jsx`: Top-level component wrapping `AuthProvider` and `CartProvider` and coordinating page layout.

---

## 4. React Hooks Used & Why

During viva, teachers almost **always** ask about React hooks:

### 1. `useState`
- **What it is:** React's built-in hook to declare state variables that trigger UI re-renders when updated.
- **Where we used it:**
  - `const [cart, setCart] = useState(...)` in `CartContext.jsx` to store basket items.
  - `const [selectedCategory, setSelectedCategory] = useState('All')` in `MenuCatalog.jsx` for category filtering.
  - `const [flavor, setFlavor] = useState('Belgian Dark Truffle')` in `CustomCakeBuilder.jsx` for live customization.

### 2. `useEffect`
- **What it is:** Executes side effects after components render (such as fetching data from APIs, subscribing to events, or saving to localStorage).
- **Where we used it:**
  - `useEffect(() => { fetchCatalog(); }, [])` in `MenuCatalog.jsx`: Runs once on component mount to load products from `/api/products`.
  - `useEffect(() => { localStorage.setItem('golden_crust_cart', JSON.stringify(cart)); }, [cart])` in `CartContext.jsx`: Automatically synchronizes cart items to the browser's localStorage whenever `cart` changes.

### 3. `useContext`
- **What it is:** Consumes state from a React Context without passing props down through multiple layers of components (prevents "prop drilling").
- **Where we used it:**
  - `useCart()` custom hook allows any component (`Navbar`, `MenuCatalog`, `ProductModal`, `CartDrawer`) to directly access cart items and call `addToCart()`.
  - `useAuth()` custom hook allows checking `isAuthenticated` and accessing user data anywhere.

### 4. `useMemo`
- **What it is:** Memoizes computed values so heavy calculations are not repeated on every render unless their dependencies change.
- **Where we used it:**
  - In `MenuCatalog.jsx` to filter and sort the products list only when `products`, `selectedCategory`, `selectedDiet`, `searchTerm`, or `sortBy` change.

---

## 5. Core JavaScript ES6+ Methods Used

Teachers love asking: *"Which JavaScript array methods did you use and why?"*

1. **`.map()`**:
   - Used to render dynamic lists of JSX elements.
   - Example: `{filteredProducts.map(product => <div key={product._id}>...</div>)}`
2. **`.filter()`**:
   - Used to filter arrays by condition without modifying the original array.
   - Example: Filtering products by category: `products.filter(item => item.category === selectedCategory)`
   - Example: Removing an item from cart: `cart.filter(item => item.product._id !== productId)`
3. **`.reduce()`**:
   - Used to calculate a single cumulative aggregate value from an array of objects.
   - Example (Cart items total): `cart.reduce((sum, item) => sum + item.quantity, 0)`
   - Example (Cart subtotal): `cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)`
   - Example (Admin revenue): `orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)`
4. **`.find()` / `.findIndex()`**:
   - Returns the first element or index that matches a test function.
   - Example: Checking if a product is already in the cart before deciding to increment its quantity or add a new entry.
5. **Spread Operator (`...`)**:
   - Creates shallow copies of arrays and objects immutably.
   - Example: `[...prevCart, { product, quantity }]`
6. **Destructuring**:
   - Unpacking properties from objects: `const { customerName, items, paymentMethod } = req.body;`
7. **`async / await` and Promises**:
   - Simplifies asynchronous code for HTTP network calls with `fetch` and database queries with Mongoose.

---

## 6. Backend Codebase Breakdown (Node.js + Express)

### File Structure:
- `backend/server.js`: Main Express entry point. Loads `.env`, connects to DB, configures middleware (`cors`, `express.json`), mounts routes, and starts HTTP server on port 5000.
- `backend/config/db.js`: Mongoose connection handler. If connected, automatically seeds 12 bakery products and reviews if collections are empty. Features non-blocking fallback handling.
- `backend/config/fallbackStore.js`: Built-in in-memory bakery data store that guarantees the application works smoothly even if MongoDB service is stopped on a lab computer.
- `backend/models/`:
  - `Product.js`: Schema for bakery items (name, price, category, dietary, ingredients, allergens, rating, calories).
  - `Order.js`: Schema for customer orders (orderId, customer details, delivery address, items array, subtotal, discount, delivery fee, status).
  - `User.js`: Schema for users with bcrypt password hashing pre-save hook and `comparePassword` method.
  - `Review.js`: Schema for customer feedback and ratings.
- `backend/controllers/`:
  - `productController.js`: CRUD logic, keyword search with `$regex`, category/dietary filtering, and sorting.
  - `orderController.js`: Order bill calculation, coupon verification, order placement, and kitchen status updates.
  - `authController.js`: User registration, password verification with bcrypt, and JWT token signing.
  - `reviewController.js`: Customer reviews and bespoke cake inquiry quote calculations.
- `backend/routes/`:
  - `productRoutes.js`: Maps `GET /api/products`, `POST /api/products`, `GET /api/products/:id`, `DELETE /api/products/:id`.
  - `orderRoutes.js`: Maps `GET /api/orders`, `POST /api/orders`, `GET /api/orders/:id`, `PATCH /api/orders/:id/status`.
  - `authRoutes.js`: Maps `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`.
  - `reviewRoutes.js`: Maps `GET /api/reviews`, `POST /api/reviews`, `POST /api/reviews/custom-cake`.
- `backend/middleware/`:
  - `authMiddleware.js`: Verifies `Bearer <JWT_TOKEN>` in Authorization header.
  - `errorHandler.js`: Intercepts 404 Not Found and internal server errors, formatting them as clean JSON.

---

## 7. Database Schema & Mongoose Operations

### Question: *"Explain your Mongoose Schema and Models."*
**Answer:**
A Mongoose **Schema** defines the structure, data types, and validation rules of documents inside a MongoDB collection. A Mongoose **Model** is a compiled wrapper on top of the Schema that provides methods to create, query, update, and delete database records.

### Key Mongoose Methods Used:
1. `Product.find(query)`: Queries documents matching search criteria.
2. `Product.findById(id)`: Fetches a single document by its unique MongoDB `_id`.
3. `Product.create(data)`: Validates and inserts a new document.
4. `Product.findByIdAndDelete(id)`: Removes a product from the database.
5. `Order.findByIdAndUpdate(id, { status }, { new: true })`: Updates kitchen status and returns the modified document.
6. `User.findOne({ email })`: Checks if an account already exists during registration or login.
7. `userSchema.pre('save', async function(next) { ... })`: Mongoose lifecycle hook that automatically encrypts passwords using bcrypt before saving.

---

## 8. Authentication, Security & JWT Flow

### Question: *"How does authentication work in your application?"*
**Answer:**
1. **Password Hashing:** We never store plain text passwords. When a user registers, Mongoose's `pre('save')` hook generates a cryptographic salt (`bcrypt.genSalt(10)`) and hashes the password (`bcrypt.hash()`).
2. **Token Generation:** When logging in, `bcrypt.compare()` compares the plain password candidate with the stored hash. If valid, the server signs a **JSON Web Token (JWT)** using `jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' })`.
3. **Client Storage:** The frontend receives the JWT and stores it in `localStorage`.
4. **Protected Requests:** When accessing protected routes, the frontend sends the token in the HTTP Authorization header: `Authorization: Bearer <TOKEN>`.
5. **Middleware Verification:** `authMiddleware.js` intercepts the request, calls `jwt.verify(token, JWT_SECRET)`, extracts the user ID, and attaches the user object to `req.user`.

---

## 9. 25 Most Common Viva Questions & Model Answers

### Q1: What does MERN stand for?
**Ans:** MongoDB (database), Express.js (backend web framework), React.js (frontend user interface library), and Node.js (JavaScript runtime environment).

### Q2: What is CORS and why is it needed?
**Ans:** CORS stands for Cross-Origin Resource Sharing. Browsers enforce a security mechanism called Same-Origin Policy that prevents a web page on one domain/port (e.g., React on `http://localhost:5173`) from making AJAX requests to a different domain/port (e.g., Express on `http://localhost:5000`). We used the `cors` package in Express to explicitly allow cross-origin requests.

### Q3: What is the difference between State and Props in React?
**Ans:** 
- **Props (Properties):** Read-only data passed from a parent component down to a child component (unidirectional data flow).
- **State:** Mutable data managed internally within a component that can change over time based on user interactions, triggering a re-render.

### Q4: Why did you use React Context instead of Redux?
**Ans:** React Context is built natively into React and provides lightweight global state management for the shopping cart and user authentication without the heavy boilerplate and bundle size of Redux, making it clean, efficient, and maintainable.

### Q5: What is the purpose of `express.json()` middleware?
**Ans:** By default, Node.js receives HTTP request bodies as raw binary data streams. `express.json()` parses incoming HTTP requests with JSON payloads and converts them into JavaScript objects accessible via `req.body`.

### Q6: What is the difference between SQL and NoSQL (MongoDB)?
**Ans:** SQL databases (like MySQL/PostgreSQL) are relational, table-based, and require strict predefined schemas with joins. MongoDB is a NoSQL, document-oriented database that stores records as flexible BSON/JSON-like documents, which maps naturally to JavaScript objects in a MERN stack.

### Q7: Why do you store JWT in `localStorage`?
**Ans:** Storing the JWT token in `localStorage` allows the user session to persist across page refreshes and browser tab closures, ensuring the customer stays logged in without needing to re-enter credentials.

### Q8: What does the HTTP Status Code 200, 201, 400, 401, 404, and 500 mean?
**Ans:**
- **200 OK:** Request succeeded (e.g., fetched catalog).
- **201 Created:** New resource successfully created (e.g., new order placed, user registered).
- **400 Bad Request:** Missing or invalid request data sent by the client.
- **401 Unauthorized:** Missing or invalid authentication token.
- **404 Not Found:** Requested route or database item does not exist.
- **500 Internal Server Error:** Unexpected failure or unhandled exception on the server.

### Q9: How does the Shopping Cart persist when I refresh the page?
**Ans:** In `CartContext.jsx`, we initialize the cart state by reading from `localStorage.getItem('golden_crust_cart')` using `JSON.parse()`. A `useEffect` hook with `[cart]` as a dependency listens for any cart changes and writes the serialized cart back into `localStorage.setItem()`.

### Q10: What is the difference between `PUT` and `PATCH` HTTP methods?
**Ans:** `PUT` replaces the entire target resource with the new payload. `PATCH` applies partial modifications to a resource. In our project, we used `PATCH /api/orders/:id/status` because we only modify the `status` field of the order document.

### Q11: What is a Mongoose Virtual or Pre-hook?
**Ans:** A Mongoose pre-hook (`pre('save')`) is middleware that executes before an operation is committed to the database. We used `userSchema.pre('save')` to hash passwords with `bcryptjs` before writing them to disk.

### Q12: How does keyword search work on the menu?
**Ans:** The search query filters both product names and descriptions. In the frontend, it uses `.includes(searchTerm.toLowerCase())`. In MongoDB, it uses regular expressions: `{ name: { $regex: search, $options: 'i' } }` where `'i'` signifies case-insensitivity.

### Q13: What is the difference between synchronous and asynchronous code?
**Ans:** Synchronous code executes sequentially line-by-line, blocking subsequent instructions until the current one finishes. Asynchronous code allows time-consuming operations (like database queries or network requests) to run in the background, executing a callback or resolving a Promise (`async/await`) when finished without freezing the thread.

### Q14: What is the purpose of the `.env` file?
**Ans:** The `.env` file stores environment variables such as `PORT`, `MONGO_URI`, and `JWT_SECRET`. This keeps sensitive secrets out of source code repositories and allows different configurations across development, testing, and production.

### Q15: How does the Custom Cake Builder calculate live prices?
**Ans:** It uses a dynamic calculation function in `CustomCakeBuilder.jsx`:
`price = (basePrice * weightFactor) * tierMultiplier + egglessCharge`. As the user changes dropdown selections, React's `useState` triggers an instant recalculation and UI update.

### Q16: How do you handle errors centrally in Express?
**Ans:** We created `errorHandler.js` middleware with four arguments `(err, req, res, next)`. When any controller encounters an error, it passes it to `next(error)`. Express routes the exception to our centralized error handler, which sends a structured JSON response `{ success: false, message: err.message }`.

### Q17: What is the purpose of `package.json`?
**Ans:** It is the project manifest file in Node.js. It records project metadata, scripts (`start`, `dev`, `build`), and explicit dependency packages and version ranges.

### Q18: What is Vite and why did you choose it over Create React App (CRA)?
**Ans:** Vite is a modern frontend build tool that leverages native ES modules in the browser. It provides near-instant server starts, lightning-fast Hot Module Replacement (HMR), and optimized production builds with Rollup, unlike Create React App which is deprecated and significantly slower.

### Q19: What is `npm`?
**Ans:** Node Package Manager (NPM) is the default package manager and registry for Node.js, used to install, update, and manage third-party open-source libraries.

### Q20: How does the Admin Portal work?
**Ans:** The Admin Portal is an operational dashboard toggled via the "Staff Portal" button in the navbar. It fetches orders from `/api/orders`, renders them in an administrative table, and allows kitchen staff to update orders from `Pending` to `Baking`, `Out for Delivery`, or `Delivered`. It also contains a form to publish new bakery items directly into the MongoDB catalog.

### Q21: What is a Single Page Application (SPA)?
**Ans:** An SPA is a web application that loads a single HTML page (`index.html`) and dynamically updates the Document Object Model (DOM) as the user interacts with the app, eliminating full page reloads and providing a smoother user experience.

### Q22: What are CSS Custom Properties?
**Ans:** Also known as CSS variables (e.g. `--color-primary: #854d0e;`), they allow values to be stored in one place (`:root`) and reused throughout the stylesheet, making the design system consistent and easy to maintain.

### Q23: How do you prevent SQL injection / NoSQL injection?
**Ans:** By using Mongoose Schemas with strict type definitions and parameter binding instead of string concatenation, Mongoose automatically sanitizes inputs and rejects malformed fields.

### Q24: What is the role of `server.js`?
**Ans:** It is the entry point of the backend server. It boots the Express application, applies global middleware, connects to MongoDB, mounts route handlers, and binds the HTTP port listener.

### Q25: What happens if MongoDB is offline on the teacher's evaluation computer?
**Ans:** Our backend includes an integrated, zero-downtime fallback data store (`fallbackStore.js`) in `db.js`. If local MongoDB is not running, the server detects it gracefully, logs a notice, and activates the in-memory store so that catalog browsing, ordering, and admin status updates continue functioning seamlessly without crashing.

---

## 10. How to Run the Project (Step-by-Step)

### Terminal 1: Start the Backend (Port 5000)
```bash
cd backend
npm install
npm run dev
# or: node server.js
```
*Backend runs on: `http://localhost:5000`*

### Terminal 2: Start the Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

### Evaluation Credentials for Quick Testing:
- **Customer Account:** `customer@goldencrust.com` / `bakery123`
- **Admin / Staff Account:** `admin@goldencrust.com` / `admin123`
- **Discount Coupons:** `SWEET10` (10% off), `FIRST5` (15% off)

---
*Prepared for Web Technology Coursework Submission & Viva Voce.*
