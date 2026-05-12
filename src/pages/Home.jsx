import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-5 shadow-sm" style={{ background: 'linear-gradient(45deg, #007bff, #0056b3)' }}>
        <div className="container py-5 text-center">
          <h1 className="display-3 fw-bold mb-3">Laundry Day, <br/>Simplified.</h1>
          <p className="lead mb-4 opacity-75">Premium fabric care delivered to your doorstep. <br/> Because your time is worth more than folding socks.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/track" className="btn btn-light btn-lg px-4 fw-bold text-primary">Track My Order</Link>
            <Link to="/services" className="btn btn-outline-light btn-lg px-4">View Prices</Link>
          </div>
        </div>
      </section>

      {/* 2. OFFERS SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="fw-bold">Exclusive Offers</h2>
              <p className="text-muted">Save more on your first few washes!</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm bg-warning-subtle h-100 p-4">
                <div className="card-body">
                  <h3 className="fw-bold">First Wash? 20% OFF</h3>
                  <p>Use code <span className="badge bg-dark">BUBBLE20</span> on your first booking.</p>
                  <Link to="/contact" className="btn btn-dark btn-sm">Claim Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm bg-info-subtle h-100 p-4">
                <div className="card-body">
                  <h3 className="fw-bold">Free Pickup & Delivery</h3>
                  <p>On all orders above 10kg within the city center.</p>
                  <Link to="/services" className="btn btn-info btn-sm text-white">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Our Expert Services</h2>
          <div className="row g-4">
            {[
              { title: "Wash & Fold", icon: "🧺", desc: "Expert cleaning and precise folding." },
              { title: "Dry Cleaning", icon: "👔", desc: "Delicate care for your premium suits & gowns." },
              { title: "Ironing", icon: "💨", desc: "Steam pressing for a crisp, professional look." }
            ].map((s, i) => (
              <div key={i} className="col-md-4">
                <div className="p-4 rounded-4 hover-shadow transition border h-100">
                  <div className="display-4 mb-3">{s.icon}</div>
                  <h4 className="fw-bold">{s.title}</h4>
                  <p className="text-muted small">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MOCKUP STORE LOCATIONS (MAP AREA) */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Visit Our Stores</h2>
              <p className="text-muted mb-4">Find a BubbleWorks location near you. We have 3 state-of-the-art facilities across the city.</p>
              
              <div className="list-group list-group-flush">
                <div className="list-group-item px-0 py-3 bg-transparent">
                  <h6 className="fw-bold mb-1">📍 Downtown Central</h6>
                  <small className="text-muted">123 Bubbles Ave, Open: 7 AM - 9 PM</small>
                </div>
                <div className="list-group-item px-0 py-3 bg-transparent">
                  <h6 className="fw-bold mb-1">📍 Northpoint Hub</h6>
                  <small className="text-muted">45 Clean St, Open: 8 AM - 10 PM</small>
                </div>
                <div className="list-group-item px-0 py-3 bg-transparent">
                  <h6 className="fw-bold mb-1">📍 Westside Express</h6>
                  <small className="text-muted">Mall Level 2, Open: 10 AM - 9 PM</small>
                </div>
              </div>
            </div>
            
            <div className="col-lg-7">
              {/* Mockup of a Map using a styled Div */}
              <div className="card shadow-lg border-0 overflow-hidden" style={{ height: '400px', backgroundColor: '#e5e3df' }}>
                <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="text-muted opacity-50">Map View Mockup</div>
                  
                  {/* Visual Pins */}
                  <div className="position-absolute" style={{ top: '30%', left: '40%' }}>
                     <span className="fs-2 text-primary" title="Downtown">📍</span>
                  </div>
                  <div className="position-absolute" style={{ top: '60%', left: '20%' }}>
                     <span className="fs-2 text-primary" title="Westside">📍</span>
                  </div>
                  <div className="position-absolute" style={{ top: '20%', left: '70%' }}>
                     <span className="fs-2 text-primary" title="Northpoint">📍</span>
                  </div>

                  {/* Grid overlay for map feel */}
                  <div className="position-absolute w-100 h-100" style={{ 
                    backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', 
                    backgroundSize: '20px 20px',
                    opacity: 0.3
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};