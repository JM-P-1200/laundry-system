import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // CRITICAL: Must import Outlet
import Sidebar from '../components/common/Sidebar';

const AdminLayout = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Security Guard: Prevent horizontal scroll by using overflow-x-hidden
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex bg-light min-vh-100 overflow-x-hidden">
      {/* Sidebar: Fixed 280px width to maintain 8pt grid alignment */}
      <Sidebar />
      
      {/* Main Content: flex-grow ensures it fills remaining space */}
      <main className="flex-grow-1 p-4" style={{ minWidth: 0 }}>
        <div className="container-fluid">
          {/* THE OUTLET: This is where /dashboard or /inventory appears */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;