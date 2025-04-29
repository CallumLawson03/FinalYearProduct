const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Login page route
router.get('/login', (req, res) => {
  res.render('login');
  });
  
  // Post route to handle user login
  router.post('/login', (req, res) => {
    const { username, email, password } = req.body;
  
    const query = `SELECT * FROM users WHERE username = '${username}' AND email = '${email}'`;
  
    db.query(query, [username, email], (err, results) => {
      if (err) {
        console.error(err);
        return res.render('login', { error: 'An error occurred. Please try again later.' });
      }
  
      if (results.length === 0) {
        return res.render('login', { error: 'Incorrect username or password!' });
      }
      
      // Save user info to session
    req.session.user = {
    id: results[0].id,
    username: results[0].username,
    role: results[0].role
  };
      
      // Successful login, redirect to home page
      res.redirect('/');
    });
  });
  
  
  // Signup page GET route
  router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  // POST route to handle user registration
  router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
  
    // Insert user into the database
    const query = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'customer')`;
  
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
          console.error('Error inserting user:', err);
          res.status(500).send('Error while registering user');
          return;
        }

      console.log('User registered:', result);
      res.send('User registered successfully!');
    });
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).send('Could not log out.');
      }
      res.redirect('/');
    });
  });

  module.exports = router;