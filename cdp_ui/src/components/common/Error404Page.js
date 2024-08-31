// components/common/Error404Page.js
import React from 'react';
import UserError404Page from './UserError404Page';
import AdminError404Page from './AdminError404Page';
import Login from '../Login';

const Error404Page = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  // Check if user is authenticated and their role
  const isAuthenticated = user && user.token ? true : false;
  const isAdmin = user?.is_admin === 1;

  // Render UserError404Page if not authenticated
  if (!isAuthenticated) {
    return <UserError404Page />;
  }

  // Render AdminError404Page if authenticated and is an admin
  if (isAuthenticated && isAdmin) {
    return <AdminError404Page />;
  }

  // Default to user error page if authenticated but not admin
  return <UserError404Page />;
};

export default Error404Page;
