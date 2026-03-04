import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderStats } from '../../store/slices/orderSlice';
import { FaDollarSign, FaShoppingBag, FaProductHunt, FaUsers } from 'react-icons/fa';

function Dashboard() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector(state => state.orders);
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getOrderStats());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: <FaDollarSign />,
      color: '#10b981',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <FaShoppingBag />,
      color: '#3b82f6',
    },
    {
      title: 'Total Products',
      value: products?.length || 0,
      icon: <FaProductHunt />,
      color: '#f59e0b',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      color: '#8b5cf6',
    },
  ];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-title">{stat.title}</p>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          {stats?.recentOrders?.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

