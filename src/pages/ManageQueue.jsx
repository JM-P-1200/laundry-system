import React from 'react';

const ManageQueue = () => {
  const activeOrders = [
    { id: "BW-2026-1024", name: "Alice Cooper", service: "Wash & Fold", status: "Washing", color: "primary" },
    { id: "BW-2026-1025", name: "Robert Plant", service: "Dry Clean", status: "Loaded", color: "info" },
    { id: "BW-2026-1026", name: "David Bowie", service: "Ironing", status: "Folding", color: "warning" },
  ];

  return (
    <div className="p-4">
      <h2 className="fw-bold text-brand-blue mb-4">Active Queue</h2>
      
      <div className="row g-3">
        {activeOrders.map((order) => (
          <div key={order.id} className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className={`card-header bg-${order.color} text-white py-2`}>
                <small className="fw-bold">{order.id}</small>
              </div>
              <div className="card-body">
                <h5 className="fw-bold mb-1">{order.name}</h5>
                <p className="text-muted small mb-3">{order.service}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`badge bg-${order.color}-subtle text-${order.color} px-3`}>{order.status}</span>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary">Next Step</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQueue;