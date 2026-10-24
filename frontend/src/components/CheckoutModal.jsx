/**
 * CheckoutModal Component
 * Collects delivery address and payment choice, submits order to backend API,
 * and renders an elegant order confirmation receipt upon completion.
 */

import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, subtotal, discountAmount, deliveryFee, finalTotal, couponCode, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address || '');
  const [city, setCity] = useState('Downtown');
  const [postalCode, setPostalCode] = useState('560001');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!customerName || !customerEmail || !customerPhone || !street) {
      setError('Please provide your name, email, phone number, and street delivery address.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: { street, city, postalCode },
        items: cart.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        paymentMethod,
        specialInstructions,
        couponCode
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order.');
      }

      setConfirmedOrder(data.data);
      clearCart();
    } catch (err) {
      setError(err.message || 'Order failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!confirmedOrder ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#b45309', textTransform: 'uppercase' }}>
                Express Hearth Delivery
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#3e2723' }}>Bakery Checkout</h2>
              <p style={{ color: '#6b5e59', fontSize: '0.9rem' }}>
                Please confirm where you would like your freshly baked goods delivered.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder}>
              {/* Customer Contact */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Liam Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="liam@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              {/* Delivery Address */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                  Street Address & House / Flat # *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 104 Willow Terrace, Indiranagar"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.4rem', color: '#3e2723' }}>
                  Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      border: paymentMethod === 'COD' ? '2px solid #b45309' : '1px solid #ede4d8',
                      background: paymentMethod === 'COD' ? '#fef3c7' : '#ffffff',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: '#3e2723'
                    }}
                  >
                    <Banknote size={18} color="#b45309" />
                    Cash on Delivery
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      border: paymentMethod === 'UPI' ? '2px solid #b45309' : '1px solid #ede4d8',
                      background: paymentMethod === 'UPI' ? '#fef3c7' : '#ffffff',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: '#3e2723'
                    }}
                  >
                    <QrCode size={18} color="#b45309" />
                    UPI / QR Code
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      border: paymentMethod === 'Card' ? '2px solid #b45309' : '1px solid #ede4d8',
                      background: paymentMethod === 'Card' ? '#fef3c7' : '#ffffff',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: '#3e2723'
                    }}
                  >
                    <CreditCard size={18} color="#b45309" />
                    Online Card
                  </button>
                </div>
              </div>

              {/* Order Total Quick Summary */}
              <div style={{ background: '#fdfaf5', padding: '1rem', borderRadius: '10px', border: '1px solid #ede4d8', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6b5e59', marginBottom: '0.25rem' }}>
                  <span>Items Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#15803d', marginBottom: '0.25rem' }}>
                    <span>Discount Applied:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6b5e59', marginBottom: '0.25rem' }}>
                  <span>Delivery Charge:</span>
                  <span>{deliveryFee === 0 ? 'FREE (Orders > $35)' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#3e2723', borderTop: '1px dashed #ede4d8', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                  <span>Amount to Pay:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <p style={{ color: '#b91c1c', fontSize: '0.88rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '0.85rem' }}
                id="place-order-submit-btn"
              >
                {loading ? 'Processing Bakery Order...' : `Confirm & Place Order ($${finalTotal.toFixed(2)})`}
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '1.75rem', color: '#3e2723', marginBottom: '0.4rem' }}>
              Order Placed Successfully!
            </h2>

            <p style={{ color: '#6b5e59', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
              Our bakers have received your ticket and are preparing your fresh treats right now.
            </p>

            {/* Receipt Box */}
            <div style={{ background: '#fdfaf5', border: '1.5px solid #ede4d8', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ede4d8', paddingBottom: '0.65rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#8c7e75' }}>Order Tracking Ref:</span>
                <strong style={{ color: '#b45309', fontFamily: 'monospace', fontSize: '1rem' }}>{confirmedOrder.orderId}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#6b5e59' }}>Customer:</span>
                <strong>{confirmedOrder.customerName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#6b5e59' }}>Delivery Destination:</span>
                <span>{confirmedOrder.deliveryAddress.street}, {confirmedOrder.deliveryAddress.city}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#6b5e59' }}>Payment Method:</span>
                <span style={{ fontWeight: '600' }}>{confirmedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#6b5e59' }}>Estimated Delivery:</span>
                <span style={{ color: '#15803d', fontWeight: '700' }}>{confirmedOrder.estimatedDelivery || '35 - 50 mins'}</span>
              </div>

              <div style={{ borderTop: '1px solid #ede4d8', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '0.4rem', color: '#3e2723' }}>Items in this batch:</h4>
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#4b3f3b', marginBottom: '0.2rem' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#3e2723', borderTop: '1px dashed #ede4d8', paddingTop: '0.65rem', marginTop: '0.65rem' }}>
                <span>Total Paid:</span>
                <span>${confirmedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleFinish}
              style={{ width: '100%', padding: '0.85rem' }}
              id="finish-order-btn"
            >
              Continue Browsing Bakery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
