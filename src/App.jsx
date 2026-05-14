import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';

// Pages
import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import ManageQueue from './pages/ManageQueue';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import TrackOrder from './pages/TrackOrder';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          {/* GROUP 1: PUBLIC PAGES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* GROUP 2: ADMIN PAGES (All Protected by AdminLayout) */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/queue" element={<ManageQueue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;