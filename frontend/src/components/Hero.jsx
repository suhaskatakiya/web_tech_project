/**
 * Hero Section Component
 * Welcomes visitors with artisanal typography, call-to-actions,
 * freshness status indicators, and key bakery highlights.
 */

import React from 'react';
import { ArrowRight, Sparkles, Award, Clock } from 'lucide-react';

export default function Hero({ onExploreMenu, onOpenCustomCake }) {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-content">
            <div className="hero-pill">
              <span className="dot"></span>
              <span>Oven Fresh • Batch #3 Just Out of the Hearth</span>
            </div>

            <h1 className="hero-title">
              Baked With <span className="highlight">Patience</span>, Flour, & Pure Passion.
            </h1>

            <p className="hero-subtitle">
              Every morning at 4:00 AM, our master bakers fold 36-hour naturally fermented
              sourdough and hand-laminate French butter pastries. 100% pure ingredients,
              zero preservatives, and endless delight.
            </p>

            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={onExploreMenu}
                id="hero-explore-menu-btn"
              >
                <span>Explore Daily Bakes</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-secondary"
                onClick={onOpenCustomCake}
                id="hero-custom-cake-btn"
              >
                <Sparkles size={18} color="#b45309" />
                <span>Design Custom Cake</span>
              </button>
            </div>

            {/* Bakery Quality Highlights */}
            <div className="hero-features">
              <div className="hero-feature-item">
                <strong>36-Hr Ferment</strong>
                <span>Wild yeast artisan sourdough</span>
              </div>
              <div className="hero-feature-item">
                <strong>100% Organic</strong>
                <span>Stone-ground unbleached flour</span>
              </div>
              <div className="hero-feature-item">
                <strong>4.9 ★ Rating</strong>
                <span>Over 2,400+ happy neighborhood foodies</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80"
              alt="Freshly baked artisan sourdough bread and viennoiserie"
              className="hero-main-img"
            />

            {/* Floating Chef Card */}
            <div className="hero-floating-card">
              <div className="avatar-icon">👨‍🍳</div>
              <div>
                <h4>Chef Julian Vance</h4>
                <p>Head Baker & Master Patissier</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#b45309', fontSize: '0.75rem', fontWeight: '700' }}>
                  <Award size={13} /> Best Artisan Bakery 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
