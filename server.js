const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const sessionMiddleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
sessionMiddleware(app);

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)');
  db.run('INSERT INTO users VALUES (1, "admin", "admin123", "admin@example.com")');
  db.run('INSERT INTO users VALUES (2, "user1", "password1", "user1@example.com")');
  db.run('INSERT INTO users VALUES (3, "user2", "password2", "user2@example.com")');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  db.get(query, (err, row) => {
    if (err) {
      res.send('Error: ' + err.message);
      return;
    }
    if (row) {
      res.send(`Welcome ${row.username}! Your email is: ${row.email}`);
    } else {
      res.send('Invalid credentials');
    }
  });
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/search-results', (req, res) => {
  const query = req.query.q || '';
  
  const sql = `SELECT * FROM products WHERE name LIKE '%${query}%' OR description LIKE '%${query}%'`;
  
  db.all(sql, (err, rows) => {
    if (err) {
      res.send('Error: ' + err.message);
      return;
    }
    res.json(rows);
  });
});

app.get('/profile', (req, res) => {
  const userId = req.query.id || 1;
  
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  db.get(query, (err, row) => {
    if (err) {
      res.send('Error: ' + err.message);
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.get('/xss', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`<h1>Hello ${name}</h1>`);
});

app.get('/admin', (req, res) => {
  const role = req.query.role || 'guest';
  
  if (role === 'admin') {
    res.send('<h1>Admin Dashboard</h1><p>Secret admin content here!</p>');
  } else {
    res.status(403).send('Access Denied');
  }
});

app.get('/file', (req, res) => {
  const filename = req.query.file || 'welcome.txt';
  
  const allowedFiles = ['welcome.txt', 'about.txt', 'contact.txt'];
  const filePath = path.join(__dirname, 'public', 'files', filename);
  
  if (allowedFiles.includes(filename)) {
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  } else {
    res.status(403).send('Access denied');
  }
});

app.post('/comment', (req, res) => {
  const { comment } = req.body;
  
  if (!req.session || !req.session.comments) {
    req.session = { comments: [] };
  }
  
  req.session.comments.push(comment);
  
  res.send(`Comment posted: ${comment}`);
});

app.get('/comments', (req, res) => {
  if (!req.session || !req.session.comments) {
    return res.json([]);
  }
  res.json(req.session.comments);
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, username: 'user' + userId, email: 'user' + userId + '@example.com' });
});

app.get('/debug', (req, res) => {
  res.json({
    env: process.env,
    nodeVersion: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Vulnerable App running on http://localhost:${PORT}`);
  console.log('Exercises available at http://localhost:' + PORT + '/exercises');
});
