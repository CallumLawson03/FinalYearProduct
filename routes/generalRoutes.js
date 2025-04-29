const express = require('express');
const router = express.Router();
const path = require('path');

// Home page route
router.get('/', (req, res) => {
  res.render('index');
});

// Product page route
router.get('/products', (req, res) => {
  res.render('products');
});

// Cart page route
router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;