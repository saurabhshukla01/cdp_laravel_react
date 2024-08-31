import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/products/';

const getAllProducts = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createProduct = (productData, token) => {
  return axios.post(API_URL, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateProduct = (productId, productData, token) => {
  return axios.put(`${API_URL}${productId}/`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteProduct = (productId, token) => {
  return axios.delete(`${API_URL}${productId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const productService = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
