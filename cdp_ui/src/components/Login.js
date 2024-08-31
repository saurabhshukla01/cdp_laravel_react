import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/apiService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errData, setErrData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrData([]);
    if (!validate()) {
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await login(email, password);
      if (response.success) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        alert(response.message);
        if (response.data.is_admin === 1) {
          navigate('/admin/products');
        } else {
          navigate('/home');
        }
      } else {
        setErrData([response.message || 'Invalid email or password']);
      }
    } catch (error) {
      setErrData([error.message || 'Invalid email or password']);
    } finally {
      setLoading(false); // Stop loading
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
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              {emailError && <div className="text-danger mb-2">{emailError}</div>}
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {passwordError && <div className="text-danger mb-2">{passwordError}</div>}
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </div>
            </form>
            <Link to="/register" className="text-center">If you have not login account ? Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
