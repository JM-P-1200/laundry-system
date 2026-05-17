import React, { useState, useEffect } from 'react';
import laundryService from '../services/laundryService';
import { useSettings } from '../context/SettingsContext';

export const Customers = () => {
  const { settings } = useSettings();
  const [customerProfiles, setCustomerProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    laundryService.getAllHistoricalOrders()
      .then(orders => {
        const profileHashmap = {};

        // Run sequential map clustering to aggregate stats deterministically
        orders.forEach(order => {
          const nameKey = order.customer_name;
          const itemsSum = order.order_items?.reduce((acc, i) => acc + (parseFloat(i.weight_kg * i.unit_price) || 0), 0) || 0;
          const processingOrderCost = itemsSum + (order.delivery_type === 'Delivery' ? (parseFloat(settings?.delivery_fee) || 5.00) : 0);

          if (!profileHashmap[nameKey]) {
            profileHashmap[nameKey] = {
              name: nameKey,
              contact: order.customer_phone || 'Unregistered',
              visitsCount: 0,
              lifetimeInvestedCapital: 0
            };
          }
          profileHashmap[nameKey].visitsCount += 1;
          profileHashmap[nameKey].lifetimeInvestedCapital += processingOrderCost;
        });

        setCustomerProfiles(Object.values(profileHashmap));
      })
      .catch(err => console.error("Profile analytics reduction error:", err))
      .finally(() => setLoading(false));
  }, [settings]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Analyzing Client Profiles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-1">Customer Database</h2>
      <p className="text-muted mb-4">Insights into client engagement, frequencies, and lifecycle value parameters.</p>

      <div className="card border-0 shadow-sm bg-white p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Customer Name</th>
                <th>Contact Mobile Handle</th>
                <th>Total Frequency Count</th>
                <th>Lifetime Gross Revenue</th>
                <th className="pe-4">Tier Status</th>
              </tr>
            </thead>
            <tbody>
              {customerProfiles.map((client, index) => (
                <tr key={index}>
                  <td className="fw-bold text-primary ps-4">{client.name}</td>
                  <td className="font-monospace text-muted small">{client.contact}</td>
                  <td className="fw-semibold text-dark">{client.visitsCount} bookings</td>
                  <td className="font-monospace text-success fw-bold">
                    {settings?.currency || '$'}{client.lifetimeInvestedCapital.toFixed(2)}
                  </td>
                  <td className="pe-4">
                    {client.visitsCount >= 3 ? (
                      <span className="badge bg-warning text-dark border border-warning-subtle fw-bold px-2 py-1">
                        ⭐ VIP Platinum Client
                      </span>
                    ) : (
                      <span className="badge bg-light text-secondary border fw-medium px-2 py-1">
                        Standard Member
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {customerProfiles.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-5">
                    No active customer metrics located inside the store's transactional system.
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