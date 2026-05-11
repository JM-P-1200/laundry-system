import React from 'react';

const Products = () => {
  const products = [
    { name: "Eco-Detergent", price: "$12.00", category: "Cleaning" },
    { name: "Fabric Softener", price: "$8.00", category: "Finishing" },
    { name: "Reusable Laundry Bag", price: "$5.00", category: "Storage" }
  ];

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-brand-blue mb-4 text-center">Shop Our Essentials</h2>
      <div className="row g-4">
        {products.map((product, index) => (
          <div key={index} className="col-md-4">
            <div className="card border-0 shadow-sm p-3 text-center">
              <div className="bg-light rounded py-5 mb-3">
                <span className="text-muted">Product Image Placeholder</span>
              </div>
              <h6 className="text-uppercase text-secondary small fw-bold">{product.category}</h6>
              <h5 className="fw-bold">{product.name}</h5>
              <p className="text-brand-blue fw-bold">{product.price}</p>
              <button className="btn btn-outline-primary btn-sm">Add to Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;