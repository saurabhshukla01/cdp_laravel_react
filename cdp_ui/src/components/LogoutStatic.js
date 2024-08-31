import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Clear session storage or any other storage used for authentication
    sessionStorage.clear();
    
    // Optionally clear other related data if needed
    // localStorage.clear();

    // Redirect to the login page or home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
}
