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
    <div className="d-flex flex-column ... bg-dark shadow" style={{ width: '280px', height: '100vh', position: 'sticky', top: 0 }}>
      <Link to="/dashboard" className="d-flex align-items-center mb-3 ... text-decoration-none">
        {/* 3. Replace "BubbleWorks" with the dynamic name below */}
        <span className="fs-4 fw-bold text-info">🫧 {settings.shopName}</span>
      </Link>
      <hr />
      
      <ul className="nav nav-pills flex-column mb-auto">
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

      <hr />
      
      <div className="pb-2">
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