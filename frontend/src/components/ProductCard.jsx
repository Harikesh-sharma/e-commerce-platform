import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image">
        <img src={product.images[0]} alt={product.title} />
        {product.isFeatured && <span className="product-badge">Featured</span>}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.round(product.rating) ? '#F59E0B' : '#ddd'} />
            ))}
          </span>
          <span className="rating-count">({product.numReviews})</span>
        </div>
        <div className="product-price">
<span className="price">₹{product.price.toLocaleString('en-IN')}</span>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            <FaShoppingCart /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

