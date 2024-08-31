// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="navbar-search"
            href="#"
            role="button"
          >
            <i className="fas fa-search"></i>
          </a>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        {/* Profile Icon */}
        <li className="nav-item">
          <Link className="nav-link" to="#" role="button">
            <div
              className="image"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {user?.image_path ? (
                <img
                  src={user.image_path}
                  className="img-circle elevation-2"
                  alt="User Image"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }} // Adjust the size as needed
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/admin/dist/img/user2-160x160.jpg`}
                  className="img-circle elevation-2"
                  alt="User Image"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }} // Adjust the size as needed
                />
              )}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
