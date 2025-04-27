// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like images and css 
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

// Product page route
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.ejs'));
});

// Login page route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.ejs'));
});

// Cart page route
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.ejs'));
});

// Signup page route
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.ejs'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
