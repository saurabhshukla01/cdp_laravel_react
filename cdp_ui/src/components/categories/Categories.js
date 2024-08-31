import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import CategoryService from '../../services/CategoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../common/Loading';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', is_active: '1' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredData = categories.filter(category =>
      category.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredCategories(filteredData);
  }, [filterText, categories]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await CategoryService.getAllCategories(token);
      const getAllCategoryData = response?.data?.data || [];
      if (getAllCategoryData.length > 0) {
        setCategories(getAllCategoryData);
        setFilteredCategories(getAllCategoryData);
        toast.success('Categories fetched successfully!');
      } else {
        toast.info('No Categories found.');
      }
    } catch (error) {
      console.error('Error fetching categories', error);
      toast.error('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (category = null) => {
    setCurrentCategory(category);
    setFormData(category ? { name: category.name, is_active: category.is_active.toString() } : { name: '', is_active: '1' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveCategory = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (currentCategory) {
        await CategoryService.updateCategory(currentCategory.id, formData, token);
        toast.success('Category updated successfully!');
      } else {
        await CategoryService.createCategory(formData, token);
        toast.success('Category added successfully!');
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save Category.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowConfirmModal = (id) => {
    setShowConfirmModal(true);
    setDeleteCategoryId(id);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteCategoryId(null);
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      await CategoryService.deleteCategory(deleteCategoryId, token);
      toast.success('Category deleted successfully!');
      fetchCategories();
      handleCloseConfirmModal();
    } catch (error) {
      console.error('Error deleting category', error);
      toast.error('Failed to delete category.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCategory = (category) => {
    setViewCategory(category);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewCategory(null);
  };

  const columns = [
    {
      name: 'Name',
      selector: row => <strong className="text-danger">{row.name}</strong>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => <strong className="text-dark">{row.is_active === 1 ? "Active" : "Inactive"}</strong>,
      sortable: true,
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
            <i className="nav-icon fas fa-edit"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleShowConfirmModal(row.id)}
            disabled={loading}
          >
            <i className="nav-icon fas fa-trash"></i>
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleViewCategory(row)}
            disabled={loading}
          >
            <i className="nav-icon fas fa-eye"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Category</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="#">Home</Link>
                </li>
                <li className="breadcrumb-item active">Category</li>
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
                Add Category
              </button>
              <input
                type="text"
                className="form-control float-right"
                placeholder="Filter Categories"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                style={{ width: '200px' }}
              />
            </div>
            <div className="card-body">
              <DataTable
                columns={columns}
                data={filteredCategories}
                pagination
                progressPending={loading}
                progressComponent={<div>Loading...</div>}
              />
            </div>
          </div>
        </div>
      </section>

      {loading && <Loading />}

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentCategory ? 'Edit Category' : 'Add Category'}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="is_active">Status</label>
                    <select
                      id="is_active"
                      className="form-control"
                      name="is_active"
                      value={formData.is_active}
                      onChange={handleFormChange}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveCategory}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={handleCloseConfirmModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this category?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmModal}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteCategory}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Category</h5>
                <button type="button" className="close" onClick={handleCloseViewModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewCategory?.name}</p>
                <p><strong>Status:</strong> {viewCategory?.is_active === 1 ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseViewModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Categories;
