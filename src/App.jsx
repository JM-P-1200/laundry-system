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

/**
 * Gatekeeper: Only allows access to children if 'isAdmin' is true in localStorage.
 */
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

/**
 * LayoutWrapper handles the visual switch between Public and Admin UI.
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  const adminPaths = ['/dashboard', '/new-order', '/history', '/inventory', '/queue'];
  const isAdminPath = adminPaths.includes(location.pathname);
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* Hide Navbar/Footer on Admin pages AND Login page */}
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/new-order" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/queue" element={<ProtectedRoute><ManageQueue /></ProtectedRoute>} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;