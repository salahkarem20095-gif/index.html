# Information Disclosure Exercise

## Objective
Learn how sensitive information can be exposed through various application endpoints.

## What is Information Disclosure?
Information disclosure occurs when an application reveals sensitive information that can be used by attackers to exploit other vulnerabilities.

## Vulnerable Endpoints

### 1. Debug Endpoint
```
GET http://localhost:3000/debug
```

### 2. Error Messages
Try triggering errors with invalid inputs:
```
http://localhost:3000/profile?id=abc
http://localhost:3000/file?file=../../../etc/passwd
```

## Exercise Instructions

### Step 1: Access Debug Information
Visit the debug endpoint:
```
http://localhost:3000/debug
```

### Step 2: Analyze Exposed Data
Look for sensitive information:
- Environment variables (may contain API keys, database credentials)
- Node.js version (reveals technology stack)
- Platform information (helps target specific exploits)
- Memory usage (can reveal application state)

### Step 3: Error Message Analysis
Trigger errors and analyze the messages:
- Database errors may reveal table structure
- Stack traces may reveal code structure
- Validation errors may reveal business logic

## Expected Results
- Debug endpoint should expose sensitive system information
- Error messages may reveal internal details

## Prevention
1. Never expose debug endpoints in production
2. Implement proper error handling
3. Return generic error messages to users
4. Log detailed errors server-side only
5. Disable stack traces in production
6. Remove development artifacts before deployment

## Secure Code Example
```javascript
// Production error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log detailed error
  
  res.status(500).json({
    error: 'Internal Server Error'
    // Don't send: err.message, err.stack, etc.
  });
});

// Disable debug endpoints in production
if (process.env.NODE_ENV !== 'development') {
  app.delete('/debug', (req, res) => {
    res.status(404).send();
  });
}
```

## Common Information Leaks
- Stack traces revealing framework versions
- Comments in HTML/JS revealing development notes
- .git directories exposing source code
- Backup files with sensitive data
- API keys in client-side code
- Database credentials in config files
