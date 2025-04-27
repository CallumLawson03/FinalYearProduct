// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const db = require('./config/db');  // Import the db connection
const app = express();


// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like images and css 
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

// Product page route
app.get('/products', (req, res) => {
  res.render(path.join(__dirname, 'views', 'products.ejs'));
});

// Login page route
app.get('/login', (req, res) => {
  res.render(path.join(__dirname, 'views', 'login.ejs'));
});

// Post route to handle user login
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ? AND email = ?`;

  db.query(query, [username, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.render('login', { error: 'An error occurred. Please try again later.' });
    }

    if (results.length === 0) {
      // No user found with this username and email
      return res.render('login', { error: 'User not found!' });
    }

    const user = results[0];

    if (user.password === password) {
      // Successful login
      res.redirect('/');
    } else {
      // Incorrect password
      res.render('login', { error: 'Incorrect password!' });
    }
  });
});

// Cart page route
app.get('/cart', (req, res) => {
  res.render(path.join(__dirname, 'views', 'cart.ejs'));
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
