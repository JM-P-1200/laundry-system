import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { laundryService } from '../services/laundryService';

const NewOrder = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderData, setOrderData] = useState({
    customer_name: '',
    contact: '',
    weight: 0,
    service_type: 'Wash & Fold',
    delivery_method: 'Pick-up'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Logic: Calculate total based on Cloud Settings
    const basePrice = parseFloat(settings.price_per_kg) * parseFloat(orderData.weight);
    const deliveryFee = orderData.delivery_method === 'Delivery' ? parseFloat(settings.delivery_fee) : 0;
    const finalTotal = basePrice + deliveryFee;

    const payload = {
      id: `BW-${Date.now()}`, // Unique ID Generation
      customer_name: orderData.customer_name,
      contact: orderData.contact,
      weight: orderData.weight,
      service_type: orderData.service_type,
      delivery_method: orderData.delivery_method,
      total_price: finalTotal.toFixed(2),
      status: 'Received'
    };

    try {
      await laundryService.createOrder(payload);
      alert("Order Synced to Cloud Successfully!");
      navigate('/dashboard');
    } catch (err) {
      alert("Cloud Sync Failed. Check Console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="fw-bold text-brand-blue mb-4">New Order Entry</h2>
      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted">Customer Name</label>
            <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e) => setOrderData({...orderData, customer_name: e.target.value})}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted">Contact Number</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={(e) => setOrderData({...orderData, contact: e.target.value})}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label small fw-bold text-muted">Weight (kg)</label>
            <input 
              type="number" 
              className="form-control" 
              step="0.1" 
              required
              onChange={(e) => setOrderData({...orderData, weight: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary w-100 mt-4 py-2 fw-bold"
        >
          {isSubmitting ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : '🚀 CONFIRM & SAVE TO CLOUD'}
        </button>
      </form>
    </div>
  );
};

export default NewOrder;