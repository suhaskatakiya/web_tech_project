/**
 * CustomCakeBuilder Component
 * Interactive celebration cake designer. Customers customize flavor,
 * weight, tiers, frosting, eggless preference, piped message, and date.
 * Features real-time price estimation and order submission.
 */

import React, { useState } from 'react';
import { Cake, Sparkles, Calendar, CheckCircle2, Heart } from 'lucide-react';

const FLAVORS = [
  { id: 'Belgian Dark Truffle', name: 'Belgian Dark Truffle', desc: '70% Callebaut Ganache' },
  { id: 'Madagascar Vanilla Bean', name: 'Madagascar Vanilla Bean', desc: 'Pure Bourbon Vanilla' },
  { id: 'Red Velvet Romance', name: 'Red Velvet Romance', desc: 'Tangy Cream Cheese' },
  { id: 'Sicilian Pistachio Rose', name: 'Sicilian Pistachio Rose', desc: 'Bronte Pistachio Praline' },
  { id: 'Salted Butter Caramel', name: 'Salted Butter Caramel', desc: 'Fleur de Sel Caramel' },
  { id: 'Mango Passionfruit', name: 'Mango Passionfruit', desc: 'Tropical Fruit Curd' }
];

const WEIGHTS = [
  { value: 0.5, label: '0.5 kg (4-6 servings)', priceFactor: 1.0 },
  { value: 1.0, label: '1.0 kg (8-12 servings)', priceFactor: 1.8 },
  { value: 1.5, label: '1.5 kg (12-16 servings)', priceFactor: 2.5 },
  { value: 2.0, label: '2.0 kg (18-24 servings)', priceFactor: 3.2 }
];

const FROSTINGS = [
  'Swiss Meringue Buttercream',
  'Whipped Belgian Ganache',
  'Classic Cream Cheese',
  'Rustic Semi-Naked Style'
];

