/**
 * AuthContext - Manages Authentication State (Client-Side)
 * Handles user login, registration, and session persistence in LocalStorage.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    _id: 'usr_admin',
    name: 'Bakery Manager (Admin)',
    email: 'admin@goldencrust.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    _id: 'usr_customer',
    name: 'Sample Customer',
    email: 'customer@goldencrust.com',
    password: 'bakery123',
    role: 'customer'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('golden_crust_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Persist current logged in user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('golden_crust_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('golden_crust_user');
    }
  }, [user]);

  // Log in user
  const login = (email, password) => {
    setLoading(true);
    setError('');

    try {
      const registered = JSON.parse(localStorage.getItem('golden_crust_registered_users') || '[]');
      const allUsers = [...DEFAULT_USERS, ...registered];

      const matched = allUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (!matched) {
        throw new Error('Invalid email or password. (Try Demo credentials below!)');
      }

      setUser({
        _id: matched._id,
        name: matched.name,
        email: matched.email,
        role: matched.role || 'customer'
      });
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register new customer account
  const register = (userData) => {
    setLoading(true);
    setError('');

    try {
      const { name, email, password, phone } = userData;

      if (!name || !email || !password) {
        throw new Error('Please fill in your name, email, and password.');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const registered = JSON.parse(localStorage.getItem('golden_crust_registered_users') || '[]');
      const allUsers = [...DEFAULT_USERS, ...registered];

      if (allUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = {
        _id: 'usr_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone || '',
        role: email.includes('admin') ? 'admin' : 'customer'
      };

      registered.push(newUser);
      localStorage.setItem('golden_crust_registered_users', JSON.stringify(registered));

      setUser({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Log out user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
        loading,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
