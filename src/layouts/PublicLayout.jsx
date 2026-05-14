import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        {/* Entry point for Home, Login, etc. */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;