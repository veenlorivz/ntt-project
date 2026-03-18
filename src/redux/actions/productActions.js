import axios from 'axios';

export const fetchProducts = (searchQuery = '') => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const url = searchQuery 
      ? `https://dummyjson.com/products/search?q=${searchQuery}`
      : 'https://dummyjson.com/products';
    const response = await axios.get(url);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.products });
    return response.data.products;
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Failed to fetch products';
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: errorMsg });
    throw new Error(errorMsg);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const newProduct = { ...productData, id: productData.id || Date.now() };
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: newProduct });
    return newProduct;
  } catch (err) {
    dispatch({ type: 'ADD_PRODUCT_FAILURE', payload: 'Failed to add product' });
    throw err;
  }
};

export const editProduct = ({ id, data }) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRODUCT_REQUEST' });
  try {
    const updatedProduct = { id, ...data };
    dispatch({ type: 'EDIT_PRODUCT_SUCCESS', payload: updatedProduct });
    return updatedProduct;
  } catch (err) {
    dispatch({ type: 'EDIT_PRODUCT_FAILURE', payload: 'Failed to edit product' });
    throw err;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
    return id;
  } catch (err) {
    dispatch({ type: 'DELETE_PRODUCT_FAILURE', payload: 'Failed to delete product' });
    throw err;
  }
};
