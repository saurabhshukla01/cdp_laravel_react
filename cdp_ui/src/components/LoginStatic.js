import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errData, setErrData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Replace with your actual login logic
    if (username === 'admin' && password === 'password') {
      setIsSubmitted(true);
      navigate('/dashboard'); // Redirect to dashboard or another route
    } else {
      setErrData(['Invalid username or password']);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          {/* Add logo if needed */}
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in</p>
            {errData.length > 0 && (
              <ul className="text-danger" role="alert">
                {errData.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            <form onSubmit={handleSubmit} method="post">
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
