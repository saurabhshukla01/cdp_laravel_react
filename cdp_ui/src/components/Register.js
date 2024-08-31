import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/apiService"; // Adjust the import path as needed

function Register() {
  // Define state variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState(""); // Updated state variable
  const [terms, setTerms] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (password !== cPassword) { // Updated variable name
      setMessage("Passwords do not match.");
      return;
    }

    if (!terms) {
      setMessage("You must agree to the terms.");
      return;
    }

    try {
      // Call the registration API
      const response = await register(name, email, password, cPassword, terms ? 1 : 0 , isAdmin ? 1 : 0); // Adjust the terms value
      
      // Provide feedback on successful registration
      // setMessage("Registration successful!");
      setMessage(response.message);
      setName("");
      setEmail("");
      setPassword("");
      setCPassword(""); // Clear the confirm password field
      setTerms(false);
      setIsAdmin(false);
    } catch (error) {
      // Handle errors
      setMessage(error?.message || "Registration failed."); // Updated to use `message`
    }
  };

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Sign Up</p>

            {/* Display message if available */}
            {message && <p className="text-center text-bold text-danger">{message}</p>}

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  name="c_password" // Updated name attribute
                  value={cPassword} // Updated value attribute
                  onChange={(e) => setCPassword(e.target.value)} // Updated setter
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="tc" // Updated name attribute
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                    {" "}
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeIsAdmin"
                      name="isAdmin" // Updated name attribute
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    {" "}
                    <label htmlFor="agreeIsAdmin">
                      Is Admin
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <Link to="/" className="text-center">
              If you have an account, Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
