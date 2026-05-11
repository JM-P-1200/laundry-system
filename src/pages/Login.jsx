import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a secret admin PIN
    if (pin === '1234') { 
      localStorage.setItem('isAdmin', 'true');
      navigate('/dashboard');
    } else {
      alert('Access Denied: Invalid PIN');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="display-6 fw-bold text-brand-blue">🫧 BubbleWorks</h1>
          <p className="text-muted">Staff Access Only</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Enter Staff PIN</label>
            <input 
              type="password" 
              className="form-control form-control-lg text-center" 
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength="4"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">UNLOCK SYSTEM</button>
        </form>
        <div className="text-center mt-4">
          <a href="/" className="text-decoration-none small text-muted">← Return to Public Site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;