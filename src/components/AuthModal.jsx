/**
 * AuthModal Component
 * Provides user login and registration forms with JWT token generation.
 * Includes 1-click Demo Account filler buttons for effortless evaluation during viva.
 */

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    loading,
    error,
    setError
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      await login(email, password);
    } else {
      await register({ name, email, password, phone });
    }
  };

  // Quick Demo Auto-fill for Student Defense / Viva
  const fillDemoAccount = (type) => {
    setError('');
    setAuthMode('login');
    if (type === 'admin') {
      setEmail('admin@goldencrust.com');
      setPassword('admin123');
    } else {
      setEmail('customer@goldencrust.com');
      setPassword('bakery123');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '460px' }}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsAuthModalOpen(false)}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🥐</span>
          <h2 style={{ fontSize: '1.6rem', color: '#3e2723', marginTop: '0.4rem' }}>
            {authMode === 'login' ? 'Welcome Back!' : 'Join Golden Crust'}
          </h2>
          <p style={{ color: '#6b5e59', fontSize: '0.88rem' }}>
            {authMode === 'login'
              ? 'Sign in to track your artisan orders and save addresses'
              : 'Create your account for fresh daily deals and faster checkout'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', background: '#f5ede4', borderRadius: '10px', padding: '0.25rem', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.9rem',
              background: authMode === 'login' ? '#ffffff' : 'transparent',
              color: authMode === 'login' ? '#3e2723' : '#8c7e75',
              boxShadow: authMode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.9rem',
              background: authMode === 'register' ? '#ffffff' : 'transparent',
              color: authMode === 'register' ? '#3e2723' : '#8c7e75',
              boxShadow: authMode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#3e2723', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#8c7e75' }} />
                <input
                  type="text"
                  placeholder="e.g. Maya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.4rem' }}
                  required
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#3e2723', marginBottom: '0.3rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#8c7e75' }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.4rem' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: authMode === 'register' ? '1rem' : '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#3e2723', marginBottom: '0.3rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#8c7e75' }} />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.4rem' }}
                required
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#3e2723', marginBottom: '0.3rem' }}>
                Contact Phone
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#8c7e75' }} />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.4rem' }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem' }}
            id="auth-submit-btn"
          >
            {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In to Account' : 'Create Customer Account'}
          </button>
        </form>

        {/* 1-Click Viva Demo Fillers */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #ede4d8', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#8c7e75', display: 'block', marginBottom: '0.65rem', fontWeight: '600' }}>
            ⚡ QUICK DEMO CREDENTIALS (FOR VIVA / TESTING):
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => fillDemoAccount('customer')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', background: '#fef3c7', borderColor: '#fde68a' }}
            >
              <ShieldCheck size={14} color="#b45309" />
              Demo Admin (Staff)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
