import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import laundryService from '../services/laundryService';

const getServicePrice = (serviceType, basePrice = 0) => {
  const price = parseFloat(basePrice) || 0;
  if (serviceType === 'Dry Cleaning') return price * 2.5;
  if (serviceType === 'Comforter/Blanket') return price * 1.5;
  return price;
};

const BookNow = () => {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [customer, setCustomer] = useState({
    customer_name: '',
    customer_phone: '',
    delivery_type: 'Delivery',
    delivery_address: '',
    payment_method: 'Cash',
    payment_status: 'Unpaid',
    notes: ''
  });
  const [items, setItems] = useState([
    { service_type: 'Wash/Dry/Fold', weight_kg: '' }
  ]);

  const updateItem = (field, value) => {
    setItems(prev => prev.map(item => ({
      ...item,
      [field]: value
    })));
  };

  const pricedItems = items.map(item => ({
    ...item,
    unit_price: getServicePrice(item.service_type, settings?.price_per_kg)
  }));
  const subtotal = items.reduce((sum, item) => (
    sum + ((parseFloat(item.weight_kg) || 0) * getServicePrice(item.service_type, settings?.price_per_kg))
  ), 0);
  const deliveryFee = customer.delivery_type === 'Delivery' ? (parseFloat(settings?.delivery_fee) || 0) : 0;
  const total = subtotal + deliveryFee;
  const currency = settings?.currency || '$';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!customer.customer_name.trim()) return alert('Please enter your full name.');
    if (!customer.customer_phone.trim()) return alert('Please enter your mobile number.');
    if (customer.delivery_type === 'Delivery' && !customer.delivery_address.trim()) {
      return alert('Please enter your pickup and delivery address.');
    }

    setLoading(true);
    try {
      const order = await laundryService.submitNewOrder(customer, pricedItems);
      setSubmittedOrder(order);
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (submittedOrder) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 p-md-5 text-center">
              <div className="display-5 mb-3">Booking Received</div>
              <h1 className="fw-bold text-primary mb-3">Your laundry pickup is queued.</h1>
              <p className="text-muted mb-4">
                Keep this order ID for tracking: <strong className="text-dark">{submittedOrder.id}</strong>
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/track" className="btn btn-primary px-4">Track My Order</Link>
                <Link to="/" className="btn btn-outline-secondary px-4">Return Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="mb-4">
            <h1 className="fw-bold text-primary">Book Laundry Service</h1>
            <p className="text-muted mb-0">Request pickup or drop-off service without entering the staff system.</p>
          </div>

          <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4 bg-white">
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name *</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={customer.customer_name}
                  onChange={e => setCustomer({ ...customer, customer_name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Mobile Number *</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  value={customer.customer_phone}
                  onChange={e => setCustomer({ ...customer, customer_phone: e.target.value })}
                  placeholder="09xxxxxxxxx"
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Service</label>
                <select
                  className="form-select form-select-lg"
                  value={items[0].service_type}
                  onChange={e => updateItem('service_type', e.target.value)}
                >
                  <option value="Wash/Dry/Fold">Wash/Dry/Fold</option>
                  <option value="Dry Cleaning">Dry Cleaning</option>
                  <option value="Comforter/Blanket">Comforter/Blanket</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Estimated Weight (KG)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  className="form-control form-control-lg"
                  value={items[0].weight_kg}
                  onChange={e => updateItem('weight_kg', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Booking Type</label>
                <select
                  className="form-select"
                  value={customer.delivery_type}
                  onChange={e => setCustomer({ ...customer, delivery_type: e.target.value })}
                >
                  <option value="Delivery">Pickup and Delivery</option>
                  <option value="Walk-in">Shop Drop-off</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Payment Method</label>
                <select
                  className="form-select"
                  value={customer.payment_method}
                  onChange={e => setCustomer({ ...customer, payment_method: e.target.value })}
                >
                  <option value="Cash">Cash</option>
                  <option value="GCash">GCash</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>

            {customer.delivery_type === 'Delivery' && (
              <div className="mb-4">
                <label className="form-label fw-semibold">Pickup and Delivery Address *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={customer.delivery_address}
                  onChange={e => setCustomer({ ...customer, delivery_address: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-semibold">Special Instructions</label>
              <textarea
                className="form-control"
                rows="2"
                value={customer.notes}
                onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Detergent preference, pickup time, garment notes..."
              />
            </div>

            <div className="bg-light rounded p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <span className="text-muted d-block small fw-bold">ESTIMATED TOTAL</span>
                <span className="fs-2 fw-bold text-dark">{currency}{total.toFixed(2)}</span>
                {customer.delivery_type === 'Delivery' && (
                  <small className="text-info d-block">Includes {currency}{deliveryFee.toFixed(2)} delivery fee</small>
                )}
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg px-5 fw-bold">
                {loading ? 'Submitting...' : 'Book Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
