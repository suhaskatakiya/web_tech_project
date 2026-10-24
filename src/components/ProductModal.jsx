/**
 * ProductModal Component (Quick View)
 * Displays detailed information about a selected bakery product:
 * ingredients list, allergen information, calorie count, and add-to-cart action.
 */

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, AlertCircle, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
        style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Hero Image */}
        <div style={{ height: '260px', width: '100%', position: 'relative' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', display: 'flex', gap: '0.5rem' }}>
            {product.isEggless && <span className="badge badge-eggless">100% Eggless</span>}
            {product.dietary === 'Vegan' && <span className="badge badge-vegan">Vegan</span>}
            {product.dietary === 'Gluten-Free' && <span className="badge badge-gluten-free">Gluten-Free</span>}
            {product.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
          </div>
        </div>

        {/* Modal Details Body */}
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#854d0e', textTransform: 'uppercase' }}>
              {product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#b45309', fontWeight: '700', fontSize: '0.9rem' }}>
              <Star size={16} fill="#b45309" />
              <span>{product.rating}</span>
              <span style={{ color: '#8c7e75', fontWeight: '400', fontSize: '0.8rem' }}>({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: '#3e2723' }}>
            {product.name}
          </h2>

          <p style={{ color: '#6b5e59', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Key Nutritional & Recipe Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', background: '#fdfaf5', padding: '1rem', borderRadius: '12px', border: '1px solid #ede4d8', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#b45309', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                <Flame size={15} /> Energy & Nutrition
              </div>
              <p style={{ fontSize: '0.88rem', color: '#3e2723' }}>{product.calories || '260 kcal/serving'}</p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#b45309', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                <AlertCircle size={15} /> Allergen Info
              </div>
              <p style={{ fontSize: '0.88rem', color: '#3e2723' }}>
                {Array.isArray(product.allergens) && product.allergens.length > 0
                  ? product.allergens.join(', ')
                  : 'Gluten, Dairy (traces)'}
              </p>
            </div>
          </div>

          {/* Ingredients List */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#3e2723' }}>Key Artisanal Ingredients:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {(Array.isArray(product.ingredients) ? product.ingredients : product.ingredients.split(',')).map((ing, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontWeight: '500'
                    }}
                  >
                    {ing.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & Add to Cart Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #ede4d8', paddingTop: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#8c7e75', display: 'block' }}>Fresh Batch Price</span>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#3e2723' }}>
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Quantity Counter */}
              <div style={{ display: 'flex', alignItems: 'center', background: '#f5ede4', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ background: 'transparent', fontWeight: '700', fontSize: '1.1rem', padding: '0 0.4rem' }}
                >
                  -
                </button>
                <span style={{ fontWeight: '700', padding: '0 0.6rem', fontSize: '0.95rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ background: 'transparent', fontWeight: '700', fontSize: '1.1rem', padding: '0 0.4rem' }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                id="modal-add-to-cart-btn"
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
