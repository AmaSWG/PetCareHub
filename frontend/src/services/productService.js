import api from '../api/axios';

const API_BASE_URL = '/api/products';

const productService = {
  getAllProducts: () => api.get(API_BASE_URL),
  getProductById: (id) => api.get(`${API_BASE_URL}/${id}`),
  searchProducts: (keyword) => api.get(`${API_BASE_URL}/search?keyword=${keyword}`),
  getProductsByCategory: (category) => api.get(`${API_BASE_URL}/category/${category}`),
  createProduct: (productData) => api.post(API_BASE_URL, productData),
  updateProduct: (id, productData) => api.put(`${API_BASE_URL}/${id}`, productData),
  deleteProduct: (id) => api.delete(`${API_BASE_URL}/${id}`)
};

export default productService;
