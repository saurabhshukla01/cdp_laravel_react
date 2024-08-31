// components/common/AdminError404Page.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminError404Page = () => {
  return (
    <div className="d-flex vh-100">
      <div className="container my-auto">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-1 text-warning">404</h1>
            <h2 className="mb-4"><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h2>
            <p className="mb-4">
              We could not find the page you were looking for.
              Meanwhile, you may <Link to="/admin/dashboard">return to the home page</Link> or try using the search form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminError404Page;
