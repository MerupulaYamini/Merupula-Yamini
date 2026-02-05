# Backend CORS Configuration Fix

## Problem
Your backend is returning "Invalid CORS request" because it's configured to only allow `http://localhost:5137`, but the frontend is running on `http://localhost:5140`.

## Solution: Update Backend CORS Configuration

### Option 1: Allow Specific Port (Recommended for Development)

Update your Spring Boot backend CORS configuration to allow the current frontend port:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5140") // Update this line
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Option 2: Allow Multiple Ports (Better for Development)

Allow multiple localhost ports:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5137",
                    "http://localhost:5138", 
                    "http://localhost:5139",
                    "http://localhost:5140",
                    "http://localhost:3000"  // Common React port
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Option 3: Allow All Localhost (Development Only - NOT for Production)

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("http://localhost:*") // Allows any localhost port
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Option 4: Using @CrossOrigin Annotation

If you're using `@CrossOrigin` annotation on your controllers:

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5140") // Update this
public class AuthController {
    // Your controller methods
}
```

Or allow multiple origins:

```java
@CrossOrigin(origins = {
    "http://localhost:5137",
    "http://localhost:5140"
})
```

## After Making Changes

1. **Restart your Spring Boot backend**
2. **Clear browser cache** (or use incognito mode)
3. **Try logging in again**

## Verify CORS Configuration

Test your CORS configuration with curl:

```bash
curl -H "Origin: http://localhost:5140" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     http://localhost:8080/api/auth/login
```

You should see these headers in the response:
```
Access-Control-Allow-Origin: http://localhost:5140
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: *
```

## Current Setup

- **Frontend URL:** `http://localhost:5140`
- **Backend URL:** `http://localhost:8080`
- **Backend CORS Currently Allows:** `http://localhost:5137` ❌
- **Backend CORS Should Allow:** `http://localhost:5140` ✅

## Quick Test

After updating backend CORS, test the login endpoint directly:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5140" \
  -d '{"email":"vijaymanu969@gmail.com","password":"Vijay@4321"}'
```

If this works, your frontend will work too!

## Alternative: Force Frontend to Use Port 5137

If you can't change the backend, close other processes using port 5137:

1. Find processes using port 5137:
   ```bash
   netstat -ano | findstr :5137
   ```

2. Kill the process:
   ```bash
   taskkill /PID <process_id> /F
   ```

3. Restart frontend - it will use port 5137

## Need Help?

If you're still having issues:
1. Check backend console logs for CORS errors
2. Check browser console Network tab for the actual error
3. Verify backend is running on port 8080
4. Make sure you restarted backend after CORS changes
