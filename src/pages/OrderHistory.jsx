import React, { useState, useEffect } from 'react';
import laundryService from '../services/laundryService';
import { useSettings } from '../context/SettingsContext';

export const OrderHistory = () => {
  const { settings } = useSettings();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    laundryService.getAllHistoricalOrders()
      .then(res => setOrders(res))
      .catch(err => console.error("History extraction failure:", err))
      .finally(() => setLoading(false));
  }, []);

  // Live client-side computation array mapping
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'All' || o.order_status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Parsing Records Ledger...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-1">Order History</h2>
      <p className="text-muted mb-4">A complete unalterable archive of all shop transactions.</p>

      {/* Dynamic Multi-Input Search Filters Bar */}
      <div className="card border-0 shadow-sm p-3 bg-white mb-4">
        <div className="row g-2">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted">🔍</span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Search by Customer Name or full Transaction ID Reference..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Workflow Statuses</option>
              <option value="Received">Received</option>
              <option value="Sorting">Sorting</option>
              <option value="Washing">Washing</option>
              <option value="Drying">Drying</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered (Archived)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Ledger Grid */}
      <div className="card border-0 shadow-sm bg-white p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID Reference</th>
                <th>Customer Name</th>
                <th>Aggregated Load Weight</th>
                <th>Current Status</th>
                <th>Financial Total</th>
                <th className="pe-4">Intake Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => {
                // Safely unpack and aggregate line item arrays on the fly
                const totalWeight = o.order_items?.reduce((acc, i) => acc + (parseFloat(i.weight_kg) || 0), 0) || 0;
                const baseItemsSum = o.order_items?.reduce((acc, i) => acc + (parseFloat(i.weight_kg * i.unit_price) || 0), 0) || 0;
                const shippingCost = o.delivery_type === 'Delivery' ? (parseFloat(settings?.delivery_fee) || 5.00) : 0;
                const finalCalculatedGrandTotal = baseItemsSum + shippingCost;

                return (
                  <tr key={o.id}>
                    <td className="font-monospace small text-muted ps-4">#{o.id.slice(0, 8)}...</td>
                    <td className="fw-bold text-dark">{o.customer_name}</td>
                    <td className="font-monospace">{totalWeight.toFixed(2)} KG</td>
                    <td>
                      <span className={`badge px-2 py-1 fw-bold ${o.order_status === 'Delivered' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                        {o.order_status}
                      </span>
                    </td>
                    <td className="font-monospace fw-bold text-dark">
                      {settings?.currency || '$'}{finalCalculatedGrandTotal.toFixed(2)}
                    </td>
                    <td className="small text-muted pe-4">
                      {new Date(o.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">
                    No matching historical orders found in the database layer.
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