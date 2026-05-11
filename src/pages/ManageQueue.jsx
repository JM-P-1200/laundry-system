import React, { useState, useEffect } from 'react';

const ManageQueue = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on startup
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  // Helper to move order to next status
  const nextStatus = (id) => {
    const statusCycle = ['Received', 'Washing', 'Folding', 'Ready'];
    
    const updated = orders.map(order => {
      if (order.id === id) {
        const currentIndex = statusCycle.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statusCycle.length;
        return { ...order, status: statusCycle[nextIndex] };
      }
      return order;
    });

    setOrders(updated);
    localStorage.setItem('laundry_orders', JSON.stringify(updated));
  };

  // Helper to delete/complete order
  const deleteOrder = (id) => {
    const filtered = orders.filter(o => o.id !== id);
    setOrders(filtered);
    localStorage.setItem('laundry_orders', JSON.stringify(filtered));
  };

  const getBadgeColor = (status) => {
    if (status === 'Washing') return 'bg-primary';
    if (status === 'Folding') return 'bg-warning text-dark';
    if (status === 'Ready') return 'bg-success';
    return 'bg-secondary';
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-brand-blue">Active Management Queue</h2>
        <span className="badge bg-light text-dark border">{orders.length} Active Jobs</span>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 border border-dashed">
          <p className="text-muted mb-0">No active orders. Head to "New Order" to start.</p>
        </div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-xl-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center border-0 pt-3">
                  <span className="badge bg-light text-primary border">{order.id}</span>
                  <button className="btn-close small" onClick={() => deleteOrder(order.id)} title="Remove Order"></button>
                </div>
                <div className="card-body">
                  <h5 className="fw-bold mb-1">{order.name}</h5>
                  <p className="text-muted small mb-3">{order.service} ({order.weight}kg)</p>
                  
                  <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded-2">
                    <span className={`badge ${getBadgeColor(order.status)}`}>{order.status}</span>
                    <button 
                      className="btn btn-sm btn-primary fw-bold" 
                      onClick={() => nextStatus(order.id)}
                    >
                      NEXT STEP →
                    </button>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3">
                  <small className="text-muted">Contact: {order.contact}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageQueue;