const express = require('express');
const router = express.Router();
const path = require('path');

// Home page route
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

// Product page route
app.get('/products', (req, res) => {
  res.render(path.join(__dirname, 'views', 'products.ejs'));
});

// Cart page route
app.get('/cart', (req, res) => {
  res.render(path.join(__dirname, 'views', 'cart.ejs'));
});

module.exports = router;