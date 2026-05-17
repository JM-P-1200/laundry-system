import React, { useState } from 'react';
import laundryService from '../services/laundryService';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await laundryService.trackOrder(orderId.toUpperCase());
      setOrder(data);
    } catch (err) {
      setError("Order not found. Please check your Receipt ID.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-5">
            <h1 className="fw-bold display-6">Track Your Laundry</h1>
            <p className="text-muted">Enter your Order ID (e.g., BW-2026-XXXX) to see live progress.</p>
          </div>

          <form onSubmit={handleSearch} className="mb-5">
            <div className="input-group input-group-lg shadow-sm">
              <input 
                type="text" 
                className="form-control border-0 px-4" 
                placeholder="BW-XXXX-XXXX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
              <button className="btn btn-primary px-4 fw-bold" type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'TRACK'}
              </button>
            </div>
            {error && <div className="text-danger small mt-2 px-2 fw-medium">⚠️ {error}</div>}
          </form>

          {order && (
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeInUp">
              <div className="bg-primary p-4 text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="opacity-75 text-uppercase fw-bold">Order ID</small>
                    <h4 className="mb-0 fw-bold">{order.id}</h4>
                  </div>
                  <div className="text-end">
                    <small className="opacity-75 text-uppercase fw-bold">Current Status</small>
                    <h5 className="mb-0 fw-bold">{order.status}</h5>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 bg-white">
                <div className="mb-4">
                  <label className="small text-muted text-uppercase fw-bold">Customer Name</label>
                  <p className="fs-5 fw-medium mb-0">{order.customer_name}</p>
                </div>
                {/* 8pt Grid Timeline */}
                <div className="position-relative pt-2 pb-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ width: order.status === 'Ready' ? '100%' : '50%' }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-3 small fw-bold text-muted">
                    <span className="text-success">RECEIVED</span>
                    <span className={order.status !== 'Received' ? 'text-success' : ''}>IN PROGRESS</span>
                    <span className={order.status === 'Ready' ? 'text-success' : ''}>READY</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;