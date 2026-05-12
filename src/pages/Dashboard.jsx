import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgress: 0,
    ready: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // --- 1. LIVE DATA LOGIC ---
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    
    const total = savedOrders.length;
    const pending = savedOrders.filter(o => o.status !== 'Ready').length;
    const ready = savedOrders.filter(o => o.status === 'Ready').length;
    const income = savedOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);

    setStats({
      totalOrders: total,
      inProgress: pending,
      ready: ready,
      revenue: income.toFixed(2)
    });

    setRecentOrders(savedOrders.slice(0, 5));
  }, []);

  // --- 2. MACHINE TIMER LOGIC ---
  const [machines, setMachines] = useState([
    { id: 1, type: 'Washer', status: 'Running', timeLeft: 1800 },
    { id: 2, type: 'Washer', status: 'Idle', timeLeft: 0 },
    { id: 3, type: 'Dryer', status: 'Running', timeLeft: 1200 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'Running' && m.timeLeft > 0) return { ...m, timeLeft: m.timeLeft - 1 };
        if (m.timeLeft === 0 && m.status === 'Running') return { ...m, status: 'Done' };
        return m;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const summaryCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: "📦", color: "text-primary" },
    { title: "In Progress", value: stats.inProgress, icon: "🔄", color: "text-warning" },
    { title: "Ready for Pickup", value: stats.ready, icon: "✅", color: "text-success" },
    { title: "Revenue (All Time)", value: `$${stats.revenue}`, icon: "💰", color: "text-info" },
  ];

  return (
    <div className="p-4 container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold text-brand-blue mb-1">Store Overview</h2>
        <p className="text-muted small">Real-time shop performance and machine monitoring.</p>
      </div>

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

      <div className="row g-4">
        {/* Recent Activity Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="table-responsive px-3 pb-3">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-bold text-primary">{order.id}</td>
                      <td>{order.name}</td>
                      <td><span className={`badge rounded-pill ${order.status === 'Ready' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>{order.status}</span></td>
                      <td className="text-end fw-bold">${order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Machine Monitor */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold">Machine Monitor</h5>
            </div>
            <div className="card-body pt-0">
              {machines.map(m => (
                <div key={m.id} className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3">
                  <div>
                    <span className="fw-bold small">{m.type} #{m.id}</span><br />
                    <small className={`badge ${m.status === 'Running' ? 'bg-primary' : m.status === 'Done' ? 'bg-success' : 'bg-secondary'}`}>{m.status}</small>
                  </div>
                  <div className="text-end">
                    <span className="fs-5 fw-bold font-monospace">{m.timeLeft > 0 ? formatTime(m.timeLeft) : '--:--'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;