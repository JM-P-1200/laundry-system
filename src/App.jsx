import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Context Provider
import { SettingsProvider } from './context/SettingsContext';

// Common UI Components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';

// Page Components
import { Home } from './pages/Home';
import { About } from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import OrderHistory from './pages/OrderHistory';
import Inventory from './pages/Inventory';
import ManageQueue from './pages/ManageQueue';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Settings from './pages/Settings';

/**
 * ProtectedRoute: The "Bouncer"
 */
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

/**
 * LayoutWrapper: Decides what the user sees (Public vs Admin UI)
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Every URL here will show the Sidebar instead of the Navbar
  const adminPaths = ['/dashboard', '/new-order', '/history', '/inventory', '/queue', '/customers', '/settings'];
  const isAdminPath = adminPaths.includes(location.pathname);
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isAdminPath && !isLoginPage && <Navbar />}

      <div className={isAdminPath ? "d-flex" : "container-fluid p-0"}>
        {isAdminPath && <Sidebar />}

        <main className="flex-grow-1">
          {children}
          {!isAdminPath && !isLoginPage && <Footer />}
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <SettingsProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Pages (Protected) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/new-order" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/queue" element={<ProtectedRoute><ManageQueue /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </SettingsProvider>
  );
}

export default App;