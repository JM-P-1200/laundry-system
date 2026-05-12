import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

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
import Customers from './pages/Customers'; // New Import

/**
 * Gatekeeper: Ensures only logged-in staff can access admin pages.
 */
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

/**
 * LayoutWrapper: Switches between the Marketing UI and the Admin UI.
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Update: Included '/customers' in admin paths
  const adminPaths = ['/dashboard', '/new-order', '/history', '/inventory', '/queue', '/customers'];
  const isAdminPath = adminPaths.includes(location.pathname);
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* Show Navbar/Footer only on public, non-login pages */}
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
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Tools */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/new-order" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/queue" element={<ProtectedRoute><ManageQueue /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;