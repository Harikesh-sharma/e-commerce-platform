import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../store/slices/orderSlice';

function MyOrders() {
  const dispatch = useDispatch();
  const { myOrders, isLoading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#64748b';
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>My Orders</h1>
        </div>
      </div>

      <div className="my-orders-page">
        <div className="container">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : myOrders.length > 0 ? (
            <div className="orders-list">
              {myOrders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div>
                      <span className="order-id">Order #{order._id}</span>
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span 
                      className="order-status"
                      style={{ background: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.image} alt={item.title} />
                        <div>
                          <p className="item-title">{item.title}</p>
                          <p className="item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                    <Link to={`/order-success/${order._id}`} className="btn btn-outline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <h3>No orders yet</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Start shopping to see your orders here.
              </p>
              <Link to="/products" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;

