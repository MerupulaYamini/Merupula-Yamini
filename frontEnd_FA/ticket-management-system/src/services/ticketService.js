import { getAuthHeaders } from './authService';
import { fetchWithAuth } from '../utils/apiInterceptor';

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

    const response = await fetchWithAuth(url, {
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
        message: data.message || 'Failed to fetch tickets',
        data
      };
    }

    return data;
  } catch (error) {
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
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size) queryParams.append('size', params.size);
    if (params.sort) queryParams.append('sort', params.sort);

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tickets/my-tickets${queryString ? `?${queryString}` : ''}`;

    const response = await fetchWithAuth(url, {
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
        message: data.message || 'Failed to fetch my tickets',
        data
      };
    }

    return data;
  } catch (error) {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}`, {
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
  try {
    const formData = new FormData();
    
    formData.append('title', ticketData.title);
    formData.append('description', ticketData.description);
    formData.append('label', ticketData.label);
    formData.append('assignedToUserId', ticketData.assignedToUserId);
    
    if (ticketData.attachments && ticketData.attachments.length > 0) {
      ticketData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    
    if (ticketData.attachmentUrls && ticketData.attachmentUrls.length > 0) {
      ticketData.attachmentUrls.forEach((url) => {
        formData.append('attachmentUrls', url);
      });
    }

    const token = localStorage.getItem('token');
    
    if (!token) {
      throw {
        status: 401,
        message: 'No authentication token found. Please login again.'
      };
    }
    
    const url = `${API_BASE_URL}/tickets`;
    
    const response = await fetchWithAuth(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
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
        message: data.message || 'Failed to create ticket',
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
 * Update a ticket (PATCH - partial update)
 * @param {number} ticketId - Ticket ID
 * @param {Object} ticketData - Updated ticket data (only fields to update)
 * @returns {Promise} Updated ticket data
 */
export const updateTicket = async (ticketId, ticketData) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}`, {
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
 * Get ticket attachment URL
 * @param {number} ticketId - Ticket ID
 * @param {number} index - Attachment index (0-based)
 * @returns {string} Attachment URL
 */
export const getTicketAttachmentUrl = (ticketId, index) => {
  const token = localStorage.getItem('token');
  return `${API_BASE_URL}/tickets/${ticketId}/attachments/${index}?token=${token}`;
};

/**
 * Download ticket attachment
 * @param {number} ticketId - Ticket ID
 * @param {number} index - Attachment index
 * @param {string} filename - Filename for download
 */
export const downloadTicketAttachment = async (ticketId, index, filename) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}/attachments/${index}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw {
          status: response.status,
          message: data.message || 'Failed to download attachment',
          data
        };
      } else {
        throw {
          status: response.status,
          message: 'Failed to download attachment'
        };
      }
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `attachment-${index}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    throw error;
  }
};

/**
 * Update ticket status
 * @param {number} ticketId - Ticket ID
 * @param {string} status - New status (TODO, IN_PROGRESS, PAUSED, PR_REVIEW, READY_TO_DEPLOY, DEPLOYED_DONE)
 * @returns {Promise} Updated ticket data
 */
export const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}/status`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
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
    throw error;
  }
};
