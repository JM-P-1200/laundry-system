import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Left Side: Info */}
        <div className="col-md-5">
          <h2 className="fw-bold text-brand-blue mb-4">Get in Touch</h2>
          <p className="text-muted">Have a special request? Send us a message and our team will get back to you within 24 hours.</p>
          
          <div className="mt-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded p-2 me-3">📍</div>
              <div><strong>Location:</strong> 123 Bubbles Ave, Clean City</div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded p-2 me-3">📞</div>
              <div><strong>Phone:</strong> +1 (555) 000-WASH</div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded p-2 me-3">✉️</div>
              <div><strong>Email:</strong> hello@bubbleworks.com</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <select className="form-select">
                  <option>General Inquiry</option>
                  <option>Bulk/Corporate Order</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;