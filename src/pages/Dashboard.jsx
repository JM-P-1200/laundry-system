import React from 'react';

const Dashboard = () => {
  // Mock data for the UI layout
  const summaryCards = [
    { title: "Total Orders", value: "142", icon: "📦", color: "text-primary" },
    { title: "In Progress", value: "12", icon: "🔄", color: "text-warning" },
    { title: "Ready for Pickup", value: "8", icon: "✅", color: "text-success" },
    { title: "Revenue (Today)", value: "$320.50", icon: "💰", color: "text-info" },
  ];

  return (
    <div className="p-4 container-fluid">
      {/* Header Section */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-brand-blue mb-1">Store Overview</h2>
          <p className="text-muted small">Welcome back, Admin. Here’s what’s happening today.</p>
        </div>
        <button className="btn btn-primary shadow-sm">+ Quick New Order</button>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-3">{card.icon}</span>
                  <span className={`fw-bold ${card.color}`}>···</span>
                </div>
                <h6 className="text-muted small text-uppercase fw-bold">{card.title}</h6>
                <h3 className="fw-bold mb-0">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
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
                  <tr>
                    <td className="fw-bold text-brand-blue">#1024</td>
                    <td>Alice Cooper</td>
                    <td>Wash & Fold</td>
                    <td><span className="badge bg-warning-subtle text-warning px-3 rounded-pill">Washing</span></td>
                    <td className="text-end fw-bold">$18.00</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-brand-blue">#1025</td>
                    <td>Robert Plant</td>
                    <td>Dry Cleaning</td>
                    <td><span className="badge bg-success-subtle text-success px-3 rounded-pill">Ready</span></td>
                    <td className="text-end fw-bold">$42.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Status Breakdown / Machine Info */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold">Machine Status</h5>
            </div>
            <div className="card-body pt-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                  Washing Machine #1 <span className="badge bg-success rounded-pill">Idle</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                  Washing Machine #2 <span className="badge bg-primary rounded-pill">Running (12m)</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                  Dryer #1 <span className="badge bg-danger rounded-pill">Out of Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;