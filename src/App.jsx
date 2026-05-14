import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';

// Layout Imports
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';

// Page Imports
import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import ManageQueue from './pages/ManageQueue';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import TrackOrder from './pages/TrackOrder';
import Settings from './pages/Settings'; // Ensure this exists

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          {/* PUBLIC NAVIGATION SHELL */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* INTERNAL MANAGEMENT SHELL */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/queue" element={<ManageQueue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;