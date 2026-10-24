/**
 * CartContext - Global State Management for Shopping Cart
 * Uses React Context API + localStorage for persisting cart items across reloads.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart state from browser localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('golden_crust_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('golden_crust_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Add item to cart or increment quantity if already in cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product._id === product._id);

      if (existingIndex > -1) {
        // Item exists, update quantity
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // New item, append to cart
        return [...prevCart, { product, quantity }];
      }
    });

    // Provide visual feedback by opening the cart or showing brief indicator
    setIsCartOpen(true);
  };

  // Adjust item quantity (+1 or -1)
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean); // Remove items reduced to 0
    });
  };

  // Remove single item completely from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  // Clear entire cart (e.g. after successful checkout)
  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage('');
  };

  // Apply discount coupon (e.g. 'SWEET10' for 10% off)
  const applyCoupon = (code) => {
    const cleaned = code.trim().toUpperCase();
    setCouponCode(cleaned);

    if (cleaned === 'SWEET10') {
      setDiscountPercent(0.10);
      setCouponMessage('🎉 Promo code SWEET10 applied: 10% discount!');
      return true;
    } else if (cleaned === 'FIRST5') {
      setDiscountPercent(0.15);
      setCouponMessage('🎉 Promo code FIRST5 applied: 15% discount!');
      return true;
    } else {
      setDiscountPercent(0);
      setCouponMessage('❌ Invalid coupon code. Try SWEET10 or FIRST5');
      return false;
    }
  };

  // Computed values using standard JavaScript reduce methods
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Number((subtotal * discountPercent).toFixed(2));
  const deliveryFee = subtotal > 35 || subtotal === 0 ? 0 : 3.50;
  const finalTotal = Number((subtotal - discountAmount + deliveryFee).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal: Number(subtotal.toFixed(2)),
        discountAmount,
        deliveryFee,
        finalTotal,
        couponCode,
        discountPercent,
        couponMessage,
        applyCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for convenient consumption
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
