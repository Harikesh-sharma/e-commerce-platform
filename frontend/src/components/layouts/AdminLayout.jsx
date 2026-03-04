import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBag, FaProductHunt, FaUsers, FaSignOutAlt, FaChartBar } from 'react-icons/fa';
import { logout } from '../../store/slices/authSlice';

function AdminLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>ShopSmart Admin</h2>
        <nav>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <FaChartBar /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <FaProductHunt /> Products
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <FaShoppingBag /> Orders
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <FaUsers /> Users
          </NavLink>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>Logged in as:</p>
            <p style={{ fontWeight: 600 }}>{user?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%' }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

