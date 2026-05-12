import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // 1. Load the "Single Source of Truth"
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  // 2. Filter and Search Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ready': return 'bg-success';
      case 'Washing': return 'bg-primary';
      case 'Folding': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-brand-blue mb-1">Order History</h2>
          <p className="text-muted small">A complete archive of all shop transactions.</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search by Customer Name or Transaction ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Received">Received</option>
                <option value="Washing">Washing</option>
                <option value="Folding">Folding</option>
                <option value="Ready">Ready</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Total</th>
                <th className="text-end pe-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="ps-4 fw-bold text-primary">{order.id}</td>
                    <td>
                      <div className="fw-bold">{order.name}</div>
                      <small className="text-muted">{order.contact}</small>
                    </td>
                    <td>{order.service}</td>
                    <td>{order.weight}kg</td>
                    <td>
                      <span className={`badge rounded-pill px-3 ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="fw-bold text-dark">${order.total}</td>
                    <td className="text-end pe-4 text-muted small">
                      {new Date().toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No orders matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;