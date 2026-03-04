import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { isLoading, isSuccess, order } = useSelector(state => state.orders);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'stripe',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    if (isSuccess && order) {
      dispatch(clearCart());
      navigate(`/order-success/${order._id}`);
    }
  }, [isSuccess, order, dispatch, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.product,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    if (formData.paymentMethod === 'stripe' && stripe) {
      // In production, you'd create a payment intent on the server
      // and confirm the payment here with stripe.confirmCardPayment()
      dispatch(createOrder(orderData));
    } else {
      dispatch(createOrder(orderData));
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Checkout</h1>
        </div>
      </div>

      <div className="checkout-page">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <div className="checkout-form">
                <div className="form-section">
                  <h2>Shipping Address</h2>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? 'error' : ''}
                      />
                      {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h2>Payment Method</h2>
                  <div className="payment-methods">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={formData.paymentMethod === 'stripe'}
                        onChange={handleChange}
                      />
                      <span>Credit/Debit Card (Stripe)</span>
                    </label>
                  </div>
                  {formData.paymentMethod === 'stripe' && (
                    <div className="stripe-element">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#1E293B',
                              '::placeholder': { color: '#64748B' },
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-items">
                  {cartItems.map(item => (
                    <div key={item.product} className="summary-item">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p className="summary-item-title">{item.title}</p>
                        <p className="summary-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-totals">
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
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '24px' }}
                  disabled={isLoading || !stripe}
                >
                  {isLoading ? 'Processing...' : `Pay ₹${totalPrice.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

