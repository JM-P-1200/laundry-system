import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgress: 0,
    ready: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // 1. Load data from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    
    // 2. Calculate Stats
    const total = savedOrders.length;
    const pending = savedOrders.filter(o => o.status !== 'Ready').length;
    const ready = savedOrders.filter(o => o.status === 'Ready').length;
    
    // Calculate Revenue (Total of all orders)
    const income = savedOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);

    setStats({
      totalOrders: total,
      inProgress: pending,
      ready: ready,
      revenue: income.toFixed(2)
    });

    // 3. Take the 5 most recent orders for the table
    setRecentOrders(savedOrders.slice(0, 5));
  }, []);

  const summaryCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: "📦", color: "text-primary" },
    { title: "In Progress", value: stats.inProgress, icon: "🔄", color: "text-warning" },
    { title: "Ready for Pickup", value: stats.ready, icon: "✅", color: "text-success" },
    { title: "Revenue (All Time)", value: `$${stats.revenue}`, icon: "💰", color: "text-info" },
  ];

  return (
    <div className="p-4 container-fluid">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-brand-blue mb-1">Store Overview</h2>
          <p className="text-muted small">Real-time data from your active queue.</p>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-3">{card.icon}</span>
                </div>
                <h6 className="text-muted small text-uppercase fw-bold">{card.title}</h6>
                <h3 className="fw-bold mb-0">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="table-responsive px-3 pb-3">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Customer</th>
                    <th className="border-0">Service</th>
                    <th className="border-0">Status</th>
                    <th className="border-0 text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-bold text-brand-blue">{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.service}</td>
                        <td>
                          <span className={`badge px-3 rounded-pill ${order.status === 'Ready' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-end fw-bold">${order.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;