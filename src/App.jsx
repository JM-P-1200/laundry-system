import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import TrackOrder from './pages/TrackOrder';
import ManageQueue from './pages/ManageQueue';

/**
 * LayoutWrapper handles the visual switch between:
 * 1. The Public Website (Navbar + Footer)
 * 2. The Admin System (Sidebar)
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // List every path that should show the Admin Sidebar here
  const adminPaths = ['/dashboard', '/new-order', '/history', '/inventory', '/queue'];
  const isAdminPath = adminPaths.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only on Public Pages */}
      {!isAdminPath && <Navbar />}

      <div className={isAdminPath ? "d-flex" : "container-fluid p-0"}>
        {/* Show Sidebar only on Admin Pages */}
        {isAdminPath && <Sidebar />}

        <main className="flex-grow-1">
          {children}
          {/* Show Footer only on Public Pages */}
          {!isAdminPath && <Footer />}
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
          <Route path="/queue" element={<ManageQueue />} />
          
          {/* Admin/Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;