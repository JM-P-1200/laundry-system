import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext'; // 🌟 Connected Context

const Navbar = () => {
  const { settings } = useSettings();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container">
        {/* 🌟 Dynamic fallback name handles live synchronization */}
        <Link className="navbar-brand fw-bold text-brand-blue fs-3 d-flex align-items-center gap-2" to="/">
          🫧 {settings?.shop_name || 'BubbleWorks'}
        </Link>
        <div className="d-flex gap-4">
          <Link to="/" className="nav-link fw-semibold">Home</Link>
          <Link to="/about" className="nav-link fw-semibold">About</Link>
          <Link to="/services" className="nav-link fw-semibold">Services</Link>
          <Link to="/products" className="nav-link fw-semibold">Products</Link>
          <Link to="/contact" className="nav-link fw-semibold">Contact</Link>
          <Link to="/new-order" className="btn btn-primary ms-2">Book Now</Link>
          <Link to="/track" className="btn btn-outline-primary ms-2">Track My Order</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;