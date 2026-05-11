import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          
          {/* Brand & Mission */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold text-info mb-4">🫧 BubbleWorks</h5>
            <p className="small text-secondary">
              Premium fabric care services tailored for the modern lifestyle. 
              Efficiency, quality, and care in every fold.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4 border-bottom pb-2">Links</h6>
            <p><Link to="/home" className="text-secondary text-decoration-none small">Home</Link></p>
            <p><Link to="/services" className="text-secondary text-decoration-none small">Services</Link></p>
            <p><Link to="/products" className="text-secondary text-decoration-none small">Products</Link></p>
            <p><Link to="/about" className="text-secondary text-decoration-none small">About Us</Link></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4 border-bottom pb-2">Contact</h6>
            <p className="small text-secondary">📍 123 Bubbles Ave, Clean City</p>
            <p className="small text-secondary">✉️ hello@bubbleworks.com</p>
            <p className="small text-secondary">📞 +1 (555) 000-WASH</p>
          </div>

        </div>

        <hr className="mb-4 mt-4 border-secondary" />

        {/* Copyright */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="small text-secondary">
              © {new Date().getFullYear()} BubbleWorks Laundry Systems. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4 text-center text-md-end">
            <span className="small text-secondary pe-3">Privacy Policy</span>
            <span className="small text-secondary">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;