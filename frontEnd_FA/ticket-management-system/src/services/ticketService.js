import { getAuthHeaders } from './authService';

const API_BASE_URL = '/api';

/**
 * Get all tickets with optional filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search in title/description
 * @param {string} params.status - Filter by status (TODO, IN_PROGRESS, REVIEW, READY_TO_DEPLOY)
 * @param {string} params.label - Filter by label (NEW_FEATURE, BUG, IMPROVEMENT)
 * @param {number} params.assignedToId - Filter by assigned user ID
 * @param {number} params.page - Page number (0-based)
 * @param {number} params.size - Items per page (default: 10)
 * @param {string} params.sort - Sort by field,direction (e.g., "createdAt,desc")
 * @returns {Promise} Paginated ticket data
 */
export const getAllTickets = async (params = {}) => {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.label) queryParams.append('label', params.label);
    if (params.assignedToId) queryParams.append('assignedToId', params.assignedToId);
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size) queryParams.append('size', params.size);
    if (params.sort) queryParams.append('sort', params.sort);

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tickets${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
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

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Failed to fetch tickets',
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Get tickets error:', error);
    throw error;
  }
};

/**
 * Get tickets assigned to current user
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (0-based)
 * @param {number} params.size - Items per page (default: 10)
 * @param {string} params.sort - Sort by field,direction (e.g., "createdAt,desc")
 * @returns {Promise} Paginated ticket data
 */
export const getMyTickets = async (params = {}) => {
  try {
    console.log('Fetching my tickets with params:', params);
    
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size) queryParams.append('size', params.size);
    if (params.sort) queryParams.append('sort', params.sort);

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tickets/my-tickets${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
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

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Failed to fetch my tickets',
        data
      };
    }

    console.log('My tickets fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Get my tickets error:', error);
    throw error;
  }
};

/**
 * Get a single ticket by ID
 * @param {number} ticketId - Ticket ID
 * @returns {Promise} Ticket data
 */
export const getTicketById = async (ticketId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
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
        message: data.message || 'Failed to fetch ticket',
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Get ticket error:', error);
    throw error;
  }
};

/**
 * Create a new ticket with multipart/form-data
 * @param {Object} ticketData - Ticket data
 * @param {string} ticketData.title - Required, max 150 characters
 * @param {string} ticketData.description - Required
 * @param {string} ticketData.label - Required (BUG, FEATURE, TASK, IMPROVEMENT, SUPPORT)
 * @param {number} ticketData.assignedToUserId - Required, valid user ID
 * @param {File[]} ticketData.attachments - Optional, max 10MB per file
 * @param {string[]} ticketData.attachmentUrls - Optional, external URLs
 * @returns {Promise} Created ticket data
 */
export const createTicket = async (ticketData) => {
  console.log('=== CREATE TICKET SERVICE ===');
  console.log('Input data:', ticketData);
  
  try {
    // Create FormData for multipart/form-data
    console.log('1. Creating FormData...');
    const formData = new FormData();
    
    // Add required fields
    console.log('2. Adding required fields to FormData...');
    formData.append('title', ticketData.title);
    console.log('   - Added title:', ticketData.title);
    
    formData.append('description', ticketData.description);
    console.log('   - Added description (length):', ticketData.description.length);
    
    formData.append('label', ticketData.label);
    console.log('   - Added label:', ticketData.label);
    
    formData.append('assignedToUserId', ticketData.assignedToUserId);
    console.log('   - Added assignedToUserId:', ticketData.assignedToUserId);
    
    // Add optional file attachments
    if (ticketData.attachments && ticketData.attachments.length > 0) {
      console.log('3. Adding file attachments...');
      ticketData.attachments.forEach((file, index) => {
        formData.append('attachments', file);
        console.log(`   - Added file ${index + 1}:`, file.name, `(${file.size} bytes)`);
      });
    } else {
      console.log('3. No file attachments to add');
    }
    
    // Add optional attachment URLs
    if (ticketData.attachmentUrls && ticketData.attachmentUrls.length > 0) {
      console.log('4. Adding attachment URLs...');
      ticketData.attachmentUrls.forEach((url, index) => {
        formData.append('attachmentUrls', url);
        console.log(`   - Added URL ${index + 1}:`, url);
      });
    } else {
      console.log('4. No attachment URLs to add');
    }

    // Get auth token
    const token = localStorage.getItem('token');
    console.log('5. JWT Token:', token ? `${token.substring(0, 20)}...` : 'NOT FOUND');
    
    if (!token) {
      throw {
        status: 401,
        message: 'No authentication token found. Please login again.'
      };
    }
    
    const url = `${API_BASE_URL}/tickets`;
    console.log('6. Making POST request to:', url);
    console.log('   - Method: POST');
    console.log('   - Content-Type: multipart/form-data (set by browser)');
    console.log('   - Authorization: Bearer token');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // NO Content-Type header - browser sets it automatically for FormData
      },
      body: formData,
    });

    console.log('7. Response received:');
    console.log('   - Status:', response.status);
    console.log('   - Status Text:', response.statusText);
    console.log('   - OK:', response.ok);

    const contentType = response.headers.get('content-type');
    console.log('   - Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('8. ERROR: Non-JSON response:', text);
      throw {
        status: response.status,
        message: 'Server returned an invalid response',
        data: text
      };
    }

    const data = await response.json();
    console.log('8. Response data:', data);

    if (!response.ok) {
      console.error('9. ERROR: Request failed');
      console.error('   - Status:', response.status);
      console.error('   - Message:', data.message);
      console.error('   - Field Errors:', data.fieldErrors);
      throw {
        status: response.status,
        message: data.message || 'Failed to create ticket',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    console.log('9. SUCCESS: Ticket created successfully');
    return data;
  } catch (error) {
    console.error('=== CREATE TICKET ERROR ===');
    console.error('Error:', error);
    throw error;
  }
};

