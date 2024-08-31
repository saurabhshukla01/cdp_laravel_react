import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ProductService from '../../services/ProductService';
import CategoryService from '../../services/CategoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../common/Loading';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', detail: '', category_id: null });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await ProductService.getAllProducts(token);
      const getAllProductsData = response && response.data && response.data.data ? response.data.data : [];
      if (getAllProductsData.length > 0) {
        setProducts(getAllProductsData);
        setFilteredProducts(getAllProductsData); // Initially, set filtered products to all products
        toast.success('Products fetched successfully!');
      } else {
        toast.error('Failed to fetch products.');
      }
    } catch (error) {
      toast.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await CategoryService.getAllCategories(token);
      const getAllCategoryData = response && response.data && response.data.data ? response.data.data : [];
      if (getAllCategoryData.length > 0) {
        setCategory(getAllCategoryData);
        toast.success('Category fetched successfully!');
      } else {
        toast.info('No Category found.');
      }
    } catch (error) {
      console.error('Error saving categories', error);
      toast.error('Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (product = null) => {
    setCurrentProduct(product);
    setFormData(
      product
        ? { name: product.name, detail: product.detail, category_name: product.category_name, category_id: product.category_id }
        : { name: '', detail: '', category_id: null }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (currentProduct) {
        await ProductService.updateProduct(currentProduct.id, formData, token);
        toast.success('Product updated successfully!');
      } else {
        await ProductService.createProduct(formData, token);
        toast.success('Product added successfully!');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product', error);
      toast.error('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowConfirmModal = (id) => {
    setShowConfirmModal(true);
    setDeleteProductId(id);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteProductId(null);
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      await ProductService.deleteProduct(deleteProductId, token);
      toast.success('Product deleted!');
      fetchProducts();
      handleCloseConfirmModal();
    } catch (error) {
      toast.error('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewProduct(null);
  };

  const handleCategoryFilter = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId === '') {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      const filtered = products.filter(product => product.category_id === parseInt(categoryId));
      setFilteredProducts(filtered);
    }
  };

  const columns = [
    {
      name: 'Category Name',
      selector: row => <strong className="text-dark">{row.category_name}</strong>,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => <strong className="text-danger">{row.name}</strong>,
      sortable: true,
    },
    {
      name: 'Detail',
      cell: row => <small className="text-dark">{row.detail}</small>,
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
            onClick={() => handleViewProduct(row)}
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
              <h1 className="m-0">Products</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Products</li>
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
                Add Product
              </button>
              <select
                className="form-control float-right"
                style={{ width: '200px' }}
                value={selectedCategory}
                onChange={handleCategoryFilter}
                disabled={loading}
              >
                <option value="">Filter by Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="card-body">
              <DataTable
                columns={columns}
                data={filteredProducts}
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
                <h5 className="modal-title">{currentProduct ? 'Edit Product' : 'Add Product'}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Category Name</label>
                    <select
                      className="form-control"
                      name="category_id"
                      value={formData.category_id || ''}
                      onChange={handleFormChange}
                      required={true}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Detail</label>
                    <textarea
                      className="form-control"
                      name="detail"
                      value={formData.detail}
                      onChange={handleFormChange}
                      required={true}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveProduct}
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
                <p>Are you sure you want to delete this product?</p>
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
                  onClick={handleDeleteProduct}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewModal && viewProduct && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="close" onClick={handleCloseViewModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewProduct.name}</p>
                <p><strong>Detail:</strong> {viewProduct.detail}</p>
                <p><strong>Category:</strong> {viewProduct.category_name}</p>
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
  );
};

export default Products;
