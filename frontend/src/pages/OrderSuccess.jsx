import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { getOrder, reset } from '../store/slices/orderSlice';

function OrderSuccess() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrder(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card">
          <FaCheckCircle style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: '20px' }} />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been placed.</p>
          
          {order && (
            <div className="order-details">
              <div className="detail-row">
                <span>Order ID:</span>
                <strong>{order._id}</strong>
              </div>
              <div className="detail-row">
                <span>Order Total:</span>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
              <div className="detail-row">
                <span>Status:</span>
                <strong>{order.status}</strong>
              </div>
              <div className="detail-row">
                <span>Items:</span>
                <strong>{order.orderItems.length}</strong>
              </div>
            </div>
          )}

          <div className="success-actions">
            <Link to="/my-orders" className="btn btn-primary">
              View My Orders
            </Link>
            <Link to="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;

