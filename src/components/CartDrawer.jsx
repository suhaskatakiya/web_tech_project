/**
 * CartDrawer Component
 * Interactive slide-over cart drawer. Allows quantity adjustment,
 * removing products, applying discount promo coupons, and opening checkout.
 */

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    couponCode,
    couponMessage,
    applyCoupon
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode);
    }
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      {/* Background Dimmer */}
      <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
        {/* Slide-in Drawer */}
        <div
          className="cart-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={20} color="#b45309" />
              <h3 style={{ fontSize: '1.25rem', color: '#3e2723' }}>Your Bread Basket</h3>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Cart"
              style={{ position: 'static' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="cart-items-list">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#8c7e75' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.8rem' }}>🧺</span>
                <h4 style={{ fontSize: '1.15rem', color: '#3e2723', marginBottom: '0.4rem' }}>
                  Your basket is empty
                </h4>
                <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Add freshly baked artisan sourdough or sweet treats from our menu to begin.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Browse Fresh Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product._id} className="cart-item-row">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <span className="cart-item-price">${item.product.price.toFixed(2)} each</span>
                  </div>

                  {/* Quantity Adjustment Buttons */}
                  <div className="cart-qty-controls">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.product._id, -1)}
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', padding: '0 0.3rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.product._id, 1)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    style={{ background: 'transparent', color: '#a89f91', padding: '0.3rem' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown (if items in cart) */}
          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Tag size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#8c7e75' }} />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. SWEET10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{ width: '100%', paddingLeft: '2.2rem', fontSize: '0.85rem' }}
                  />
                </div>
                <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 0.9rem' }}>
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p style={{ fontSize: '0.78rem', marginBottom: '0.75rem', color: discountAmount > 0 ? '#15803d' : '#b91c1c' }}>
                  {couponMessage}
                </p>
              )}

              {/* Bill Line Items */}
              <div className="cart-bill-line">
                <span>Items Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="cart-bill-line" style={{ color: '#15803d' }}>
                  <span>Promo Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart-bill-line">
                <span>Express Hearth Delivery:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="cart-bill-line total">
                <span>Final Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleOpenCheckout}
                style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
                id="drawer-proceed-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