export default function CustomCakeBuilder() {
  const [flavor, setFlavor] = useState('Belgian Dark Truffle');
  const [weight, setWeight] = useState(1.0);
  const [tiers, setTiers] = useState('Single Tier');
  const [frosting, setFrosting] = useState('Swiss Meringue Buttercream');
  const [isEggless, setIsEggless] = useState(true);
  const [messageOnCake, setMessageOnCake] = useState('Happy Celebration!');
  const [dateNeeded, setDateNeeded] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState('');

  // Calculate live dynamic price
  const calculateEstimate = () => {
    const basePrice = 24.00;
    const weightObj = WEIGHTS.find((w) => w.value === Number(weight)) || WEIGHTS[1];
    let price = basePrice * weightObj.priceFactor;

    if (tiers === '2 Tiers') price *= 1.45;
    if (tiers === '3 Tiers') price *= 1.85;
    if (isEggless) price += 3.00;

    return price.toFixed(2);
  };

  const currentPrice = calculateEstimate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!customerName || !customerPhone || !dateNeeded) {
      setError('Please fill out your contact name, phone, and target celebration date.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews/custom-cake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor,
          weight,
          tiers,
          frosting,
          eggless: isEggless,
          messageOnCake,
          dateNeeded,
          customerName,
          customerPhone
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit cake inquiry');
      }

      setOrderConfirmation(data.quote);
    } catch (err) {
      setError(err.message || 'Failed to submit cake order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="custom-cake-section" id="custom-cakes">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <p className="section-tag">Bespoke Celebrations</p>
          <h2 className="section-title">Design Your Dream Custom Cake</h2>
          <p className="section-subtitle">
            Birthdays, weddings, or intimate anniversaries — customize your sponge,
            frosting, tiers, and personalized message with live price estimation.
          </p>
        </div>

        {/* Cake Designer Card */}
        <div className="cake-builder-card">
          {/* Left Configuration Form */}
          <form className="cake-form-area" onSubmit={handleSubmit}>
            {/* Step 1: Flavor Selection */}
            <div className="cake-form-group">
              <label>1. Select Handcrafted Sponge & Flavor:</label>
              <div className="flavor-chips-grid">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`flavor-chip ${flavor === f.id ? 'selected' : ''}`}
                    onClick={() => setFlavor(f.id)}
                  >
                    <div>{f.name}</div>
                    <span style={{ fontSize: '0.72rem', color: '#8c7e75', display: 'block', fontWeight: 'normal' }}>
                      {f.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Weight & Tiers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="cake-form-group">
              <div>
                <label>2. Cake Weight / Size:</label>
                <select value={weight} onChange={(e) => setWeight(Number(e.target.value))}>
                  {WEIGHTS.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Tiers Structure:</label>
                <select value={tiers} onChange={(e) => setTiers(e.target.value)}>
                  <option value="Single Tier">Single Tier (Classic)</option>
                  <option value="2 Tiers">2 Tiers (Celebration +45%)</option>
                  <option value="3 Tiers">3 Tiers (Grand Event +85%)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Frosting & Eggless Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'center' }} className="cake-form-group">
              <div>
                <label>3. Outer Frosting & Finish:</label>
                <select value={frosting} onChange={(e) => setFrosting(e.target.value)}>
                  {FROSTINGS.map((fr) => (
                    <option key={fr} value={fr}>{fr}</option>
                  ))}
                </select>
              </div>

              <div style={{ paddingTop: '1.2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#15803d' }}>
                    🌱 100% Eggless
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Piped Message & Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }} className="cake-form-group">
              <div>
                <label>4. Piped Chocolate Message on Cake:</label>
                <input
                  type="text"
                  placeholder="e.g. Happy 25th Birthday Rhea!"
                  value={messageOnCake}
                  onChange={(e) => setMessageOnCake(e.target.value)}
                  maxLength={40}
                />
              </div>

              <div>
                <label>Celebration Date:</label>
                <input
                  type="date"
                  value={dateNeeded}
                  onChange={(e) => setDateNeeded(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Customer Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#fdfaf5', padding: '1.2rem', borderRadius: '12px', border: '1px solid #ede4d8', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem' }}>Your Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Sen"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem' }}>Contact Phone / WhatsApp:</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p style={{ color: '#b91c1c', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '0.85rem' }}
              id="submit-cake-inquiry-btn"
            >
              {loading ? 'Submitting Design...' : 'Book Custom Cake Inquiry Now'}
            </button>
          </form>

          {/* Right Live Estimate Summary */}
          <div className="cake-summary-sidebar">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309', fontWeight: '700', marginBottom: '0.75rem' }}>
                <Cake size={20} />
                <span>Live Cake Preview & Estimate</span>
              </div>

              <h4 style={{ fontSize: '1.3rem', color: '#3e2723', marginBottom: '0.5rem' }}>
                {flavor}
              </h4>

              <div style={{ fontSize: '0.88rem', color: '#6b5e59', lineHeight: '1.7', marginBottom: '1rem' }}>
                <p>• Weight: <strong>{weight} kg</strong></p>
                <p>• Structure: <strong>{tiers}</strong></p>
                <p>• Outer Frosting: <strong>{frosting}</strong></p>
                <p>• Diet: <strong>{isEggless ? '🌱 100% Eggless' : 'Traditional Pastry Eggs'}</strong></p>
                <p>• Inscription: <em>"{messageOnCake || 'None'}"</em></p>
              </div>
            </div>

            {/* Estimated Price Box */}
            <div className="cake-estimate-box">
              <span>Estimated Artisan Price</span>
              <h3>${currentPrice}</h3>
              <p style={{ fontSize: '0.78rem', color: '#8c7e75' }}>
                Includes decorative piping, golden cake board, and gift packaging.
              </p>
            </div>

            <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.82rem', color: '#065f46' }}>
              ✨ Handcrafted fresh on the day of delivery by our head pastry chef. 24-hour advance booking recommended.
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {orderConfirmation && (
          <div className="modal-overlay" onClick={() => setOrderConfirmation(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', padding: '2.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '1.75rem', color: '#3e2723', marginBottom: '0.5rem' }}>
                Custom Cake Inquiry Confirmed!
              </h2>

              <p style={{ color: '#6b5e59', marginBottom: '1.5rem' }}>
                Thank you <strong>{orderConfirmation.customerName}</strong>! Your inquiry ref is:
                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', color: '#b45309', margin: '0.4rem 0' }}>
                  {orderConfirmation.quoteId}
                </span>
                Our cake specialist will contact you on <strong>{orderConfirmation.customerPhone}</strong> to confirm final aesthetic details.
              </p>

              <div style={{ background: '#fdfaf5', padding: '1rem', borderRadius: '12px', border: '1px solid #ede4d8', textAlign: 'left', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                <p>🍰 <strong>Flavor:</strong> {orderConfirmation.flavor}</p>
                <p>⚖️ <strong>Weight:</strong> {orderConfirmation.weight}</p>
                <p>🎂 <strong>Tiers:</strong> {orderConfirmation.tiers}</p>
                <p>✍️ <strong>Piped Message:</strong> "{orderConfirmation.messageOnCake}"</p>
                <p>📅 <strong>Target Date:</strong> {orderConfirmation.dateNeeded}</p>
                <p>💵 <strong>Estimated Total:</strong> {orderConfirmation.estimatedPrice}</p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setOrderConfirmation(null)}
                style={{ width: '100%' }}
              >
                Close & Return to Bakery
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
