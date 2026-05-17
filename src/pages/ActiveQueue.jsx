import React, { useState, useEffect } from 'react';
import laundryService from '../services/laundryService';
import { useSettings } from '../context/SettingsContext';

export const ActiveQueue = () => {
  const { settings } = useSettings();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const data = await laundryService.getActiveQueue();
      setQueue(data);
    } catch (err) {
      console.error("Queue query crash:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAdvanceStatus = async (orderId, currentStatus) => {
    const workflowPath = ['Received', 'Sorting', 'Washing', 'Drying', 'Ready', 'Delivered'];
    const currentIndex = workflowPath.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === workflowPath.length - 1) return;

    const nextStatus = workflowPath[currentIndex + 1];
    try {
      await laundryService.updateOrderStatus(orderId, nextStatus);
      fetchQueue(); // Trigger fresh synchronization render pass
    } catch (err) {
      alert(`Workflow transition failure: ${err.message}`);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Received': return 'bg-secondary text-white';
      case 'Sorting': return 'bg-warning text-dark';
      case 'Washing': return 'bg-info text-white';
      case 'Drying': return 'bg-primary text-white';
      case 'Ready': return 'bg-success text-white';
      default: return 'bg-dark';
    }
  };

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">🫧 Active Machine Operations Queue</h2>
        <span className="badge bg-primary fs-6">{queue.length} Tasks Transacting</span>
      </div>

      {queue.length === 0 ? (
        <div className="alert alert-info text-center p-5 rounded-4">
          <h4>No active clothing targets located.</h4>
          <p className="mb-0 text-muted">Use the Intake Ticket generator to load active work logs.</p>
        </div>
      ) : (
        <div className="row g-3">
          {queue.map((order) => {
            // Aggregate totals across structural array sub-items
            const itemTotalSum = order.order_items?.reduce((acc, i) => acc + (parseFloat(i.weight_kg * i.unit_price) || 0), 0) || 0;
            const fullTotal = itemTotalSum + (order.delivery_type === 'Delivery' ? parseFloat(settings?.delivery_fee || 0) : 0);

            return (
              <div className="col-112" key={order.id}>
                <div className="card border-0 shadow-sm overflow-hidden bg-white">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h4 className="fw-black text-dark mb-1">{order.customer_name}</h4>
                        <small className="text-muted font-monospace d-block">ID Reference: {order.id.slice(0,8)}... | 📱 {order.customer_phone || 'None'}</small>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${getStatusBadgeClass(order.order_status)} px-3 py-2 fs-6 rounded-pill fw-bold mb-2 d-inline-block`}>
                          {order.order_status}
                        </span>
                        <div className="text-muted small">Route: <strong>{order.delivery_type}</strong></div>
                      </div>
                    </div>

                    <div className="bg-light rounded p-3 mb-3">
                      <h6 className="fw-bold text-secondary mb-2 small text-uppercase tracking-wider">Load Specifications:</h6>
                      {order.order_items?.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between text-dark border-bottom border-2 border-white pb-1 mb-1 small">
                          <span>⚙️ {item.service_type}</span>
                          <span className="fw-bold font-monospace">{item.weight_kg} KG (@ {settings?.currency || '$'}{parseFloat(item.unit_price).toFixed(2)})</span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                        <div className="mt-3 p-3 bg-warning-subtle text-warning-emphasis rounded-3 border border-warning-subtle small d-flex align-items-start gap-2">
                            <span className="fs-5">📝</span>
                            <div>
                            <strong className="d-block text-uppercase tracking-wider font-monospace mb-1" style={{ fontSize: '11px' }}>
                                Operational Instructions:
                            </strong>
                            <span className="fw-medium">{order.notes}</span>
                            </div>
                        </div>
                        )}

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                      <div>
                        <span className="text-muted small d-block">Financial Status:</span>
                        <span className={`badge ${order.payment_status === 'Paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} fw-bold`}>
                          {order.payment_status.toUpperCase()} ({order.payment_method})
                        </span>
                        <span className="fs-5 fw-bold text-dark font-monospace ms-3">
                          Total: {settings?.currency || '$'}{fullTotal.toFixed(2)}
                        </span>
                      </div>
                      
                      {order.order_status !== 'Ready' && (
                        <button 
                          onClick={() => handleAdvanceStatus(order.id, order.order_status)} 
                          className="btn btn-outline-primary fw-bold d-flex align-items-center gap-2"
                        >
                          Advance Task Status ⏩
                        </button>
                      )}
                      {order.order_status === 'Ready' && (
                        <button 
                          onClick={() => handleAdvanceStatus(order.id, order.order_status)} 
                          className="btn btn-success fw-bold d-flex align-items-center gap-2"
                        >
                          📦 Complete & Offload Delivery
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};