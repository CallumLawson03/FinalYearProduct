const express = require('express');
const router = express.Router();
const db = require('./config/db');

// Login page route
app.get('/login', (req, res) => {
    res.render(path.join(__dirname, 'views', 'login.ejs'));
  });
  
  // Post route to handle user login
  app.post('/login', (req, res) => {
    const { username, email, password } = req.body;
  
    // Use placeholders to avoid SQL injection
    const query = `SELECT * FROM users WHERE username = ? AND email = ?`;
  
    db.query(query, [username, email], (err, results) => {
      if (err) {
        console.error(err);
        return res.render('login', { error: 'An error occurred. Please try again later.' });
      }
  
      if (results.length === 0 || results[0].password !== password) {
        return res.render('login', { error: 'Incorrect username or password!' });
      }
  
      // Successful login, redirect to home page
      res.redirect('/');
    });
  });
  
  
  // Signup page GET route
  app.get('/signup', (req, res) => {
    res.render(path.join(__dirname, 'views', 'signup.ejs'));
  });
  
  // POST route to handle user registration
  app.post('/signup', (req, res) => {
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

  module.exports = router;