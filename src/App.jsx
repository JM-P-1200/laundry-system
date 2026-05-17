import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';

// Layout Architecture
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';

// Public/Hero Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import TrackOrder from './pages/TrackOrder';

// Admin System Pages
import Dashboard from './pages/Dashboard';
import { NewOrder } from './pages/NewOrder';
import { ActiveQueue } from './pages/ActiveQueue';
import ManageQueue from './pages/ManageQueue';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import OrderHistory from './pages/OrderHistory';
import Settings from './pages/Settings';

/**
 * APP COMPONENT (v6.0)
 * Logic: Implements Nested Routing with Context-Aware Layouts.
 * Standards: React 19, Vite 6, 8pt Grid Spacing.
 */
function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          
          {/* 
            GROUP 1: PUBLIC HERO NAVIGATION 
            Rationale: These routes are wrapped in PublicLayout to provide 
            the global Navbar, Footer, and the Cloud Data Loading Shield.
          */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* 
            GROUP 2: INTERNAL ADMIN SYSTEM 
            Rationale: These routes are wrapped in AdminLayout for 
            Authentication (isAdmin) and the Persistent Sidebar.
          */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/queue" element={<ActiveQueue />} />
            <Route path="/queue" element={<ManageQueue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* 
            GLOBAL FALLBACK 
            Prevents White Screens on mistyped URLs by redirecting to Hero.
          */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;