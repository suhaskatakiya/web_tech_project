/**
 * AdminDashboard Component
 * Bakery Staff / Manager Operations Portal.
 * Features:
 * 1. Live Orders Board with preparation status updates (Pending -> Baking -> Out for Delivery -> Delivered)
 * 2. Add New Bakery Product form (Creates new product in MongoDB)
 * 3. Inventory Management (Delete or inspect items)
 */

import React, { useState, useEffect } from 'react';
import { Package, PlusCircle, RefreshCw, CheckCircle, Clock, Trash2, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'add-product', 'inventory'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [msg, setMsg] = useState('');

  // Add Product Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cakes');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newDietary, setNewDietary] = useState('Eggless');
  const [newIsEggless, setNewIsEggless] = useState(true);
  const [newIngredients, setNewIngredients] = useState('');
  const [newCalories, setNewCalories] = useState('280 kcal');

  // Fetch orders and products
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [orderRes, prodRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products')
      ]);

      const orderData = await orderRes.json();
      const prodData = await prodRes.json();

      if (orderData.success) setOrders(orderData.data);
      if (prodData.success) setProducts(prodData.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update order status (Pending -> Baking -> Out for Delivery -> Delivered)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId || o.orderId === orderId ? { ...o, status: newStatus } : o))
        );
        setMsg(`✅ Order ${orderId} updated to: ${newStatus}`);
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  // Add new bakery product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newDesc) return;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          category: newCategory,
          price: Number(newPrice),
          description: newDesc,
          image: newImage || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
          dietary: newDietary,
          isEggless: newIsEggless,
          ingredients: newIngredients,
          calories: newCalories
        })
      });

      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [data.data, ...prev]);
        setMsg('🎉 New bakery item published to live catalog!');
        setNewName('');
        setNewPrice('');
        setNewDesc('');
        setNewImage('');
        setNewIngredients('');
        setTimeout(() => setMsg(''), 3500);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bakery item from catalog?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setMsg('Item removed from catalog.');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Baking').length;

  return (
    <section className="admin-section" id="admin">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div className="admin-header-badge">
              <Package size={14} />
              <span>Bakery Operations Management Portal</span>
            </div>
            <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.25rem' }}>
              Kitchen & Order Control Center
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Manage incoming customer orders, change kitchen status in real-time, and publish new bakery treats.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={15} className={refreshing ? 'spin' : ''} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Status Message Alert */}
        {msg && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
            {msg}
          </div>
        )}

        {/* Operational Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>TOTAL ORDERS PLACED</span>
            <h3 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0.35rem 0' }}>{orders.length}</h3>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>Live MongoDB sync</span>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>ACTIVE HEARTH TICKETS</span>
            <h3 style={{ fontSize: '1.8rem', color: '#d97706', margin: '0.35rem 0' }}>{pendingCount}</h3>
            <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: '600' }}>Pending / Baking</span>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>TOTAL ORDER REVENUE</span>
            <h3 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0.35rem 0' }}>${totalRevenue.toFixed(2)}</h3>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>Avg ${orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0'}/order</span>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>CATALOG INVENTORY</span>
            <h3 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0.35rem 0' }}>{products.length} Items</h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Across 5 bakery categories</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-nav-tabs">
          <button
            className={`admin-nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Incoming Customer Orders ({orders.length})
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-product')}
          >
            ➕ Add New Bakery Item
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📋 Inventory Catalog ({products.length})
          </button>
        </div>

        {/* TAB 1: Live Orders Table */}
        {activeTab === 'orders' && (
          <div className="admin-orders-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Customer</th>
                  <th>Destination</th>
                  <th>Items Ordered</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Kitchen Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord._id}>
                    <td>
                      <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{ord.orderId}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                      </span>
                    </td>
                    <td>
                      <strong>{ord.customerName}</strong>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>{ord.customerPhone}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{ord.deliveryAddress?.street || 'Local Pickup'}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600' }}>{ord.items?.length || 0} bakes</span>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {ord.items?.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>${ord.totalAmount?.toFixed(2)}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', padding: '0.2rem 0.5rem', background: '#f1f5f9', borderRadius: '4px' }}>
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          border: '1.5px solid #cbd5e1'
                        }}
                      >
                        <option value="Pending">🟡 Pending</option>
                        <option value="Baking">🔥 Baking in Hearth</option>
                        <option value="Out for Delivery">🛵 Out for Delivery</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: Add Product Form */}
        {activeTab === 'add-product' && (
          <div style={{ maxWidth: '700px', background: '#ffffff', padding: '2rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1.25rem' }}>
              Publish a New Handcrafted Item to Bakery Store
            </h3>

            <form onSubmit={handleCreateProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                    Item Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cardamom Cinnamon Morning Bun"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                    Category *
                  </label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="Cakes">Cakes</option>
                    <option value="Breads">Breads</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Cookies">Cookies</option>
                    <option value="Savory">Savory</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="5.50"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                    Dietary Classification
                  </label>
                  <select value={newDietary} onChange={(e) => setNewDietary(e.target.value)}>
                    <option value="Eggless">Eggless</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                    Calories
                  </label>
                  <input
                    type="text"
                    value={newCalories}
                    onChange={(e) => setNewCalories(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                  Image URL (Unsplash or CDN)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                  Ingredients (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Organic Flour, Ceylon Cinnamon, Normandy Butter, Brown Sugar"
                  value={newIngredients}
                  onChange={(e) => setNewIngredients(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>
                  Description & Story *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the texture, crust, crumb, and aroma of this bake..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', background: '#0f172a' }}
              >
                <PlusCircle size={18} />
                <span>Publish Item to Store Catalog</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Inventory List */}
        {activeTab === 'inventory' && (
          <div className="admin-orders-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Dietary</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong>{p.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>{p.calories}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td><strong>${p.price.toFixed(2)}</strong></td>
                    <td>
                      <span className={`badge badge-${p.dietary?.toLowerCase() || 'eggless'}`}>
                        {p.dietary}
                      </span>
                    </td>
                    <td>⭐ {p.rating} ({p.reviewsCount})</td>
                    <td>
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
