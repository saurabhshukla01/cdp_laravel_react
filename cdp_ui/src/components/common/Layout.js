// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <main className="wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
