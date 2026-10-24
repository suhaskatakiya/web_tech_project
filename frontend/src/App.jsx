/**
 * Golden Crust Bakery - Main React Application Component
 * 
 * Hierarchy:
 * - AuthProvider (Manages user authentication and JWT token)
 *   - CartProvider (Manages cart items, quantities, and localStorage)
 *     - Navbar (Header navigation and badges)
 *     - Main Content (Customer Storefront OR Admin Dashboard)
 *     - Footer (Bakery info, hours, and student credit)
 *     - CartDrawer (Slide-in shopping cart)
 *     - AuthModal (Login & Registration modal)
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuCatalog from './components/MenuCatalog';
import CustomCakeBuilder from './components/CustomCakeBuilder';
import CustomerReviews from './components/CustomerReviews';
import AdminDashboard from './components/AdminDashboard';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function BakeryApp() {
  // Toggle between customer-facing storefront and bakery admin/staff portal
  const [isAdminView, setIsAdminView] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setIsAdminView(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="bakery-app-root">
      {/* 1. Header Navigation */}
      <Navbar isAdminView={isAdminView} setIsAdminView={setIsAdminView} />

      {/* 2. Main Page Content */}
      <main>
        {isAdminView ? (
          // Admin & Kitchen Management Portal
          <AdminDashboard />
        ) : (
          // Customer Facing Artisan Storefront
          <>
            <Hero
              onExploreMenu={() => scrollToSection('menu')}
              onOpenCustomCake={() => scrollToSection('custom-cakes')}
            />
            <MenuCatalog />
            <CustomCakeBuilder />
            <CustomerReviews />
          </>
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Modals and Drawers */}
      <CartDrawer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BakeryApp />
      </CartProvider>
    </AuthProvider>
  );
}
