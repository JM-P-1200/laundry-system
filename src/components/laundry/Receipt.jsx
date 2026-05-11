import React from 'react';

const Receipt = ({ data }) => {
  return (
    <div id="printable-receipt" className="d-none d-print-block p-4" style={{ width: '80mm', fontFamily: 'monospace' }}>
      <div className="text-center border-bottom pb-3 mb-3">
        <h4 className="fw-bold mb-0">🫧 BUBBLEWORKS</h4>
        <small>Premium Laundry Care</small>
      </div>
      <div className="small">
        <div className="d-flex justify-content-between"><span>ID:</span> <strong>{data.id}</strong></div>
        <div className="d-flex justify-content-between"><span>Date:</span> <span>{new Date().toLocaleDateString()}</span></div>
        <hr className="my-2" style={{ borderStyle: 'dashed' }} />
        <div className="mb-1"><strong>Customer:</strong> {data.name}</div>
        <div className="mb-1"><strong>Service:</strong> {data.service}</div>
        <div className="mb-1"><strong>Weight:</strong> {data.weight}kg</div>
        <div className="mb-3"><strong>Method:</strong> {data.method}</div>
        <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-2">
          <span>TOTAL:</span>
          <span>${data.total}</span>
        </div>
      </div>
      <div className="text-center mt-4 small border-top pt-3">
        <p>Scan to Track Status</p>
        <div className="bg-light p-3 border">QR CODE PLACEHOLDER</div>
        <p className="mt-3">Thank you for your business!</p>
      </div>
    </div>
  );
};

export default Receipt;