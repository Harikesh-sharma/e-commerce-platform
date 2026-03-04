import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  const [searchTerm, setSearchTerm] = useState('');

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Shop<span>Smart</span>
          </Link>

          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>

          <nav className="nav-links">
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>

            {user ? (
              <>
                <NavLink to="/cart" className="nav-link cart-icon">
                  <FaShoppingCart />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" className="nav-link">
                    Dashboard
                  </NavLink>
                )}
                <NavLink to="/my-orders" className="nav-link">
                  <FaBox />
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  <FaUser /> {user.name.split(' ')[0]}
                </NavLink>
                <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none' }}>
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                <FaUser /> Login
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

