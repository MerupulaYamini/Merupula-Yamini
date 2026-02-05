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
 * Register API call
 * @param {FormData} formData - Registration form data with multipart/form-data
 * Required fields: username, email, password, profilePicture
 * Optional fields: bio
 * @returns {Promise} Response data
 */
export const registerUser = async (formData) => {
  try {
    console.log('=== REGISTER USER SERVICE ===');
    console.log('Sending registration request...');
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: formData, // FormData automatically sets Content-Type to multipart/form-data
      // NO headers - browser sets Content-Type automatically for FormData
    });

    console.log('Response status:', response.status);
    console.log('Response OK:', response.ok);

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw {
        status: response.status,
        message: 'Server returned an invalid response',
        data: text
      };
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('Registration failed');
      console.error('  - Status:', response.status);
      console.error('  - Message:', data.message);
      console.error('  - Field errors:', data.fieldErrors);
      
      throw {
        status: response.status,
        message: data.message || 'Registration failed',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    console.log('Registration successful!');
    return data;
  } catch (error) {
    console.error('=== REGISTER USER ERROR ===');
    console.error('Error:', error);
    throw error;
  }
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
 * Get my profile (current user)
 * @returns {Promise} User profile data
 */
export const getMyProfile = async () => {
  try {
    console.log('Fetching my profile...');
    const response = await fetch(`${API_BASE_URL}/profile/me`, {
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

    console.log('My profile fetched:', data);
    return data;
  } catch (error) {
    console.error('Get my profile error:', error);
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
    console.log('Updating my profile...');
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - browser will set it with boundary for FormData
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

    console.log('Profile updated successfully:', data);
    
    // Update localStorage with new username if changed
    if (data.username) {
      localStorage.setItem('username', data.username);
    }
    
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
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
    console.log('Changing password...');
    const response = await fetch(`${API_BASE_URL}/profile/password`, {
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

    console.log('Password changed successfully');
    return data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
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

/**
 * Get user by ID (Admin only)
 * @param {number} userId - User ID
 * @returns {Promise} User details with roles
 */
export const getUserById = async (userId) => {
  try {
    console.log(`Fetching user details for ID: ${userId}`);
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
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

    console.log('User details fetched:', data);
    return data;
  } catch (error) {
    console.error('Get user by ID error:', error);
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
    console.log(`Updating user ${userId} status to ${status}`);
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
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

    console.log('User status updated successfully');
    return data;
  } catch (error) {
    console.error('Update user status error:', error);
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
    console.log(`Deleting user ${userId}`);
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
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

    console.log('User deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
