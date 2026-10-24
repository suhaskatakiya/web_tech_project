/**
 * Navbar Component
 * Displays brand logo, navigation anchor links, admin view toggle,
 * user authentication button, and shopping cart trigger with badge.
 */

import React from 'react';
import { ShoppingBag, User as UserIcon, Shield, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ isAdminView, setIsAdminView }) {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout, setIsAuthModalOpen, setAuthMode } = useAuth();

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo & Title */}
        <a href="#home" className="brand-logo" id="nav-brand-logo">
          <div className="brand-icon-wrapper">
            🥐
          </div>
          <div className="brand-text">
            <h1>Golden Crust</h1>
            <span>Artisan Bakery & Patisserie</span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#menu" className="nav-link">Daily Bakes</a></li>
            <li><a href="#custom-cakes" className="nav-link">Custom Cakes</a></li>
            <li><a href="#reviews" className="nav-link">Reviews</a></li>
            <li><a href="#about" className="nav-link">Our Story</a></li>
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Admin Panel Toggle */}
          <button
            className={`btn btn-sm ${isAdminView ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsAdminView(!isAdminView)}
            title="Toggle Bakery Staff / Admin Mode"
            id="admin-toggle-btn"
          >
            <Shield size={16} />
            <span>{isAdminView ? 'Customer Store' : 'Staff Portal'}</span>
          </button>

          {/* User Profile / Auth Button */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  padding: '0.4rem 0.8rem',
                  background: '#fef3c7',
                  borderRadius: '9999px',
                  color: '#92400e'
                }}
              >
                <UserIcon size={14} />
                <span>{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="btn btn-sm btn-secondary"
                title="Log Out"
                style={{ padding: '0.45rem' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenLogin}
              className="btn btn-sm btn-secondary"
              id="user-login-trigger"
            >
              <UserIcon size={16} />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="cart-btn-trigger"
            aria-label="Open Shopping Cart"
            id="open-cart-btn"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="cart-counter-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
