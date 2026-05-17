import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import laundryService from '../services/laundryService';

export const NewOrder = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form states matching schema structure
  const [customer, setCustomer] = useState({
    customer_name: '',
    customer_phone: '',
    delivery_type: 'Walk-in',
    delivery_address: '',
    payment_method: 'Cash',
    payment_status: 'Unpaid',
    notes: ''
  });

  // Dynamic order items array
  const [items, setItems] = useState([
    { service_type: 'Wash/Dry/Fold', weight_kg: '', unit_price: 0 }
  ]);

  // Sync pricing settings directly to the form input rows
  useEffect(() => {
    if (settings) {
      setItems(prev => prev.map(item => ({
        ...item,
        unit_price: item.service_type === 'Wash/Dry/Fold' ? settings.price_per_kg : 5.00
      })));
    }
  }, [settings]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    
    // Automatically recalculate item premium rates if service selection mutates
    if (field === 'service_type' && settings) {
      if (value === 'Wash/Dry/Fold') updated[index].unit_price = settings.price_per_kg;
      else if (value === 'Dry Cleaning') updated[index].unit_price = settings.price_per_kg * 2.5; // Premium scaling factor
      else updated[index].unit_price = settings.price_per_kg * 1.5;
    }
    setItems(updated);
  };

  // Safe floating point transaction calculations
  const calculatedSubtotal = items.reduce((sum, item) => sum + ((parseFloat(item.weight_kg) || 0) * item.unit_price), 0);
  const applicableDelivery = customer.delivery_type === 'Delivery' ? (parseFloat(settings?.delivery_fee) || 0) : 0;
  const netGrandTotal = calculatedSubtotal + applicableDelivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.customer_name) return alert('Customer identifier name required.');
    
    setLoading(true);
    try {
      await laundryService.submitNewOrder(customer, items);
      alert('Order securely tracked to shop ledger!');
      navigate('/queue'); // Instantly routes operators into the queue layout view
    } catch (err) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm p-4 bg-white">
        <h2 className="fw-bold mb-4 text-primary">🧺 New Order Intake Ticket</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Customer Full Name *</label>
              <input type="text" className="form-control form-control-lg" required value={customer.customer_name} onChange={e => setCustomer({...customer, customer_name: e.target.value})} placeholder="e.g. Jane Doe" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Contact Mobile Number</label>
              <input type="text" className="form-control form-control-lg" value={customer.customer_phone} onChange={e => setCustomer({...customer, customer_phone: e.target.value})} placeholder="09xxxxxxxxx" />
            </div>
          </div>

          <hr className="my-4 text-muted" />
          <h4 className="fw-bold text-secondary mb-3">Itemized Sorting Group</h4>
          
          {items.map((item, index) => (
            <div className="row g-3 align-items-end mb-3" key={index}>
              <div className="col-md-5">
                <label className="form-label small fw-bold">Service Classification</label>
                <select className="form-select form-select-lg" value={item.service_type} onChange={e => handleItemChange(index, 'service_type', e.target.value)}>
                  <option value="Wash/Dry/Fold">Wash/Dry/Fold (Standard)</option>
                  <option value="Dry Cleaning">Dry Cleaning (Premium Delicate)</option>
                  <option value="Comforter/Blanket">Comforter/Blanket Surcharge</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Measured Weight (KG)</label>
                <input type="number" step="0.01" className="form-control form-control-lg" placeholder="0.00 kg" required value={item.weight_kg} onChange={e => handleItemChange(index, 'weight_kg', e.target.value)} />
              </div>
              <div className="col-md-3">
                <div className="fs-5 fw-bold text-dark pb-2 text-end">
                  Total: {settings?.currency || '$'}{((parseFloat(item.weight_kg) || 0) * item.unit_price).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <hr className="my-4 text-muted" />
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Handling Route</label>
              <select className="form-select" value={customer.delivery_type} onChange={e => setCustomer({...customer, delivery_type: e.target.value})}>
                <option value="Walk-in">Shop Walk-in Pickup</option>
                <option value="Delivery">Home Courier Delivery</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Invoice Settlement Status</label>
              <select className="form-select" value={customer.payment_status} onChange={e => setCustomer({...customer, payment_status: e.target.value})}>
                <option value="Unpaid">Unpaid (Collect on Delivery)</option>
                <option value="Paid">Paid (Full Upfront settlement)</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Method</label>
              <select className="form-select" value={customer.payment_method} onChange={e => setCustomer({...customer, payment_method: e.target.value})}>
                <option value="Cash">Cash Drawer</option>
                <option value="GCash">GCash Transfer</option>
                <option value="Card">Terminal POS Card</option>
              </select>
            </div>
          </div>

          {customer.delivery_type === 'Delivery' && (
            <div className="mb-4">
              <label className="form-label fw-semibold">Destination Logistics Address</label>
              <textarea className="form-control" rows="2" value={customer.delivery_address} onChange={e => setCustomer({...customer, delivery_address: e.target.value})} placeholder="Input dispatch coordinates..." />
            </div>
          )}

          <div className="mb-4">
            <label className="form-label fw-semibold">Special Operational Notes / Instructions</label>
            <textarea 
              className="form-control" 
              rows="2" 
              value={customer.notes} 
              onChange={e => setCustomer({...customer, notes: e.target.value})} 
              placeholder="e.g., Use hypoallergenic detergent, hang dry premium shirts..." 
            />
          </div>

          <div className="bg-light rounded p-4 d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-muted d-block small fw-bold">ESTIMATED ORDER LEDGER SUM</span>
              <span className="fs-2 fw-black text-dark">{settings?.currency || '$'}{netGrandTotal.toFixed(2)}</span>
              {customer.delivery_type === 'Delivery' && <small className="text-info d-block">(Includes {settings?.currency}{settings?.delivery_fee} logistics premium)</small>}
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg px-5 font-monospace fw-bold">
              {loading ? 'PROCESSING TRANSACTION...' : '✅ EXECUTE INTAKE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};