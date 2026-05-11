import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // This tells us which page is currently active

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'New Order', path: '/new-order' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Order History', path: '/history' },
    { name: 'Active Queue', path: '/queue' },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100vh' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold text-info">🫧 BubbleWorks</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : 'text-white'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;