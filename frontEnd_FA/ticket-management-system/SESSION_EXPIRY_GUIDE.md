# Session Expiry Handling

## Overview
This application now includes automatic session expiry detection and handling. When your JWT token expires, you'll be automatically logged out and shown a clear message.

## How It Works

### 1. API Interceptor (`src/utils/apiInterceptor.js`)
- Wraps all authenticated API calls with `fetchWithAuth()`
- Detects 401 (Unauthorized) responses from the backend
- Automatically triggers logout and shows a modal when session expires

### 2. Session Expiry Flow
1. User makes an API request with an expired JWT token
2. Backend returns 401 Unauthorized status
3. `fetchWithAuth()` intercepts the response
4. User data is cleared from localStorage
5. Modal popup appears: "Session Expired - Please login again to continue"
6. User clicks "Go to Login" button
7. User is redirected to `/login` page

### 3. Modal Features
- **Title**: "Session Expired"
- **Message**: "Your session has expired. Please login again to continue."
- **Button**: "Go to Login"
- **Behavior**: Modal only shows once (prevents multiple popups)
- **Auto-redirect**: Clicking OK or Cancel redirects to login page

## Implementation Details

### Updated Services
Both `authService.js` and `ticketService.js` now use `fetchWithAuth()` instead of native `fetch()` for all authenticated API calls.

### Protected Endpoints
All endpoints that require authentication are now protected:
- Profile operations (view, update, change password)
- User management (admin operations)
- Ticket operations (create, read, update, delete)
- Comments and attachments

### What Gets Cleared on Session Expiry
- `token` - JWT authentication token
- `userId` - User ID
- `username` - Username
- `email` - User email
- `roles` - User roles (ADMIN, EMPLOYEE)

## Testing Session Expiry

### Manual Testing
1. Login to the application
2. Wait for token to expire (or manually expire it in backend)
3. Try to perform any action (view profile, create ticket, etc.)
4. You should see the "Session Expired" modal
5. Click "Go to Login" to return to login page

### Simulating Expired Token
You can test by:
1. Opening browser DevTools (F12)
2. Go to Application/Storage → Local Storage
3. Modify the `token` value to an invalid string
4. Try to perform any authenticated action
5. Session expiry modal should appear

## User Experience
- **Clear messaging**: Users know exactly why they were logged out
- **Single modal**: Prevents multiple popups from simultaneous API calls
- **Automatic cleanup**: All user data is cleared properly
- **Easy recovery**: One click to return to login page

## Developer Notes
- The `isSessionExpiredModalShown` flag prevents duplicate modals
- All API calls automatically benefit from session expiry handling
- No need to manually check for 401 in component code
- Login and Register endpoints don't use the interceptor (they don't need auth)
