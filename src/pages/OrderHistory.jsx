import React from 'react';

const OrderHistory = () => {
  const history = [
    { id: "#1001", customer: "John Doe", date: "2024-05-01", status: "Completed", total: "$15.00" },
    { id: "#1002", customer: "Jane Smith", date: "2024-05-02", status: "Picked Up", total: "$25.00" },
    { id: "#1003", customer: "Mike Ross", date: "2024-05-03", status: "Cancelled", total: "$0.00" },
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-brand-blue">Order History</h2>
        <input type="text" className="form-control w-25" placeholder="Search orders..." />
      </div>
      
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((order, index) => (
                <tr key={index}>
                  <td className="fw-bold">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`badge ${order.status === 'Completed' ? 'bg-success' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-info'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total}</td>
                  <td><button className="btn btn-sm btn-outline-primary">View Receipt</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;