import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../store/slices/orderSlice';

function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

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
      <h1>Orders Management</h1>

      {isLoading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>
                <td>
                  <div>
                    <p style={{ fontWeight: 500 }}>{order.user?.name || 'N/A'}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {order.user?.email || ''}
                    </p>
                  </div>
                </td>
                <td>{order.orderItems?.length || 0} items</td>
                <td>${order.totalPrice?.toFixed(2) || '0.00'}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #e2e8f0',
                      background: getStatusColor(order.status),
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Order Details</h2>
            <div style={{ marginTop: '20px' }}>
              <div className="detail-row">
                <span>Order ID:</span>
                <strong>{selectedOrder._id}</strong>
              </div>
              <div className="detail-row">
                <span>Customer:</span>
                <strong>{selectedOrder.user?.name}</strong>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <strong>{selectedOrder.user?.email}</strong>
              </div>
              <div className="detail-row">
                <span>Status:</span>
                <span className="badge" style={{ background: getStatusColor(selectedOrder.status) }}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <strong>{new Date(selectedOrder.createdAt).toLocaleString()}</strong>
              </div>

              <h3 style={{ marginTop: '24px' }}>Shipping Address</h3>
              <div style={{ marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                <p>{selectedOrder.shippingAddress?.address}</p>
                <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                <p>{selectedOrder.shippingAddress?.country}</p>
              </div>

              <h3 style={{ marginTop: '24px' }}>Order Items</h3>
              <div style={{ marginTop: '12px' }}>
                {selectedOrder.orderItems?.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '12px 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontWeight: 500 }}>{item.title}</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <div className="detail-row" style={{ justifyContent: 'flex-end' }}>
                  <span>Subtotal:</span>
                  <span>${selectedOrder.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="detail-row" style={{ justifyContent: 'flex-end' }}>
                  <span>Shipping:</span>
                  <span>${selectedOrder.shippingPrice?.toFixed(2)}</span>
                </div>
                <div className="detail-row" style={{ justifyContent: 'flex-end' }}>
                  <span>Tax:</span>
                  <span>${selectedOrder.taxPrice?.toFixed(2)}</span>
                </div>
                <div className="detail-row" style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                  <span style={{ fontSize: '1.25rem' }}>Total:</span>
                  <strong style={{ fontSize: '1.25rem' }}>${selectedOrder.totalPrice?.toFixed(2)}</strong>
                </div>
              </div>

              <button 
                className="btn btn-outline" 
                style={{ marginTop: '24px', width: '100%' }}
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;

