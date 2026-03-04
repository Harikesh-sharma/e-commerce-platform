import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <FaShoppingCart style={{ fontSize: '4rem', color: 'var(--text-secondary)', marginBottom: '20px' }} />
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="cart-page">
        <div className="container">
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.product} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <Link to={`/products/${item.product}`} className="cart-item-title">
                      {item.title}
                    </Link>
                    <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <button 
                    className="cart-item-remove"
                    onClick={() => handleRemove(item.product)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shippingPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{taxPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              {user ? (
                <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '24px' }}>
                  Proceed to Checkout
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '24px' }}>
                  Login to Checkout
                </Link>
              )}

              <button 
                className="btn btn-outline" 
                style={{ width: '100%', marginTop: '12px' }}
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

