/**
 * CustomerReviews Component
 * Displays genuine customer feedback, star ratings, and an interactive
 * review submission form persisting feedback in LocalStorage.
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { initialReviews } from '../data/bakeryData';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('golden_crust_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('golden_crust_reviews', JSON.stringify(reviews));
    } catch (err) {
      console.error('Failed to save reviews to localStorage:', err);
    }
  }, [reviews]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || !comment.trim()) {
      setErrorMsg('Please enter your name and a brief review message.');
      return;
    }

    const newReview = {
      _id: 'rev_' + Date.now(),
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setReviews((prev) => [newReview, ...prev]);
    setSuccessMsg('🎉 Thank you for your review! Your feedback warms our bakery.');
    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <p className="section-tag">Loved By Neighbors & Foodies</p>
          <h2 className="section-title">Words From Our Community</h2>
          <p className="section-subtitle">
            See what customers have to say about our 36-hour sourdough, celebration cakes,
            and morning flaky butter croissants.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((r) => (
            <div key={r._id || Math.random()} className="review-card">
              <div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(r.rating) ? '#f59e0b' : 'none'}
                      color="#f59e0b"
                    />
                  ))}
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', marginLeft: '0.4rem', color: '#b45309' }}>
                    {r.rating}.0
                  </span>
                </div>

                <p className="review-comment">"{r.comment}"</p>
              </div>

              <div className="reviewer-meta">
                <div>
                  <span className="reviewer-name">{r.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#15803d', display: 'block', fontWeight: '600' }}>
                    ✓ Verified Customer
                  </span>
                </div>
                <span className="review-date">
                  {r.date || 'Recently'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Box */}
        <div className="add-review-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#3e2723' }}>
            <MessageSquare size={20} color="#b45309" />
            <h3 style={{ fontSize: '1.3rem' }}>Leave a Bakery Review</h3>
          </div>

          {successMsg && (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmitReview}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                  Star Rating (1 - 5)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingTop: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{ background: 'transparent', padding: '0.2rem' }}
                    >
                      <Star
                        size={22}
                        fill={star <= rating ? '#f59e0b' : 'none'}
                        color="#f59e0b"
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#b45309', marginLeft: '0.3rem' }}>
                    {rating} Stars
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: '#3e2723' }}>
                Your Review & Tasting Experience *
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the crust, the flavor, or your custom cake experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              id="submit-review-btn"
            >
              <Send size={16} />
              <span>Submit Customer Review</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
