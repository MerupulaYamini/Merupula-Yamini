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
 * Create a new ticket
 * @param {Object} ticketData - Ticket data
 * @returns {Promise} Created ticket data
 */
export const createTicket = async (ticketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(ticketData),
    });

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
    console.error('Create ticket error:', error);
    throw error;
  }
};

/**
 * Update a ticket
 * @param {number} ticketId - Ticket ID
 * @param {Object} ticketData - Updated ticket data
 * @returns {Promise} Updated ticket data
 */
export const updateTicket = async (ticketId, ticketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: 'PUT',
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
