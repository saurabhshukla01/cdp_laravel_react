// CrmApp.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Users from './components/users/Users';
import Home from './components/Home';
import Products from './components/products/Products';
import Login from './components/Login';
import Logout from './components/Logout';  // Adjust the import path as needed
import Error404Page from './components/common/Error404Page';
import Register from './components/Register';
import Categories from './components/categories/Categories';


// Mock function to check if user is authenticated
const isAuthenticated = () => {
  // Replace with your authentication logic
  return !!sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

const CrmApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/" element={<Layout />}>
          <Route exact path="admin/users" element={<ProtectedRoute element={<Users />} />} />
          <Route exact path="admin/products" element={<ProtectedRoute element={<Products />} />} />
          <Route exact path="admin/categories" element={<ProtectedRoute element={<Categories />} />} />
        </Route>

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
};

export default CrmApp;
