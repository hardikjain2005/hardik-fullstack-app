import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ featured: 'true' });
      setProducts(response.data.slice(0, 6)); // Show only 6 featured products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Contact form submitted:', contactForm);
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Cool and Aesthetic Shoe Collection</h1>
          <p className="hero-subtitle">Built for the grind, styled for the streets.</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/#contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No featured products available at the moment. Check back soon!</p>
            </div>
          )}
          <div className="section-footer">
            <Link to="/products" className="btn btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Shoetify</h2>
              <p>
                we dont just make shoes — we build confidence from the ground up.
Born from a love for movement and style, we craft kicks that blend comfort, durability, and pure drip.

Every pair is designed with precision and made to keep up with your hustle — whether youre on the grind, hittin the court, or runnin the city streets.
              </p>
              <p>
              We believe your shoes should feel as good as they look, and thats exactly what we deliver — top-tier materials, dope designs, and that unmatched vibe that turns heads every time you walk by.

Step in, lace up, and own your path.
              </p>
            </div>
            <div className="about-image">
              <div className="placeholder-image">👟</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>📧 info@luxuryjewels.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Jewelry Street, Luxury City</p>
              <p>🕒 Mon-Sat: 9AM - 7PM</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
              {formSubmitted && (
                <p className="success-message">Thank you! We'll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

