import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useSettings } from '../context/SettingsContext';

const AdminLayout = () => {
  const { loading, settings } = useSettings();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // 1. PRIORITY CHECK: If no auth, bounce immediately
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. DATA CHECK: Show spinner only while waiting for cloud data
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem', borderWidth: '0.25rem' }} role="status"></div>
        <p className="fw-bold text-muted animate-pulse">Establishing Secure Database Connection...</p>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 overflow-x-hidden">
        {/* p-4 provides 32px padding, adhering to the 8pt grid system */}
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;