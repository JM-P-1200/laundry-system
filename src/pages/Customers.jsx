import React, { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
    
    // Logic: Group orders by Customer Name + Contact
    const customerMap = savedOrders.reduce((acc, order) => {
      const key = `${order.name}-${order.contact}`;
      if (!acc[key]) {
        acc[key] = {
          name: order.name,
          contact: order.contact,
          totalSpent: 0,
          orderCount: 0,
          lastOrder: order.id
        };
      }
      acc[key].totalSpent += parseFloat(order.total);
      acc[key].orderCount += 1;
      return acc;
    }, {});

    // Convert object to array and sort by highest spenders
    const customerList = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);
    setCustomers(customerList);
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-brand-blue mb-1">Customer Database</h2>
        <p className="text-muted small">Insights into your most loyal clients.</p>
      </div>

      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Customer Name</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th className="text-end pe-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((c, i) => (
                  <tr key={i}>
                    <td className="ps-4">
                      <div className="fw-bold">{c.name}</div>
                    </td>
                    <td>{c.contact}</td>
                    <td>{c.orderCount}</td>
                    <td className="fw-bold text-success">${c.totalSpent.toFixed(2)}</td>
                    <td className="text-end pe-4">
                      {c.totalSpent > 100 ? (
                        <span className="badge bg-primary">VIP Gold</span>
                      ) : (
                        <span className="badge bg-light text-dark border">Regular</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">No customer data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;