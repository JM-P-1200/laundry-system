import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [items, setItems] = useState([]);

  // 1. Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('laundry_inventory') || '[]');
    if (saved.length === 0) {
      // Default items if empty
      const defaults = [
        { id: 1, item: "Premium Detergent", category: "Cleaning", stock: 85, unit: "Liters", minLevel: 20 },
        { id: 2, item: "Fabric Softener", category: "Finishing", stock: 12, unit: "Liters", minLevel: 15 }
      ];
      setItems(defaults);
      localStorage.setItem('laundry_inventory', JSON.stringify(defaults));
    } else {
      setItems(saved);
    }
  }, []);

  // 2. Update Logic
  const updateStock = (id, amount) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + amount);
        return { ...item, stock: newStock };
      }
      return item;
    });
    setItems(updated);
    localStorage.setItem('laundry_inventory', JSON.stringify(updated));
  };

  const getStatus = (item) => {
    if (item.stock === 0) return { label: 'Out of Stock', class: 'bg-danger-subtle text-danger' };
    if (item.stock <= item.minLevel) return { label: 'Low Stock', class: 'bg-warning-subtle text-warning' };
    return { label: 'In Stock', class: 'bg-success-subtle text-success' };
  };

  // 3. Stats Calculation
  const totalSkus = items.length;
  const lowStock = items.filter(i => i.stock > 0 && i.stock <= i.minLevel).length;
  const outOfStock = items.filter(i => i.stock === 0).length;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-brand-blue">Inventory Management</h2>
        <button className="btn btn-primary" onClick={() => alert("Add Item logic coming in next update!")}>+ Add Item</button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-primary border-4">
            <small className="text-muted fw-bold">Total SKUs</small>
            <h3 className="fw-bold mb-0">{totalSkus}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-warning border-4">
            <small className="text-muted fw-bold">Low Stock Alerts</small>
            <h3 className="fw-bold mb-0 text-warning">{lowStock}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 border-start border-danger border-4">
            <small className="text-muted fw-bold">Out of Stock</small>
            <h3 className="fw-bold mb-0 text-danger">{outOfStock}</h3>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive p-3">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Item Name</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th className="text-end">Adjust Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const status = getStatus(item);
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="fw-bold">{item.item}</div>
                      <small className="text-muted">{item.category}</small>
                    </td>
                    <td style={{ width: '30%' }}>
                      <div className="progress mb-1" style={{ height: '6px' }}>
                        <div 
                          className={`progress-bar ${item.stock <= item.minLevel ? 'bg-warning' : 'bg-primary'}`} 
                          style={{ width: `${Math.min(item.stock, 100)}%` }}
                        ></div>
                      </div>
                      <small className="text-muted">{item.stock} {item.unit} remaining</small>
                    </td>
                    <td><span className={`badge rounded-pill px-3 ${status.class}`}>{status.label}</span></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => updateStock(item.id, -1)}>-</button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => updateStock(item.id, 1)}>+</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;