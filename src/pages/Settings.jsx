import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  
  // CRITICAL: Defensive initialization to prevent White Screen crash
  const [formData, setFormData] = useState({
    shopName: '',
    pricePerKg: 0,
    currency: '',
    deliveryFee: 0,
    address: ''
  });

  // Sync internal state when context loads
  useEffect(() => {
    if (settings) {
      // Settings arrive from context after the shell loads; copy them into the editable form once available.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ 
      shop_name: settings.shop_name || '',
      price_per_kg: settings.price_per_kg || '',
      delivery_fee: settings.delivery_fee || '',
      address: settings.address || ''
       });
    }
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings updated successfully!');
  };

  // Prevent rendering if settings hasn't loaded to avoid layout shift (CLS)
  if (!settings) return <div className="p-4 text-muted">Initializing system...</div>;

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h2 className="fw-bold text-brand-blue mb-1">Shop Configuration</h2>
        <p className="text-muted small">Manage global shop parameters and pricing models.</p>
      </header>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4 border-bottom pb-2">General System Settings</h5>
            
            <div className="mb-3">
              <label className="form-label fw-semibold small">Commercial Shop Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.shop_name || ''}
                onChange={(e) => setFormData({...formData, shop_name: e.target.value})}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Base Price per KG ({formData.currency})</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-control" 
                  value={formData.price_per_kg || ''}
                  onChange={(e) => setFormData({...formData, price_per_kg: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Standard Delivery Surcharge ({formData.currency})</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="form-control" 
                  value={formData.delivery_fee || ''}
                  onChange={(e) => setFormData({...formData, delivery_fee: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small">Physical Business Address</label>
              <textarea 
                className="form-control" 
                rows="2"
                value={formData.address  || ''}
                onChange={(e) => setFormData({...formData, address: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary fw-bold px-4 py-2 w-100 w-sm-auto">
              APPLY CHANGES
            </button>
          </form>
        </div>

        {/* Live System Preview */}
        <div className="col-lg-4">
          <div className="card border-0 bg-white p-4 shadow-sm h-100">
            <h6 className="fw-bold text-muted text-uppercase x-small mb-3">System Preview</h6>
            <div className="p-3 bg-light rounded border border-primary border-dashed">
              <h5 className="fw-bold text-primary mb-1">{formData.shopName || 'Shop Name'}</h5>
              <p className="small text-muted mb-0">{formData.address || 'No Address Set'}</p>
              <hr className="my-3" />
              <div className="d-flex justify-content-between small">
                <span>Revenue Rate:</span>
                <span className="fw-bold text-dark">{formData.currency}{formData.pricePerKg}/kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; // Ensure this is present!
