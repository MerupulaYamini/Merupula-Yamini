import { fetchWithAuth } from '../utils/apiInterceptor';

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

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
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
 * Register API call
 * @param {FormData} formData - Registration form data with multipart/form-data
 * Required fields: username, email, password, profilePicture
 * Optional fields: bio
 * @returns {Promise} Response data
 */
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: formData,
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
        message: data.message || 'Registration failed',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout API call
 * @returns {Promise} Response data
 */
export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
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
 * Get my profile (current user)
 * @returns {Promise} User profile data
 */
export const getMyProfile = async () => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/profile/me`, {
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
        message: data.message || 'Failed to fetch profile',
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update my profile (current user)
 * @param {FormData} formData - Profile data (username, bio, profilePicture)
 * @returns {Promise} Updated profile data
 */
export const updateMyProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetchWithAuth(`${API_BASE_URL}/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
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
        message: data.message || 'Failed to update profile',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }
    
    if (data.username) {
      localStorage.setItem('username', data.username);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Change password (current user)
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Success response
 */
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/profile/password`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
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
        message: data.message || 'Failed to change password',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all users (Admin only)
 * @returns {Promise} Array of users
 */
export const getAllUsers = async () => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users`, {
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
    throw error;
  }
};

/**
 * Get user by ID (Admin only)
 * @param {number} userId - User ID
 * @returns {Promise} User details with roles
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users/${userId}`, {
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
        message: data.message || 'Failed to fetch user details',
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user status (Accept pending user)
 * @param {number} userId - User ID
 * @param {string} status - New status (ACTIVE, PENDING, etc.)
 * @returns {Promise} Success response
 */
export const updateUserStatus = async (userId, status) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users/${userId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
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
        message: data.message || 'Failed to update user status',
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user (Decline pending user)
 * @param {number} userId - User ID
 * @returns {Promise} Success response
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw {
          status: response.status,
          message: data.message || 'Failed to delete user',
          data
        };
      } else {
        throw {
          status: response.status,
          message: 'Failed to delete user'
        };
      }
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};

/**
 * Admin reset user password
 * @param {number} userId - User ID whose password to reset
 * @param {string} newPassword - New password for the user
 * @returns {Promise} Success response
 */
export const adminResetUserPassword = async (userId, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/password`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword }),
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
        message: data.message || 'Failed to reset user password',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user role (Admin only)
 * @param {number} userId - User ID whose role to update
 * @param {string} role - New role (ADMIN or EMPLOYEE)
 * @returns {Promise} Success response
 */
export const updateUserRole = async (userId, role) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
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
        message: data.message || 'Failed to update user role',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get user profile picture as blob
 * @param {number} userId - User ID
 * @returns {Promise<Blob>} Profile picture blob
 */
export const getUserProfilePicture = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetchWithAuth(`${API_BASE_URL}/profile/${userId}/picture`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile picture');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw error;
  }
};
