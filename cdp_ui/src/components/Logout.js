import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutModel.css';

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setShowModal(true);
  }, []);

  const handleLogout = () => {
    // Clear session storage or any other storage used for authentication
    sessionStorage.clear();
    
    // Optionally clear other related data if needed
    // localStorage.clear();
    
    alert("User is logged out successfully !!"); // Show logged out success message

    // Redirect to the login page or home page
    navigate('/');
  };

  const handleClose = () => {
    setShowModal(false);
    // Stay on the same page
    navigate(-1);
  };

  return (
    <div className="logout-page">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
