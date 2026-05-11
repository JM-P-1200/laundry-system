import React, { useState, useEffect } from 'react';

const NewOrder = () => {
  // --- Helper: ID Generator ---
  const generateId = () => `BW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // --- State ---
  const [orderData, setOrderData] = useState({
    id: generateId(),
    name: '',
    contact: '',
    weight: 0,
    service: 'Wash & Fold',
    method: 'Pick-up',
    total: '0.00'
  });

  const prices = { 'Wash & Fold': 2.0, 'Dry Clean': 5.0, 'Ironing': 1.5 };

  // --- Price Logic ---
  useEffect(() => {
    const servicePrice = prices[orderData.service] * orderData.weight;
    const deliveryFee = orderData.method === 'Delivery' ? 5.0 : 0.0;
    setOrderData(prev => ({ ...prev, total: (servicePrice + deliveryFee).toFixed(2) }));
  }, [orderData.weight, orderData.service, orderData.method]);

  const handlePrint = (e) => {
    e.preventDefault();
    if (!orderData.name || !orderData.contact) return alert("Please fill in customer details!");
    window.print(); // Triggers the browser print dialog
  };

  return (
    <div className="p-4">
      {/* 1. PRINT-ONLY RECEIPT (Hidden on screen, shows on paper) */}
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

      {/* 2. ON-SCREEN FORM */}
      <div className="d-print-none">
        <h2 className="fw-bold text-brand-blue mb-4">New Order Entry</h2>
        <form className="row g-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Customer Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" onChange={(e) => setOrderData({...orderData, name: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Contact Number</label>
                  <input type="tel" className="form-control" placeholder="09XX-XXX-XXXX" onChange={(e) => setOrderData({...orderData, contact: e.target.value})} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Weight (kg)</label>
                  <input type="number" className="form-control" step="0.1" onChange={(e) => setOrderData({...orderData, weight: parseFloat(e.target.value) || 0})} />
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
              <div className="mb-2">
                <label className="form-label fw-bold small">Method</label>
                <div className="d-flex gap-2">
                  <button type="button" className={`btn flex-grow-1 ${orderData.method === 'Pick-up' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setOrderData({...orderData, method: 'Pick-up'})}>Pick-up</button>
                  <button type="button" className={`btn flex-grow-1 ${orderData.method === 'Delivery' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setOrderData({...orderData, method: 'Delivery'})}>Delivery (+$5)</button>
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
              <button className="btn btn-light text-brand-blue fw-bold w-100 mt-4 py-3" onClick={handlePrint}>CONFIRM & PRINT</button>
              <p className="text-center small mt-3 opacity-50 mb-0">ID: {orderData.id}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;