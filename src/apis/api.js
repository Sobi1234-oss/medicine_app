// src/apis/api.js
import axios from 'axios';

// IP address for Android emulator to access Laravel backend
const BASE_URL = 'http://192.168.43.126:8000/api'; // Must match backend

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axiosInstance.get('/categories');
  return data;
};
export const storeProduct = async (formData) => {
  try {
    const response = await axiosInstance.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
      transformRequest: () => formData, // Bypass axios default JSON transformation
    });
    return response.data;
  } catch (error) {
    console.error('Error storing product:', error.response?.data || error.message);
    throw error;
  }
};
export const storeCategory = async (formData) => {
  try {
    const response = await axiosInstance.post('/categories', formData);
    return response.data;
  } catch (error) {
    console.error('Error storing category:', error.response?.data || error.message);
    throw error;
  }
};
// Add this to your existing api.js
export const storeUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};
export const updateProduct = async (productId, formData, imageFile = null) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('description', formData.description || '');

    if (imageFile) {
      formDataToSend.append('image', {
        uri: imageFile.uri,
        type: imageFile.type || 'image/jpeg',
        name: imageFile.fileName || `product_${productId}.jpg`,
      });
    }

    const response = await axiosInstance.post(`/products/${productId}?_method=PUT`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error.response?.data || error.message);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, statusData) => {
  try {
    const response = await axiosInstance.patch(`/orders/${orderId}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error.response?.data || error.message);
    throw error;
  }
};
export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Order creation error:', error.response?.data);
    throw {
      message: error.response?.data?.message || 'Order creation failed',
      errors: error.response?.data?.errors,
      status: error.response?.status
    };
  }
};
export const getOrderHistory = async (userId) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error.response?.data || error.message);
    throw error;
  }
};
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};
export const fetchOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data.data; // only return the array
};
// Store FCM Token
export const storeFCMToken = async (userId, token) => {
  try {
    const response = await axiosInstance.post('/store-fcm-token', {
      user_id: userId,
      fcm_token: token
    });
    return response.data;
  } catch (error) {
    console.error('Error storing FCM token:', error.response?.data || error.message);
    throw error;
  }
};

// Send Order Notification
export const sendOrderNotification = async (orderId, adminId) => {
  try {
    const response = await axiosInstance.post('/send-notification', {
      title: 'New Order Received',
      message: `New order #${orderId} has been placed`,
      order_id: orderId,
      user_id: adminId
    });
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error.response?.data || error.message);
    throw error;
  }
};

// Get Admin ID (you might need this to know who to notify)
export const getAdminId = async () => {
  try {
    const response = await axiosInstance.get('/admin-id');
    return response.data.admin_id;
  } catch (error) {
    console.error('Error getting admin ID:', error.response?.data || error.message);
    throw error;
  }
};
export default axiosInstance;
