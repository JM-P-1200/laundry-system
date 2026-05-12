import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState({ ...settings });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings updated successfully!');
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold text-brand-blue mb-4">Shop Settings</h2>
      
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4 border-bottom pb-2">General Configuration</h5>
            
            <div className="mb-3">
              <label className="form-label fw-semibold">Shop Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.shopName}
                onChange={(e) => setFormData({...formData, shopName: e.target.value})}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Price per KG ({formData.currency})</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-control" 
                  value={formData.pricePerKg}
                  onChange={(e) => setFormData({...formData, pricePerKg: parseFloat(e.target.value)})}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Delivery Fee ({formData.currency})</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="form-control" 
                  value={formData.deliveryFee}
                  onChange={(e) => setFormData({...formData, deliveryFee: parseFloat(e.target.value)})}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Store Address</label>
              <textarea 
                className="form-control" 
                rows="2"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary fw-bold px-4">SAVE CHANGES</button>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 bg-light p-4 shadow-sm">
            <h6 className="fw-bold text-muted text-uppercase small mb-3">Live Preview</h6>
            <div className="p-3 bg-white rounded border border-primary border-dashed">
              <h5 className="fw-bold text-primary mb-1">{formData.shopName}</h5>
              <p className="small text-muted mb-0">{formData.address}</p>
              <hr />
              <div className="d-flex justify-content-between small">
                <span>Standard Rate:</span>
                <span className="fw-bold">{formData.currency}{formData.pricePerKg}/kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;