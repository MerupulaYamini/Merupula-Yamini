# Authentication Service

This directory contains API service functions for authentication and other backend integrations.

## authService.js

### Available Functions:

#### `loginUser(email, password)`
Authenticates a user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise with user data including token, userId, username, email, and roles

**Example:**
```javascript
import { loginUser } from './services/authService';

try {
  const data = await loginUser('user@example.com', 'password123');
  console.log('Login successful:', data);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

#### `registerUser(formData)`
Registers a new user (uses multipart/form-data for file upload).

**Parameters:**
- `formData` (FormData): Form data containing username, email, password, profilePicture, and bio

**Example:**
```javascript
const formData = new FormData();
formData.append('username', 'john_doe');
formData.append('email', 'john@example.com');
formData.append('password', 'MyPass123!');
formData.append('profilePicture', fileObject);
formData.append('bio', 'Optional bio');

const data = await registerUser(formData);
```

#### `logoutUser()`
Logs out the current user and clears local storage.

**Example:**
```javascript
await logoutUser();
```

#### `getAuthHeaders()`
Returns authorization headers for protected API calls.

**Returns:** Object with Authorization header

**Example:**
```javascript
const headers = getAuthHeaders();
// { 'Authorization': 'Bearer token...', 'Content-Type': 'application/json' }
```

#### `isAuthenticated()`
Checks if user is currently authenticated.

**Returns:** Boolean

#### `getCurrentUser()`
Gets current user information from localStorage.

**Returns:** Object with userId, username, email, and roles

## Backend API Configuration

**Base URL:** `http://localhost:8080/api`

**Endpoints:**
- Login: `POST /auth/login`
- Register: `POST /auth/register`
- Logout: `POST /auth/logout`

**Token Storage:**
- Tokens are stored in localStorage
- Token expires in 1 hour
- Include token in Authorization header for protected routes

## Error Handling

All service functions throw errors with the following structure:
```javascript
{
  status: 401,
  message: "Invalid email or password",
  fieldErrors: { email: "Invalid format" }, // Optional
  data: { /* full response */ }
}
```

Handle errors in your components:
```javascript
try {
  await loginUser(email, password);
} catch (error) {
  if (error.fieldErrors) {
    // Handle validation errors
  } else {
    // Handle general errors
    console.error(error.message);
  }
}
```
