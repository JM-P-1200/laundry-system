import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

const Sidebar = () => {
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'D' },
    { name: 'New Order', path: '/new-order', icon: '+' },
    { name: 'Active Queue', path: '/queue', icon: 'Q' },
    { name: 'Order History', path: '/history', icon: 'H' },
    { name: 'Customers', path: '/customers', icon: 'C' },
    { name: 'Inventory', path: '/inventory', icon: 'I' },
    { name: 'Settings', path: '/settings', icon: 'S' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  return (
    <aside className="admin-sidebar d-flex flex-column bg-dark shadow">
      <div className="admin-sidebar-header p-3">
        <Link to="/dashboard" className="admin-brand d-flex align-items-center text-decoration-none">
          <span className="fs-4 fw-bold text-info">{settings?.shop_name || 'BubbleWorks'}</span>
        </Link>
      </div>

      <ul className="admin-sidebar-nav nav nav-pills flex-column mb-auto px-3">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link mb-2 ${location.pathname === item.path ? 'active' : 'text-white'}`}
            >
              <span className="admin-nav-icon me-2">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="admin-sidebar-footer p-3 pb-4">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <span>Lock System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
