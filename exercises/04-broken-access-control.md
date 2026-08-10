# Broken Access Control Exercise

## Objective
Learn how broken access controls can allow unauthorized access to protected functionality.

## What is Broken Access Control?
Broken access control occurs when users can act outside their intended permissions, accessing functions or data they shouldn't be able to.

## Vulnerable Code
```javascript
app.get('/admin', (req, res) => {
  const role = req.query.role || 'guest';
  if (role === 'admin') {
    res.send('<h1>Admin Dashboard</h1>');
  } else {
    res.status(403).send('Access Denied');
  }
});
```

## Exercise Instructions

### Step 1: Access as Guest
Try accessing without any role:
```
http://localhost:3000/admin
```

### Step 2: Bypass Role Check
Try manipulating the role parameter:
```
http://localhost:3000/admin?role=admin
```

### Step 3: Case Manipulation
Try different cases:
```
http://localhost:3000/admin?role=Admin
http://localhost:3000/admin?role=ADMIN
```

### Step 4: Array-based Bypass
Try passing role as an array:
```
http://localhost:3000/admin?role[]=admin
```

## Expected Results
- Should be able to access admin panel by manipulating role parameter
- No proper server-side authentication

## Prevention
1. Implement proper authentication and authorization
2. Deny by default, allow by exception
3. Use server-side role validation
4. Implement proper session management

## Secure Code Example
```javascript
app.get('/admin', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  
  if (req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }
  
  res.render('admin-dashboard');
});
```

## Real-World Impact
This type of vulnerability has led to:
- Data breaches in major companies
- User data exposure
- Administrative function abuse
