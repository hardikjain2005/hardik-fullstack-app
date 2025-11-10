import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulated new product
  const newProduct = {
    _id: 'new-sneakers-id',
    name: 'New Sneakers',
    description: 'A stylish and comfortable pair of sneakers.',
    price: 79.99,
    category: 'sneakers',
    image: '/assets/shoes/1.jpeg',
    inStock: true,
    featured: false
  };

  useEffect(() => {
    const fetchAndAddProducts = async () => {
      await fetchProducts();
      // Add the new product to the state
      setProducts(prevProducts => [...prevProducts, newProduct]);
    };
    fetchAndAddProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await productsAPI.getAll(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'boots', label: 'Boots' },
    { value: 'shoes', label: 'shoes' },
    { value: 'sneakers', label: 'Sneakers' },
    { value: 'slides', label: 'Slides' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Shoe Collection</h1>
          <p>Discover our exquisite range of handcrafted shoe collection</p>
        </div>

        <div className="filter-section">
          <h3>Filter by Category:</h3>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-btn ${filter === category.value ? 'active' : ''}`}
                onClick={() => setFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <>
            <div className="products-count">
              <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

