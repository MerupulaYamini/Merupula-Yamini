# CORS Configuration Guide

## Problem
The frontend and backend are running on different ports, causing CORS (Cross-Origin Resource Sharing) errors:
- Frontend: `http://localhost:5140` (or 5137-5139)
- Backend: `http://localhost:8080`

## Solution Implemented: Vite Proxy

We've configured a Vite proxy that forwards all `/api` requests from the frontend to the backend. This eliminates CORS issues because the browser thinks all requests are going to the same origin.

### Configuration in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5137,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
```

### How It Works:

1. Frontend makes request to: `/api/auth/login`
2. Vite proxy intercepts and forwards to: `http://localhost:8080/api/auth/login`
3. Backend responds to Vite proxy
4. Vite proxy sends response back to frontend
5. No CORS error because browser sees same-origin request

### Updated API Service:

The `authService.js` now uses relative URLs:
```javascript
const API_BASE_URL = '/api'; // Instead of 'http://localhost:8080/api'
```

## Alternative Solutions

### Option 1: Update Backend CORS Configuration
If you prefer not to use a proxy, update your backend CORS configuration to allow the frontend port:

```java
// In your Spring Boot backend
@CrossOrigin(origins = "http://localhost:5140") // Or whatever port frontend uses
```

Or allow all localhost ports:
```java
@CrossOrigin(origins = "http://localhost:*")
```

### Option 2: Use Specific Port
Close other processes using ports 5137-5139 so the frontend runs on the expected port 5137.

## Current Setup

✅ **Frontend:** `http://localhost:5140`
✅ **Backend:** `http://localhost:8080`
✅ **Proxy:** Configured in Vite
✅ **API Calls:** Use relative paths (`/api/auth/login`)

## Testing

1. Start backend: `http://localhost:8080`
2. Start frontend: `npm run dev` (runs on port 5140)
3. Navigate to: `http://localhost:5140`
4. Try logging in with:
   - Email: `vijaymanu969@gmail.com`
   - Password: `Vijay@4321`

The login should now work without CORS errors!

## Troubleshooting

### Still Getting CORS Errors?
1. Make sure backend is running on port 8080
2. Clear browser cache and cookies
3. Check browser console for actual error message
4. Verify proxy configuration in `vite.config.js`

### Backend Not Responding?
1. Check if backend is running: `http://localhost:8080/api/auth/login`
2. Test with Postman or curl
3. Check backend logs for errors

### Wrong Port?
If you need to use a specific port, update `vite.config.js`:
```javascript
server: {
  port: 5137, // Your desired port
  strictPort: true, // Fail if port is in use
}
```
