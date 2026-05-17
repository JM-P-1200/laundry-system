import React, { useState, useEffect } from 'react';
import laundryService from '../services/laundryService';
import { useSettings } from '../context/SettingsContext';

export const Dashboard = () => {
  const { settings } = useSettings();
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    inProgress: 0,
    readyForPickup: 0,
    revenue: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    laundryService.getDashboardMetrics()
      .then(res => setMetrics(res))
      .catch(err => console.error("Metrics aggregation crash:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Operations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-1">Store Overview</h2>
      <p className="text-muted mb-4">Real-time shop performance and machine monitoring.</p>

      {/* Analytics Counter Row */}
      <div className="row g-4 mb-4">
        {[
          { title: 'TOTAL ORDERS', val: metrics.totalOrders, icon: '📦', color: 'border-primary' },
          { title: 'IN PROGRESS', val: metrics.inProgress, icon: '🔄', color: 'border-warning' },
          { title: 'READY FOR PICKUP', val: metrics.readyForPickup, icon: '✅', color: 'border-success' },
          { title: 'REVENUE (ALL TIME)', val: `${settings?.currency || '$'}${metrics.revenue.toFixed(2)}`, icon: '💰', color: 'border-danger' }
        ].map((card, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card border-0 shadow-sm p-3 bg-white h-100 border-start border-4 ${card.color}`}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted fw-bold d-block mb-1" style={{ fontSize: '11px' }}>{card.title}</small>
                  <span className="fs-3 fw-black text-dark">{card.val}</span>
                </div>
                <span className="fs-2 bg-light p-2 rounded-3">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Recent Operational Logs Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Recent Activity</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle m-0">
                <thead className="table-light">
                  <tr>
                    <th>Transaction ID</th>
                    <th>Customer Name</th>
                    <th>Workflow Status</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentActivity.map((act) => (
                    <tr key={act.id}>
                      <td className="font-monospace small text-muted">#{act.id.slice(0, 8)}...</td>
                      <td className="fw-semibold text-dark">{act.customer_name}</td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary fw-bold px-2 py-1">
                          {act.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {metrics.recentActivity.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        No active transactions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Machine Telemetry Control Panel */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Machine Monitor</h5>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center border">
                <div>
                  <strong className="d-block text-dark">Washer #1</strong>
                  <span className="badge bg-primary px-2">Running Cycle</span>
                </div>
                <span className="font-monospace fw-bold text-primary fs-5">29:54</span>
              </div>
              <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center border">
                <div>
                  <strong className="d-block text-dark">Washer #2</strong>
                  <span className="badge bg-secondary px-2">Idle Standard</span>
                </div>
                <span className="font-monospace text-muted fs-5">--:--</span>
              </div>
              <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center border">
                <div>
                  <strong className="d-block text-dark">Dryer #1</strong>
                  <span className="badge bg-primary px-2">Running Cycle</span>
                </div>
                <span className="font-monospace fw-bold text-primary fs-5">19:54</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};