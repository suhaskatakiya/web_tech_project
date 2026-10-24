/**
 * Footer Component
 * Displays bakery story, business hours, quick links, contact info,
 * and academic coursework attribution.
 */

import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h2>🥐 Golden Crust Bakery</h2>
            <p>
              Handcrafting traditional 36-hour fermented wild yeast sourdough, French AOP butter
              viennoiserie, and bespoke celebration cakes with 100% natural ingredients.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                🌾 100% Organic Flours
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                🌱 Eggless Specialists
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Daily Bakes Catalog</a></li>
              <li><a href="#custom-cakes">Bespoke Cake Designer</a></li>
              <li><a href="#reviews">Community Reviews</a></li>
              <li><a href="#about">About Our Hearth</a></li>
            </ul>
          </div>

          {/* Bakery Hours */}
          <div className="footer-col">
            <h4>Bakery Hearth Hours</h4>
            <ul style={{ fontSize: '0.88rem', color: '#d7ccc8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} color="#fde68a" />
                <span>Monday - Friday:</span>
              </li>
              <li style={{ paddingLeft: '1.4rem', color: '#ffffff', fontWeight: '600' }}>
                6:30 AM – 9:00 PM
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                <Clock size={15} color="#fde68a" />
                <span>Saturday - Sunday:</span>
              </li>
              <li style={{ paddingLeft: '1.4rem', color: '#ffffff', fontWeight: '600' }}>
                7:00 AM – 10:00 PM
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="footer-col">
            <h4>Visit Our Bakery</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem' }}>
                <MapPin size={16} color="#fde68a" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <span>42 Baker Street, Indiranagar, Bengaluru, 560038</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                <Phone size={16} color="#fde68a" />
                <span>+91 (080) 2548-BAKE</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                <Mail size={16} color="#fde68a" />
                <span>orders@goldencrustbakery.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Academic Attribution */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Golden Crust Artisan Bakery & Café. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Crafted with <Heart size={14} color="#f87171" fill="#f87171" /> using the <strong>MERN Stack</strong> for Web Technology Coursework.
          </p>
        </div>
      </div>
    </footer>
  );
}
