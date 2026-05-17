import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

const Sidebar = () => {
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'New Order', path: '/new-order', icon: '➕' },
    { name: 'Active Queue', path: '/queue', icon: '🧼' },
    { name: 'Order History', path: '/history', icon: '📜' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }, 
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column bg-dark shadow" style={{ width: '280px', height: '100vh', position: 'sticky', top: 0 }}>
      <div className="p-3">
        <Link to="/dashboard" className="d-flex align-items-center mb-3 text-decoration-none">
          {/* 🛠️ FIXED: Shifted from shopName to matching schema key shop_name */}
          <span className="fs-4 fw-bold text-info">🫧 {settings?.shop_name || 'BubbleWorks'}</span>
        </Link>
      </div>
      <hr className="text-secondary mt-0" />
      
      <ul className="nav nav-pills flex-column mb-auto px-3">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link 
              to={item.path} 
              className={`nav-link mb-2 ${location.pathname === item.path ? 'active' : 'text-white'}`}
            >
              <span className="me-2">{item.icon}</span> {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="text-secondary" />
      
      <div className="p-3 pb-4">
        <button 
          onClick={handleLogout} 
          className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <span>🔒</span> Lock System
        </button>
      </div>
    </div>
  );
};

export default Sidebar;