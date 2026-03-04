import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Home() {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector(state => state.products);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Discover Amazing Products</h1>
              <p>
                Shop the latest trends with our curated collection of premium products.
                Quality meets style at unbeatable prices.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop Now
                </Link>
                <Link to="/products?category=Electronics" className="btn btn-secondary btn-lg">
                  Explore Electronics
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
                alt="Shopping" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked selections for you</p>
          
          {featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn btn-outline btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find exactly what you're looking for</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            marginTop: '40px'
          }}>
            {['Electronics', 'Clothing', 'Home', 'Sports', 'Books'].map(category => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                style={{
                  padding: '40px 20px',
                  background: 'var(--background)',
                  borderRadius: 'var(--radius)',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.25rem' }}>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">Why Choose ShopSmart</h2>
          <p className="section-subtitle">We deliver excellence in every order</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px',
            marginTop: '40px'
          }}>
            {[
              { title: 'Free Shipping', desc: 'On orders over ₹4,150' },
              { title: 'Secure Payment', desc: '100% secure transactions' },
              { title: 'Easy Returns', desc: '30-day return policy' },
              { title: '24/7 Support', desc: 'Round-the-clock assistance' },
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  padding: '32px',
                  background: '#fff',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow)',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;

