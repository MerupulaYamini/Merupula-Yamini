# Ticket Management API Integration

## ✅ Successfully Integrated!

The dashboard now fetches real ticket data from your backend API.

## What's Been Implemented

### 1. Ticket Service (`src/services/ticketService.js`)

Complete API integration for ticket operations:

- ✅ `getAllTickets(params)` - Fetch tickets with filters and pagination
- ✅ `getTicketById(id)` - Get single ticket details
- ✅ `createTicket(data)` - Create new ticket
- ✅ `updateTicket(id, data)` - Update existing ticket
- ✅ `deleteTicket(id)` - Delete ticket
- ✅ Helper functions for status/label mapping

### 2. Updated Dashboard (`src/pages/dashboard/DashboardContent.jsx`)

- ✅ Fetches real tickets from backend on load
- ✅ Search functionality with 500ms debounce
- ✅ Status filter (TODO, IN_PROGRESS, REVIEW, READY_TO_DEPLOY)
- ✅ Label filter (NEW_FEATURE, BUG, IMPROVEMENT)
- ✅ Pagination with Previous/Next buttons
- ✅ Loading states
- ✅ Delete ticket functionality
- ✅ View ticket navigation
- ✅ Real-time ticket count display

## API Endpoints Used

### GET /api/tickets
**Query Parameters:**
```javascript
{
  search: "bug fix",           // Search in title/description
  status: "IN_PROGRESS",       // Filter by status
  label: "BUG",                // Filter by label
  assignedToId: 123,           // Filter by assigned user
  page: 0,                     // Page number (0-based)
  size: 10,                    // Items per page
  sort: "createdAt,desc"       // Sort order
}
```

**Response:**
```javascript
{
  "content": [
    {
      "id": 1,
      "title": "Fix login bug",
      "label": "BUG",
      "status": "IN_PROGRESS",
      "createdById": 2,
      "createdByName": "John Admin",
      "assignedToId": 3,
      "assignedToName": "Jane Employee",
      "attachmentCount": 2,
      "createdAt": "2026-02-05T12:00:00Z",
      "updatedAt": "2026-02-05T13:30:00Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 25,
  "totalPages": 3,
  "first": true,
  "last": false
}
```

### DELETE /api/tickets/{id}
Deletes a ticket and refreshes the list.

## Features

### Search
- Type in the search box to filter tickets by title/description
- 500ms debounce to avoid excessive API calls
- Automatically fetches filtered results

### Filters
- **Status Filter:** All, TODO, IN_PROGRESS, REVIEW, READY_TO_DEPLOY
- **Label Filter:** All, NEW_FEATURE, BUG, IMPROVEMENT
- Resets to page 0 when filter changes

### Pagination
- Shows current page range (e.g., "Showing 1-10 of 25 tickets")
- Previous/Next buttons
- Disabled when on first/last page
- Maintains filters across pages

### Loading States
- Shows "Loading tickets..." while fetching
- Disables buttons during operations
- Smooth user experience

## Data Mapping

Backend uses UPPERCASE_WITH_UNDERSCORES, frontend uses lowercase-with-dashes:

**Status Mapping:**
```javascript
Backend → Frontend
TODO → todo
IN_PROGRESS → in-progress
REVIEW → review
READY_TO_DEPLOY → ready-to-deploy
```

**Label Mapping:**
```javascript
Backend → Frontend
NEW_FEATURE → new-feature
BUG → bug
IMPROVEMENT → improvement
```

## Authentication

All API calls include the JWT token from localStorage:

```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Testing

1. **Login** with your credentials:
   - Email: `vijaymanu969@gmail.com`
   - Password: `Vijay@4321`

2. **Dashboard** will automatically load tickets from backend

3. **Try the features:**
   - Search for tickets
   - Filter by status/label
   - Navigate between pages
   - Delete a ticket
   - View ticket details

## Proxy Configuration

The Vite proxy forwards all `/api` requests to `http://localhost:8080`:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    secure: false
  }
}
```

## Console Logs

You can see API requests in the terminal:
```
Sending Request to the Target: GET /api/tickets?page=0&size=10&sort=createdAt%2Cdesc
Received Response from the Target: 200 /api/tickets?page=0&size=10&sort=createdAt%2Cdesc
```

## Next Steps

Ready to integrate:
- ✅ Create Ticket API
- ✅ Update Ticket API
- ✅ Get Ticket Details API
- ✅ User Management APIs
- ✅ Registration API

All service functions are already created and ready to use!

## Troubleshooting

### No tickets showing?
1. Check if backend is running on port 8080
2. Check browser console for errors
3. Verify JWT token is stored in localStorage
4. Check terminal for proxy logs

### 401 Unauthorized?
- Token might be expired (1 hour expiry)
- Login again to get a new token

### CORS errors?
- Make sure backend CORS allows `http://localhost:5140`
- Check BACKEND_CORS_FIX.md for instructions
