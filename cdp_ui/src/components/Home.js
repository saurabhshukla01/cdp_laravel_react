import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function Home() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
  
    const handleLogout = () => {
      sessionStorage.clear();
      navigate('/');
    };
  
    return (
      <div className="home-page">
        <header className="header">
          <nav className="navbar">
            <Link to="/home" className="nav-link">Home</Link>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </nav>
        </header>
        <main className="main-content">
          <h1>Welcome to the Home Page</h1>
          {user && (
            <div className="user-info">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.is_admin === 0 ? "User" : "Admin"}</p>
            </div>
          )}
          <p>This is a demo home page.</p>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Your Company</p>
        </footer>
      </div>
    );
}
