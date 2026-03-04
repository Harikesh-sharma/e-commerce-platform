import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>ShopSmart</h3>
            <p>
              Your one-stop shop for all your needs. We provide high-quality products
              with excellent customer service.
            </p>
          </div>
          <div className="footer-links">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Clothing">Clothing</Link></li>
              <li><Link to="/products?category=Home">Home</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/my-orders">My Orders</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li>Email: support@shopsmart.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Commerce St</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

