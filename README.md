# Vulnerability Testing Exercises

An educational web application designed to teach web security vulnerabilities through hands-on exercises.

## ⚠️ Important Notice

**This application contains deliberate security vulnerabilities for EDUCATIONAL PURPOSES ONLY.**

- Only run and test on your local machine
- Never use these techniques on websites without explicit written permission
- Unauthorized testing of websites is illegal and unethical

## Features

This application demonstrates the following vulnerabilities:

1. **SQL Injection** - Login bypass and data extraction
2. **Cross-Site Scripting (XSS)** - Script injection and execution
3. **Insecure Direct Object References (IDOR)** - Unauthorized data access
4. **Broken Access Control** - Privilege escalation
5. **Path Traversal** - File system access
6. **Information Disclosure** - Sensitive data exposure
7. **Insecure APIs** - Authentication and authorization bypass

## Installation

```bash
npm install
npm start
```

The application will be available at `http://localhost:3000`

## Exercises

Each vulnerability has a detailed exercise guide in the `exercises/` directory:

1. `01-sql-injection.md` - SQL Injection basics and exploitation
2. `02-xss.md` - Cross-Site Scripting techniques
3. `03-idor.md` - Insecure Direct Object References
4. `04-broken-access-control.md` - Access control bypass
5. `05-path-traversal.md` - Directory traversal attacks
6. `06-information-disclosure.md` - Information leakage
7. `07-insecure-apis.md` - API security vulnerabilities

## Application Structure

```
vuln-exercises/
├── server.js          # Main vulnerable server
├── middleware.js      # Session middleware
├── package.json       # Dependencies
├── public/            # Static files
│   ├── index.html     # Main page
│   ├── login.html     # Vulnerable login
│   ├── search.html    # Vulnerable search
│   └── files/         # Files for path traversal
└── exercises/         # Exercise guides
```

## Tools for Testing

- **Browser DevTools** (F12) - Inspect and modify requests
- **curl** - Command-line HTTP client
- **Burp Suite** - Web application security testing
- **OWASP ZAP** - Free security scanner
- **Postman** - API testing tool

## Learning Path

1. Start with SQL Injection (most common)
2. Learn XSS (client-side attacks)
3. Practice IDOR (logic flaws)
4. Explore access control issues
5. Try path traversal (system access)
6. Discover information disclosure
7. Test API security

## Prevention Best Practices

### SQL Injection
- Use parameterized queries
- Use ORM frameworks
- Validate and sanitize input

### XSS
- Encode output
- Use Content Security Policy
- Validate input

### IDOR
- Implement proper access controls
- Use indirect references
- Verify permissions

### Path Traversal
- Validate file paths
- Use whitelists
- Normalize paths

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackerOne Disclosure](https://www.hackerone.com/disclosure)

## License

MIT License - For educational purposes only.

## Disclaimer

This project is for educational purposes only. The author is not responsible for any misuse of this application or the information provided in the exercises.
