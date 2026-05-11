import React from 'react';

const Services = () => {
  const serviceList = [
    { title: "Wash & Fold", price: "$2.00/kg", desc: "Expert cleaning and precise folding for your daily wear." },
    { title: "Dry Cleaning", price: "$10.00+", desc: "Professional care for suits, silks, and delicate fabrics." },
    { title: "Ironing & Pressing", price: "$1.50/pc", desc: "Crisp, wrinkle-free clothes delivered on hangers." },
    { title: "Duvet & Curtains", price: "$15.00+", desc: "Deep cleaning for heavy household textiles." }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-brand-blue">Professional Services</h2>
        <p className="text-muted">High-quality care for every type of fabric.</p>
      </div>
      <div className="row g-4">
        {serviceList.map((service, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body p-4">
                <div className="mb-3 text-brand-blue">
                  <span className="badge bg-primary-subtle text-brand-blue p-2">Premium</span>
                </div>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted small">{service.desc}</p>
                <h6 className="text-brand-blue fw-bold mt-auto">{service.price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;