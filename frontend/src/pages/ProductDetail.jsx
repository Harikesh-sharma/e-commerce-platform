import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { getProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct: product, isLoading } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="product-detail">
        <div className="container">
          <div className="product-detail-grid">
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.images[selectedImage]} alt={product.title} />
              </div>
              {product.images.length > 1 && (
                <div className="thumbnail-list">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`${product.title} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="product-detail-info">
              <p className="product-category">{product.category}</p>
              <h1>{product.title}</h1>
              
              <div className="product-detail-meta">
                <div className="product-rating">
                  <span className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < Math.round(product.rating) ? '#F59E0B' : '#ddd'} />
                    ))}
                  </span>
                  <span className="rating-count">({product.numReviews} reviews)</span>
                </div>
              </div>

              <div className="product-detail-price">
                ₹{product.price.toLocaleString('en-IN')}
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-stock">
                {product.stock > 0 ? (
                  <>
                    <span className="stock-status">✓ In Stock</span>
                    <span>({product.stock} available)</span>
                  </>
                ) : (
                  <span className="out-of-stock">✕ Out of Stock</span>
                )}
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="product-specifications">
                  <h3>Specifications</h3>
                  <div className="spec-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-label">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="container">
          <h2>Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">
                    {review.user?.name || 'Anonymous'}
                  </span>
                  <span className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < review.rating ? '#F59E0B' : '#ddd'} />
                    ))}
                  </span>
                </div>
                <p>{review.comment}</p>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="recommendations-section">
        <div className="container">
          <h2 className="section-title">Related Products</h2>
          <div className="recommendation-grid">
            {/* This would be populated from recommendations API */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;

