import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/categories/';

const getAllCategories = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createCategory = (categoryData, token) => {
  return axios.post(API_URL, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateCategory = (categoryId, categoryData, token) => {
  return axios.put(`${API_URL}${categoryId}/`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteCategory = (categoryId, token) => {
  return axios.delete(`${API_URL}${categoryId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const CategoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
