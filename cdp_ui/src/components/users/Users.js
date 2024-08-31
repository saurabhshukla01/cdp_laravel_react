import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/UserService";
import Loading from "../common/Loading"; // Adjust path as necessary

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    is_admin: false,
    tc: false,
    password: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.data.data || []);
      toast.success("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (currentUser) {
        await UserService.updateUser(currentUser.id, formData, token);
        toast.success("User updated successfully!");
      } else {
        await UserService.createUser(formData, token);
        toast.success("User created successfully!");
      }
      fetchUsers();
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        is_admin: false,
        tc: false,
        password: "",
      });
    } catch (error) {
      console.error("Error saving user", error);
      toast.error("Failed to save user.");
    } finally {
      setIsSaving(false);
      setLoading(false);
    }
  };

  const handleShowModal = (user = null) => {
    setCurrentUser(user);
    setFormData(
      user
        ? { ...user, password: "" }
        : {
            name: "",
            email: "",
            is_admin: false,
            tc: false,
            password: "",
          }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowConfirmModal = (id) => {
    setShowConfirmModal(true);
    setDeleteUserId(id);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteUserId(null);
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      await UserService.deleteUser(deleteUserId, token);
      toast.success("User deleted successfully!");
      fetchUsers();
      handleCloseConfirmModal();
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsDeleting(false);
      setLoading(false);
    }
  };

  const handleShowViewModal = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewUser(null);
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      cell: row => <strong className="text-danger">{row.name}</strong>
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      cell: row => <strong className="text-danger">{row.email}</strong>
    },
    {
      name: 'Is Admin',
      selector: row => row.is_admin,
      sortable: true,
      cell: row => row.is_admin ? "Yes" : "No"
    },
    {
      name: 'T&C',
      selector: row => row.tc,
      sortable: true,
      cell: row => row.tc ? "Yes" : "No"
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-buttons">
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleShowModal(row)}
            disabled={loading}
          >
            {loading ? "Loading..." : <i className="nav-icon fas fa-edit"></i>}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleShowConfirmModal(row.id)}
            disabled={loading}
          >
            {loading ? "Deleting..." : <i className="nav-icon fas fa-trash"></i>}
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleShowViewModal(row)}
            disabled={loading}
          >
            {loading ? "Loading..." : <i className="nav-icon fas fa-eye"></i>}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Users</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Users v1</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <button
                className="btn btn-primary"
                onClick={() => handleShowModal()}
                disabled={loading}
              >
                {loading ? "Loading..." : "Add User"}
              </button>
            </div>
            <div className="card-body">
              {loading ? (
                <Loading /> // Use the Loading component
              ) : (
                <DataTable
                  columns={columns}
                  data={users}
                  pagination
                  highlightOnHover
                  customStyles={{
                    rows: {
                      style: {
                        minHeight: '72px', // override the row height
                      },
                    },
                    headCells: {
                      style: {
                        paddingLeft: '8px', // override the cell padding for head cells
                        paddingRight: '8px',
                      },
                    },
                    cells: {
                      style: {
                        paddingLeft: '8px', // override the cell padding for data cells
                        paddingRight: '8px',
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Add User Modal */}
          {showModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div
                className="modal-dialog modal-xl modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {currentUser ? "Edit User" : "Add User"}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCloseModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleFormChange}
                              required={!currentUser}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Is Admin</label>
                            <input
                              type="checkbox"
                              className="form-control"
                              name="is_admin"
                              checked={formData.is_admin}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>T & C</label>
                            <input
                              type="checkbox"
                              className="form-control"
                              name="tc"
                              checked={formData.tc}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                    </form>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Delete Modal */}
          {showConfirmModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCloseConfirmModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this user?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseConfirmModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteUser}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View User Modal */}
          {showViewModal && viewUser && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">View User</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCloseViewModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p><strong>Name:</strong> {viewUser.name}</p>
                    <p><strong>Email:</strong> {viewUser.email}</p>
                    <p><strong>Admin:</strong> {viewUser.is_admin ? "Yes" : "No"}</p>
                    <p><strong>Terms and Conditions:</strong> {viewUser.tc ? "Yes" : "No"}</p>
                    {viewUser.profile_image && (
                      <img
                        src={viewUser.profile_image}
                        alt={viewUser.name}
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseViewModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ToastContainer />
        </div>
      </section>
    </div>
  );
};

export default Users;