/**
 * Update a ticket (PATCH - partial update)
 * @param {number} ticketId - Ticket ID
 * @param {Object} ticketData - Updated ticket data (only fields to update)
 * @returns {Promise} Updated ticket data
 */
export const updateTicket = async (ticketId, ticketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(ticketData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Failed to update ticket',
        fieldErrors: data.fieldErrors || null,
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Update ticket error:', error);
    throw error;
  }
};

/**
 * Delete a ticket
 * @param {number} ticketId - Ticket ID
 * @returns {Promise} Success response
 */
export const deleteTicket = async (ticketId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      throw {
        status: response.status,
        message: data.message || 'Failed to delete ticket',
        data
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete ticket error:', error);
    throw error;
  }
};

/**
 * Map backend status to frontend format
 */
export const mapStatus = (status) => {
  const statusMap = {
    'TODO': 'todo',
    'IN_PROGRESS': 'in-progress',
    'REVIEW': 'review',
    'READY_TO_DEPLOY': 'ready-to-deploy'
  };
  return statusMap[status] || status.toLowerCase();
};

/**
 * Map backend label to frontend format
 */
export const mapLabel = (label) => {
  const labelMap = {
    'NEW_FEATURE': 'new-feature',
    'BUG': 'bug',
    'IMPROVEMENT': 'improvement'
  };
  return labelMap[label] || label.toLowerCase();
};

/**
 * Map frontend status to backend format
 */
export const mapStatusToBackend = (status) => {
  const statusMap = {
    'todo': 'TODO',
    'in-progress': 'IN_PROGRESS',
    'review': 'REVIEW',
    'ready-to-deploy': 'READY_TO_DEPLOY'
  };
  return statusMap[status] || status.toUpperCase();
};

/**
 * Map frontend label to backend format
 */
export const mapLabelToBackend = (label) => {
  const labelMap = {
    'new-feature': 'NEW_FEATURE',
    'bug': 'BUG',
    'improvement': 'IMPROVEMENT'
  };
  return labelMap[label] || label.toUpperCase();
};

/**
 * Update ticket status
 * @param {number} ticketId - Ticket ID
 * @param {string} status - New status (TODO, IN_PROGRESS, PAUSED, PR_REVIEW, READY_TO_DEPLOY, DEPLOYED_DONE)
 * @returns {Promise} Updated ticket data
 */
export const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
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
        message: data.message || 'Failed to update ticket status',
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Update ticket status error:', error);
    throw error;
  }
};

/**
 * Add a comment to a ticket
 * @param {number} ticketId - Ticket ID
 * @param {string} content - Comment content (max 5000 characters)
 * @returns {Promise} Updated ticket data with new comment
 */
export const addComment = async (ticketId, content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content }),
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
        message: data.message || 'Failed to add comment',
        data
      };
    }

    return data;
  } catch (error) {
    console.error('Add comment error:', error);
    throw error;
  }
};
