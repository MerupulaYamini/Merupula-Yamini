import { Modal } from 'antd';

let isSessionExpiredModalShown = false;

/**
 * Handle session expiry - show modal and logout
 */
const handleSessionExpiry = () => {
  if (isSessionExpiredModalShown) {
    return;
  }
  
  isSessionExpiredModalShown = true;
  
  // Clear all auth data
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('roles');
  
  // Show modal
  Modal.error({
    title: 'Session Expired',
    content: 'Your session has expired. Please login again to continue.',
    okText: 'Go to Login',
    onOk: () => {
      isSessionExpiredModalShown = false;
      window.location.href = '/login';
    },
    onCancel: () => {
      isSessionExpiredModalShown = false;
      window.location.href = '/login';
    },
  });
};

/**
 * Enhanced fetch wrapper that handles session expiry
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
export const fetchWithAuth = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // Check for 401 Unauthorized (token expired or invalid)
    if (response.status === 401) {
      handleSessionExpiry();
      throw {
        status: 401,
        message: 'Session expired. Please login again.',
        isSessionExpired: true
      };
    }
    
    return response;
  } catch (error) {
    // If it's a network error or other fetch error, rethrow
    if (error.isSessionExpired) {
      throw error;
    }
    
    // For other errors, check if we can parse response
    throw error;
  }
};

/**
 * Reset the modal flag (useful for testing)
 */
export const resetSessionExpiredFlag = () => {
  isSessionExpiredModalShown = false;
};
