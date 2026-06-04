import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

const Navbar = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-brand-blue fs-3 d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
          {settings?.shop_name || 'BubbleWorks'}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(open => !open)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3 pt-3 pt-lg-0">
            <Link to="/" className="nav-link fw-semibold" onClick={closeMenu}>Home</Link>
            <Link to="/about" className="nav-link fw-semibold" onClick={closeMenu}>About</Link>
            <Link to="/services" className="nav-link fw-semibold" onClick={closeMenu}>Services</Link>
            <Link to="/products" className="nav-link fw-semibold" onClick={closeMenu}>Products</Link>
            <Link to="/contact" className="nav-link fw-semibold" onClick={closeMenu}>Contact</Link>
            <Link to="/book" className="btn btn-primary mt-2 mt-lg-0" onClick={closeMenu}>Book Now</Link>
            <Link to="/track" className="btn btn-outline-primary mt-2 mt-lg-0" onClick={closeMenu}>Track My Order</Link>
            <Link to="/admin-login" className="nav-link fw-semibold text-muted" onClick={closeMenu}>Admin Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
