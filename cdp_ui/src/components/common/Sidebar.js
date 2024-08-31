import React from "react";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <img
          src={`${process.env.PUBLIC_URL}/admin/dist/img/AdminLTELogo.png`}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">CRM PANEL</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
                src={`${process.env.PUBLIC_URL}/admin/dist/img/user2-160x160.jpg`}
                className="img-circle elevation-2"
                alt="User Image"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
          </div>
          <div className="info">
            <NavLink
              to="#"
              className="d-block text-danger text-bold"
            >
              {user ? user.name : "Admin"}
            </NavLink>
            <NavLink
              to="#"
              className="d-block text-warning text-bold"
            >
              {user ? (user.is_admin === 1 ? "( Admin )" : "( User )") : ""}
            </NavLink>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink
                to="/admin/products"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <i className="nav-icon fas fa-box"></i>
                <p>Products</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <i className="nav-icon fas fa-list"></i>
                <p>Users</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/categories"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <i className="nav-icon fas fa-tools"></i>
                <p>Categories</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
