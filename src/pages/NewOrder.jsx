import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const NewOrder = () => {
  const { settings } = useSettings(); // Initialize navigation
  const navigate = useNavigate();
  
  // Helper: ID Generator
  const generateId = () => `BW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // State
  const [orderData, setOrderData] = useState({
    id: generateId(),
    name: '',
    contact: '',
    weight: 0,
    service: 'Wash & Fold',
    method: 'Pick-up',
    status: 'Received', // New orders start here
    total: '0.00'
  });

  const prices = { 
    'Wash & Fold': settings.pricePerKg, 
    'Dry Clean': settings.pricePerKg * 2.5, // Maybe dry clean is always 2.5x base price?
    'Ironing': settings.pricePerKg * 0.75 
  };

  // Price Logic
  useEffect(() => {
    const servicePrice = prices[orderData.service] * orderData.weight;
    const deliveryFee = orderData.method === 'Delivery' ? settings.deliveryFee : 0.0;
    setOrderData(prev => ({ ...prev, total: (servicePrice + deliveryFee).toFixed(2) }));
  }, [orderData.weight, orderData.service, orderData.method]);

  // --- THE NEW LOGIC: Save to LocalStorage ---
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!orderData.name || !orderData.contact) return alert("Fill in details!");

    // 1. Get existing orders or empty array
    const existingOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    
    // 2. Add new order to the list
    const updatedOrders = [orderData, ...existingOrders];
    
    // 3. Save back to localStorage
    localStorage.setItem('laundry_orders', JSON.stringify(updatedOrders));

    // 4. (Optional) Print and then Redirect
    window.print();
    navigate('/queue'); // Move to queue page automatically
  };

  return (
    <div className="p-4">
      {/* Print-only receipt (same as before) */}
      <div className="d-none d-print-block p-4" style={{ width: '80mm', fontFamily: 'monospace' }}>
        <div className="text-center border-bottom pb-2 mb-3">
          <h4 className="fw-bold mb-0">🫧 BUBBLEWORKS</h4>
          <small>Premium Laundry Receipt</small>
        </div>
        <div className="small">
          <p><strong>ID:</strong> {orderData.id}<br/><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <hr style={{ borderStyle: 'dashed' }}/>
          <p><strong>Customer:</strong> {orderData.name}<br/><strong>Service:</strong> {orderData.service}<br/><strong>Weight:</strong> {orderData.weight}kg</p>
          <div className="d-flex justify-content-between border-top pt-2 fw-bold fs-5">
            <span>TOTAL:</span><span>${orderData.total}</span>
          </div>
        </div>
      </div>

      <div className="d-print-none">
        <h2 className="fw-bold text-brand-blue mb-4">New Order Entry</h2>
        <form className="row g-4" onSubmit={handleConfirmOrder}>
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4 mb-4">
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small">Customer Name</label>
                  <input type="text" className="form-control" onChange={(e) => setOrderData({...orderData, name: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Contact Number</label>
                  <input type="tel" className="form-control" onChange={(e) => setOrderData({...orderData, contact: e.target.value})} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small">Weight (kg)</label>
                  <input type="number" className="form-control" step="0.1" onChange={(e) => setOrderData({...orderData, weight: parseFloat(e.target.value) || 0})} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Service</label>
                  <select className="form-select" onChange={(e) => setOrderData({...orderData, service: e.target.value})}>
                    <option>Wash & Fold</option>
                    <option>Dry Clean</option>
                    <option>Ironing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label fw-bold small">Method</label>
                <div className="d-flex gap-2">
                  <button 
            type="button" 
            className={`btn flex-grow-1 ${orderData.method === 'Pick-up' ? 'btn-primary' : 'btn-outline-primary'}`} 
            onClick={() => setOrderData({...orderData, method: 'Pick-up'})}
          >
            Pick-up
          </button>
          
          <button 
            type="button" 
            className={`btn flex-grow-1 ${orderData.method === 'Delivery' ? 'btn-primary' : 'btn-outline-primary'}`} 
            onClick={() => setOrderData({...orderData, method: 'Delivery'})}
          >
            {/* 3. SYNCED TEXT BELOW */}
            Delivery (+{settings.currency}{settings.deliveryFee})
          </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card bg-brand-blue text-white p-4 border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2"><span>Customer:</span><span className="fw-bold">{orderData.name || '---'}</span></div>
              <div className="d-flex justify-content-between mb-4"><span>Method:</span><span>{orderData.method}</span></div>
              <hr/>
              <div className="d-flex justify-content-between fs-3 fw-bold"><span>Total:</span><span>${orderData.total}</span></div>
              <button type="submit" className="btn btn-light text-brand-blue fw-bold w-100 mt-4 py-3">CONFIRM & SAVE</button>
              <p className="text-center small mt-3 opacity-50 mb-0">ID: {orderData.id}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;