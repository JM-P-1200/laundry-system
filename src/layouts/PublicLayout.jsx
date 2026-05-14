import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSettings } from '../context/SettingsContext';

const PublicLayout = () => {
  const { loading } = useSettings();

  // 1. DATA GUARD: Prevent rendering Navbar/Footer until settings are safe
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading Brand Assets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-white animate__animated animate__fadeIn">
      {/* Navbar: Height usually 64px - 72px (Multiple of 8) */}
      <Navbar />

      <main className="flex-grow-1">
        {/* OUTLET: The window for Home, Services, About, etc. */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;