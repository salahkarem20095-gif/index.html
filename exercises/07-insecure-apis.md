# Insecure API Endpoints Exercise

## Objective
Learn about common API security vulnerabilities and how to test for them.

## What are Insecure APIs?
APIs often have security issues like missing authentication, improper authorization, excessive data exposure, and lack of rate limiting.

## Vulnerable Endpoints

### 1. Unauthenticated User API
```
GET http://localhost:3000/api/users/1
```

### 2. Missing Input Validation
```
GET http://localhost:3000/api/users/../../etc/passwd
```

### 3. Excessive Data Exposure
```
GET http://localhost:3000/api/users/1
```

## Exercise Instructions

### Step 1: Test API Without Authentication
Try accessing the API without any authentication:
```
http://localhost:3000/api/users/1
http://localhost:3000/api/users/2
http://localhost:3000/api/users/99999
```

### Step 2: Enumerate Users
Try to discover all users:
```
http://localhost:3000/api/users/1
http://localhost:3000/api/users/2
http://localhost:3000/api/users/3
...
```

### Step 3: Test for IDOR
Try accessing other users' data:
```
http://localhost:3000/api/users/1
http://localhost:3000/api/users/2
```

### Step 4: Fuzz the API
Try various inputs to find unexpected behavior:
```
http://localhost:3000/api/users/1' OR '1'='1
http://localhost:3000/api/users/../../etc/passwd
http://localhost:3000/api/users/..%2F..%2Fetc%2Fpasswd
http://localhost:3000/api/users/null
http://localhost:3000/api/users/undefined
```

### Step 5: Check for Verbose Errors
Try to trigger error conditions:
```
http://localhost:3000/api/users/
http://localhost:3000/api/users
```

## Expected Results
- API should return data without authentication
- Different user IDs should return different data
- Error conditions may reveal implementation details

## Prevention
1. Implement authentication for all API endpoints
2. Use proper authorization checks
3. Limit data exposure (return only necessary fields)
4. Implement rate limiting
5. Validate all input parameters
6. Use API keys or OAuth tokens

## Secure Code Example
```javascript
const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

router.get('/users/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id;
    
    // Check if user is accessing their own data or is admin
    if (userId !== currentUserId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const user = await User.findById(userId).select('username email');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

## API Security Best Practices
1. **Authentication**: Require valid tokens for all endpoints
2. **Authorization**: Check permissions for each request
3. **Input Validation**: Validate all parameters
4. **Rate Limiting**: Prevent abuse
5. **HTTPS**: Always use TLS in production
6. **CORS**: Properly configure Cross-Origin Resource Sharing
7. **Logging**: Log all API access for monitoring
