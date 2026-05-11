import React from 'react';

const Inventory = () => {
  // Mock data for laundry supplies
  const supplies = [
    { id: 1, item: "Premium Detergent", category: "Cleaning", stock: 85, unit: "Liters", status: "In Stock" },
    { id: 2, item: "Fabric Softener", category: "Finishing", stock: 12, unit: "Liters", status: "Low Stock" },
    { id: 3, item: "Oxygen Bleach", category: "Cleaning", stock: 45, unit: "kg", status: "In Stock" },
    { id: 4, item: "Dry Cleaning Solvent", category: "Chemicals", stock: 0, unit: "Liters", status: "Out of Stock" },
    { id: 5, item: "Plastic Hangers", category: "Packaging", stock: 500, unit: "Pieces", status: "In Stock" },
  ];

  // Helper to determine color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-success-subtle text-success';
      case 'Low Stock': return 'bg-warning-subtle text-warning';
      case 'Out of Stock': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle';
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-brand-blue mb-1">Inventory Management</h2>
          <p className="text-muted small">Track and manage your shop supplies.</p>
        </div>
        <button className="btn btn-primary shadow-sm">+ Add New Item</button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-primary border-4">
            <h6 className="text-muted small fw-bold">Total SKUs</h6>
            <h3 className="fw-bold mb-0">24</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-warning border-4">
            <h6 className="text-muted small fw-bold">Low Stock Alerts</h6>
            <h3 className="fw-bold mb-0 text-warning">3</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-danger border-4">
            <h6 className="text-muted small fw-bold">Out of Stock</h6>
            <h3 className="fw-bold mb-0 text-danger">1</h3>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive p-3">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th className="border-0">Item Name</th>
                <th className="border-0">Category</th>
                <th className="border-0">Stock Level</th>
                <th className="border-0">Status</th>
                <th className="border-0 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="fw-bold">{item.item}</div>
                    <small className="text-muted">{item.unit}</small>
                  </td>
                  <td><span className="text-muted">{item.category}</span></td>
                  <td style={{ width: '25%' }}>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar ${item.stock < 20 ? 'bg-danger' : 'bg-primary'}`} 
                        role="progressbar" 
                        style={{ width: `${item.item === 'Plastic Hangers' ? 75 : item.stock}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{item.stock} {item.unit} remaining</small>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2">Update</button>
                    <button className="btn btn-sm btn-outline-primary">Order</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;