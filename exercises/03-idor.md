# Insecure Direct Object References (IDOR) Exercise

## Objective
Learn how IDOR vulnerabilities allow attackers to access unauthorized resources by manipulating object references.

## What is IDOR?
Insecure Direct Object References occur when an application exposes internal implementation objects (like database keys) without proper access control checks.

## Vulnerable Code
```javascript
app.get('/profile', (req, res) => {
  const userId = req.query.id || 1;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  db.get(query, (err, row) => {
    if (row) {
      res.json(row);
    }
  });
});
```

## Exercise Instructions

### Step 1: Access Your Own Profile
Try accessing your own profile:
```
http://localhost:3000/profile?id=1
```

### Step 2: Access Other Users' Profiles
Try accessing other users' data:
```
http://localhost:3000/profile?id=2
http://localhost:3000/profile?id=3
```

### Step 3: enumerate All Users
Try to find all users:
```
http://localhost:3000/profile?id=4
http://localhost:3000/profile?id=5
```

## Expected Results
- You should be able to access all user profiles
- Email addresses and other sensitive data should be visible
- No access control is enforced

## Prevention
1. Use indirect reference maps
2. Implement proper access control checks
3. Verify user permissions before returning data
4. Use session-based access control

## Secure Code Example
```javascript
app.get('/profile', (req, res) => {
  const userId = req.query.id;
  const currentUserId = req.session.userId;
  
  if (userId !== currentUserId && !req.session.isAdmin) {
    return res.status(403).send('Access Denied');
  }
  
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [userId], (err, row) => {
    if (row) {
      res.json(row);
    } else {
      res.status(404).send('User not found');
    }
  });
});
```

## Real-World Example
This vulnerability is common in:
- E-commerce sites (accessing other users' orders)
- Social media (viewing private profiles)
- Banking apps (accessing account details)
