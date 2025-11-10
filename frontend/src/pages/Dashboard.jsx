import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'shoes',
    image: '',
    inStock: true,
    featured: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.create({
        ...formData,
        price: parseFloat(formData.price)
      });
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'shoes',
        image: '',
        inStock: true,
        featured: false
      });
      setShowAddForm(false);
      fetchProducts();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add product' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
        fetchProducts();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete product' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1>Welcome, {user?.name}!</h1>
            <p>Your Account Dashboard</p>
          </div>

          <div className="dashboard-content">
            <div className="user-info-card">
              <h2>Account Information</h2>
              <div className="info-item">
                <strong>Name:</strong> {user?.name}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {user?.email}
              </div>
              <div className="info-item">
                <strong>Role:</strong> <span className="role-badge">{user?.role}</span>
              </div>
            </div>

            {isAdmin && (
              <div className="admin-section">
                <div className="admin-header">
                  <h2>Product Management</h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn btn-primary"
                  >
                    {showAddForm ? 'Cancel' : 'Add New Product'}
                  </button>
                </div>

                {message.text && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                {showAddForm && (
                  <form className="add-product-form" onSubmit={handleSubmit}>
                    <h3>Add New Product</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="shoes">Shoes</option>
                          <option value="boots">Boots</option>
                          <option value="sneakers">Sneakers</option>
                          <option value="slides">Slides</option>
                          
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group checkbox-group">
                        <label>
                          <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleInputChange}
                          />
                          In Stock
                        </label>
                      </div>
                      <div className="form-group checkbox-group">
                        <label>
                          <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                          />
                          Featured
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                  </form>
                )}

                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <div className="products-list">
                    <h3>All Products ({products.length})</h3>
                    <div className="products-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Featured</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product._id}>
                              <td>{product.name}</td>
                              <td className="category-cell">{product.category}</td>
                              <td>${product.price.toFixed(2)}</td>
                              <td>
                                <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                                  {product.inStock ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td>{product.featured ? '⭐' : '-'}</td>
                              <td>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="btn btn-danger btn-small"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

