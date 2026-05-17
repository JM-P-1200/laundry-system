import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import laundryService from '../services/laundryService'; // Updated Import

const NewOrder = () => {
  const { settings, loading } = useSettings();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    contact: '',
    weight: '',
    service_type: 'Wash & Fold',
    delivery_method: 'Pick-up'
  });

  const estimatedTotal = useMemo(() => {
    const weightVal = parseFloat(formData.weight) || 0;
    const base = (parseFloat(settings?.price_per_kg) || 0) * weightVal;
    const delivery = formData.delivery_method === 'Delivery' ? (parseFloat(settings?.delivery_fee) || 0) : 0;
    return (base + delivery).toFixed(2);
  }, [formData.weight, formData.delivery_method, settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || loading) return;

    setIsSubmitting(true);
    try {
      const payload = {
        id: `BW-${Date.now()}`,
        ...formData,
        total_price: estimatedTotal
      };

      await laundryService.createOrder(payload);
      navigate('/dashboard');
    } catch (err) {
      alert(`Cloud Sync Failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-5 text-center">Syncing Database...</div>;

  return (
    <div className="p-4 animate__animated animate__fadeIn" style={{ maxWidth: '900px' }}>
      <header className="mb-5">
        <h1 className="fw-bold text-primary mb-1">New Order</h1>
        <p className="text-muted">Cloud-synced RDBMS transaction entry.</p>
      </header>

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <div className="row g-4">
          <div className="col-md-8">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block">Customer Name</label>
            <input type="text" className="form-control form-control-lg border-light-subtle bg-light" required
              value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} />
          </div>
          <div className="col-md-4">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block">Contact Number</label>
            <input type="text" className="form-control form-control-lg border-light-subtle bg-light" 
              value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
          </div>
          <div className="col-md-4">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block">Weight (KG)</label>
            <input type="number" className="form-control form-control-lg border-light-subtle bg-light" required
              value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
          </div>
          <div className="col-md-4">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block">Service</label>
            <select className="form-select form-select-lg border-light-subtle bg-light"
              value={formData.service_type} onChange={(e) => setFormData({...formData, service_type: e.target.value})}>
              <option value="Wash & Fold">Wash & Fold</option>
              <option value="Dry Clean">Dry Clean</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="small fw-bold text-muted text-uppercase mb-2 d-block">Method</label>
            <select className="form-select form-select-lg border-light-subtle bg-light"
              value={formData.delivery_method} onChange={(e) => setFormData({...formData, delivery_method: e.target.value})}>
              <option value="Pick-up">Pick-up</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        <div className="mt-5 pt-4 border-top d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-muted m-0 small">ESTIMATED TOTAL</h5>
          <h2 className="fw-bold text-primary m-0">{settings?.currency || '$'}{estimatedTotal}</h2>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-3 mt-4 fw-bold shadow-sm">
          {isSubmitting ? 'Syncing...' : '🚀 CONFIRM & SAVE TO CLOUD'}
        </button>
      </form>
    </div>
  );
};

export default NewOrder;