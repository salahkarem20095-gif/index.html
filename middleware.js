const express = require('express');
const session = require('express-session');

module.exports = function setupMiddleware(app) {
  app.use(session({
    secret: 'vulnerable-secret-key',
    resave: false,
    saveUninitialized: true
  }));
};
