import React, { useState, useEffect } from 'react';
import laundryService from '../services/laundryService';

export const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const syncLiveInventoryLevels = () => {
    laundryService.getInventory()
      .then(res => setItems(res))
      .catch(err => console.error("Inventory stock read block:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    syncLiveInventoryLevels();
  }, []);

  const handleUpdateStock = async (item, deltaAmount) => {
    const updatedTargetStock = parseFloat(item.stock_level) + deltaAmount;
    try {
      await laundryService.adjustStock(item.id, updatedTargetStock);
      syncLiveInventoryLevels(); // Triggers a clean layout repaint cycle
    } catch (err) {
      alert(`Stock modification failed: ${err.message}`);
    }
  };

  const totalSkus = items.length;
  const activeLowStockAlertsCount = items.filter(i => parseFloat(i.stock_level) <= parseFloat(i.low_stock_threshold)).length;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Polling Chemical Stock Matrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-1">Inventory Management</h2>
      <p className="text-muted mb-4">Monitor chemical volume levels, packaging metrics, and low-stock alerts.</p>

      {/* Overview Analytics Cards Widget */}
      <div className="row g-4 mb-4">
        {[
          { title: 'TOTAL SKUs REGISTERED', val: totalSkus, icon: '📦', color: 'border-primary' },
          { title: 'CRITICAL LOW STOCK ALERTS', val: activeLowStockAlertsCount, icon: '⚠️', color: activeLowStockAlertsCount > 0 ? 'border-danger' : 'border-success' }
        ].map((tile, i) => (
          <div className="col-md-6" key={i}>
            <div className={`card border-0 shadow-sm p-3 bg-white border-start border-4 ${tile.color}`}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted fw-bold d-block mb-1" style={{ fontSize: '11px' }}>{tile.title}</small>
                  <span className="fs-3 fw-black text-dark">{tile.val}</span>
                </div>
                <span className="fs-2 bg-light p-2 rounded-3">{tile.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Stock Ledger Grid */}
      <div className="card border-0 shadow-sm bg-white p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Item Name / Specification</th>
                <th>Volume Stock Level Gauge</th>
                <th>Alert Status</th>
                <th className="pe-4 text-end">Adjust Stock (1 Unit Delta)</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const stockVal = parseFloat(item.stock_level);
                const thresholdVal = parseFloat(item.low_stock_threshold);
                const isCriticalStockLevelReached = stockVal <= thresholdVal;
                
                // Calculate scale ceiling safety percentage metrics
                const volumetricVisualPercentage = Math.min(100, (stockVal / 100) * 100);

                return (
                  <tr key={item.id}>
                    <td className="ps-4">
                      <strong className="d-block text-dark">{item.item_name}</strong>
                      <small className="text-muted font-monospace">{item.category}</small>
                    </td>
                    <td>
                      <div className="progress mb-1 rounded-pill" style={{ height: '7px', width: '220px', backgroundColor: '#e9ecef' }}>
                        <div 
                          className={`progress-bar rounded-pill ${isCriticalStockLevelReached ? 'bg-danger' : 'bg-primary'}`} 
                          role="progressbar" 
                          style={{ width: `${volumetricVisualPercentage}%` }} 
                        />
                      </div>
                      <small className="text-muted font-semibold">
                        {item.stock_level} {item.unit_type} remaining
                      </small>
                    </td>
                    <td>
                      {isCriticalStockLevelReached ? (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 fw-bold">
                          ⚠️ Order Restock
                        </span>
                      ) : (
                        <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 fw-medium">
                          Stable Volume
                        </span>
                      )}
                    </td>
                    <td className="pe-4 text-end">
                      <div className="btn-group shadow-sm" role="group">
                        <button 
                          type="button" 
                          className="btn btn-white btn-outline-secondary px-3 fw-bold border-end-0" 
                          onClick={() => handleUpdateStock(item, -1.00)}
                          title="Deduct 1 Unit"
                        >
                          -
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-white btn-outline-secondary px-3 fw-bold" 
                          onClick={() => handleUpdateStock(item, 1.00)}
                          title="Append 1 Unit"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};