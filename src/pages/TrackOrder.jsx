import React, { useState } from 'react';

const TrackOrder = () => {
  const [id, setId] = useState('');
  const [order, setOrder] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (id.length < 4) return alert("Enter valid ID");
    
    // MOCK DATA for any ID
    setOrder({
      id: id.toUpperCase(),
      status: 2, // 0 to 3
      method: id.toLowerCase().includes('del') ? 'Delivery' : 'Pick-up',
      steps: ["Received", "In Washer", "Folding", "Ready"]
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold text-brand-blue">Track Your Laundry</h2>
        <p className="text-muted">Stay updated on your garments' journey.</p>
      </div>

      <form onSubmit={handleTrack} className="input-group input-group-lg mb-5 shadow-sm">
        <input type="text" className="form-control border-primary" placeholder="BW-2026-XXXX" onChange={(e) => setId(e.target.value)} />
        <button className="btn btn-primary px-4">Track</button>
      </form>

      {order && (
        <div className="card border-0 shadow-lg p-4">
          <div className="d-flex justify-content-between mb-4">
            <span className="badge bg-primary px-3">{order.id}</span>
            <span className="text-muted fw-bold">{order.method}</span>
          </div>

          {/* Progress Stepper */}
          <div className="d-flex justify-content-between mb-5 position-relative">
            <div className="progress w-100 position-absolute" style={{ height: '3px', top: '15px', zIndex: 0 }}>
              <div className="progress-bar bg-success" style={{ width: `${(order.status / 3) * 100}%` }}></div>
            </div>
            {order.steps.map((step, i) => (
              <div key={i} className="text-center" style={{ zIndex: 1, width: '70px' }}>
                <div className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center ${i <= order.status ? 'bg-success text-white' : 'bg-white border'}`} style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                  {i < order.status ? '✓' : i + 1}
                </div>
                <small className="fw-bold" style={{ fontSize: '9px' }}>{step}</small>
              </div>
            ))}
          </div>

          {/* Live Delivery Map Placeholder */}
          {order.method === 'Delivery' && order.status === 3 && (
            <div className="bg-light p-4 rounded-3 text-center border mt-3">
              <h6 className="fw-bold mb-3 text-start">📍 Live Rider Tracking</h6>
              <div className="display-4">🚚</div>
              <p className="mb-0 fw-bold text-primary">Rider is nearby!</p>
              <p className="text-muted small">Estimated arrival: 4 mins</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;