// Base API URL - using relative path to leverage Vite proxy
const API_BASE_URL = '/api';

/**
 * Login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Response is not JSON (likely CORS error or HTML error page)
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw {
        status: response.status,
        message: 'Server returned an invalid response. Please check CORS configuration.',
        data: text
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Login failed',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error.message && error.message.includes('JSON')) {
      throw {
        status: 0,
        message: 'CORS Error: Backend is blocking the request. Please update backend CORS configuration to allow http://localhost:5140',
        data: null
      };
    }
    throw error;
  }
};

/**
 * Register API call (for future use)
 * @param {FormData} formData - Registration form data with multipart/form-data
 * @returns {Promise} Response data
 */
export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: formData, // FormData automatically sets Content-Type to multipart/form-data
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'Registration failed',
      fieldErrors: data.fieldErrors || null,
      data
    };
  }

  return data;
};

/**
 * Logout API call
 * @returns {Promise} Response data
 */
export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('roles');

  return { success: true };
};

/**
 * Get authorization headers for protected API calls
 * @returns {Object} Headers object with Authorization token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get current user info from localStorage
 * @returns {Object} User information
 */
export const getCurrentUser = () => {
  return {
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
  };
};

/**
 * Get all users (Admin only)
 * @returns {Promise} Array of users
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw {
        status: response.status,
        message: 'Server returned an invalid response',
        data: text
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Failed to fetch users',
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};
