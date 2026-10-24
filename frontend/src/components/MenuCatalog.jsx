/**
 * MenuCatalog Component
 * Displays interactive bakery catalog with category filters,
 * live keyword search, dietary tags, price sorting, and quick view modal.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const CATEGORIES = ['All', 'Cakes', 'Breads', 'Pastries', 'Cookies', 'Savory'];
const DIETARY_OPTIONS = ['All', 'Eggless', 'Vegan', 'Gluten-Free'];

export default function MenuCatalog() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Quick View Modal
  const [activeProduct, setActiveProduct] = useState(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // Fetch products from backend Express API
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          throw new Error('Could not load products');
        }
      } catch (err) {
        console.error('Error fetching catalog:', err);
        setError('Failed to fetch bakery items from server. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Filter & Sort Logic using useMemo for performance
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category check
        const matchCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

        // Dietary check
        const matchDiet = selectedDiet === 'All' || item.dietary.toLowerCase() === selectedDiet.toLowerCase();

        // Search check
        const matchSearch =
          searchTerm.trim() === '' ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchCategory && matchDiet && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default/Featured
      });
  }, [products, selectedCategory, selectedDiet, searchTerm, sortBy]);

  const handleQuickAdd = (product) => {
    addToCart(product, 1);
    setRecentlyAddedId(product._id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <p className="section-tag">Artisan Bakery Catalog</p>
          <h2 className="section-title">Fresh From Our Stone Hearth</h2>
          <p className="section-subtitle">
            Every item is baked in small, handcrafted batches daily. Filter by category,
            dietary requirements, or search for your favorite treat.
          </p>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="filter-toolbar">
          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? '✨ All Treats' : cat}
              </button>
            ))}
          </div>

          {/* Search, Dietary & Sorting Row */}
          <div className="search-sort-row">
            {/* Live Search Box */}
            <div className="search-box-wrapper">
              <Search size={18} className="search-icon-pos" />
              <input
                type="text"
                placeholder="Search cakes, sourdough, croissants, cookies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="catalog-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '0.8rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    color: '#8c7e75'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="dropdown-filters">
              {/* Dietary Filter */}
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                aria-label="Filter by dietary preference"
              >
                <option value="All">All Dietary Types</option>
                <option value="Eggless">🌱 100% Eggless</option>
                <option value="Vegan">🌿 Vegan</option>
                <option value="Gluten-Free">🌾 Gluten-Free</option>
              </select>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort bakery items"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#854d0e' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>🥖 Warming up the ovens & loading bakery menu...</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
            <p>{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product._id;

              return (
                <div key={product._id} className="product-card" id={`product-${product._id}`}>
                  {/* Product Card Image Container */}
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} loading="lazy" />

                    {/* Top Badges */}
                    <div className="card-top-badges">
                      {product.isBestseller ? (
                        <span className="badge badge-bestseller">Bestseller</span>
                      ) : (
                        <span></span>
                      )}

                      {product.isEggless && <span className="badge badge-eggless">Eggless</span>}
                      {product.dietary === 'Vegan' && <span className="badge badge-vegan">Vegan</span>}
                      {product.dietary === 'Gluten-Free' && <span className="badge badge-gluten-free">Gluten-Free</span>}
                    </div>

                    {/* Quick View Overlay Button */}
                    <button
                      className="quick-view-overlay-btn"
                      onClick={() => setActiveProduct(product)}
                      title="Quick details and ingredients"
                    >
                      <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      Quick View
                    </button>
                  </div>

                  {/* Product Details Body */}
                  <div className="product-card-body">
                    <div className="product-cat-rating">
                      <span className="product-category-label">{product.category}</span>
                      <div className="product-star-rating">
                        <Star size={14} fill="#b45309" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="product-card-title">{product.name}</h3>
                    <p className="product-card-desc">{product.description}</p>

                    {/* Card Footer: Price & Add Button */}
                    <div className="product-card-footer">
                      <div className="product-price-block">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <button
                        className="add-cart-action-btn"
                        onClick={() => handleQuickAdd(product)}
                        id={`add-btn-${product._id}`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty Search Results State */}
        {!loading && filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #ede4d8' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🥐</span>
            <h3 style={{ fontSize: '1.4rem', color: '#3e2723', marginBottom: '0.5rem' }}>No bakery treats match your criteria</h3>
            <p style={{ color: '#6b5e59', marginBottom: '1.5rem' }}>Try clearing your search query or switching category filters.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDiet('All');
                setSearchTerm('');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Quick View Modal */}
        {activeProduct && (
          <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </div>
    </section>
  );
}
