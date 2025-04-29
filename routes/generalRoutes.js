const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/db');

// Home page route
router.get('/', (req, res) => {
  res.render('index');
});

// Product page route
router.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';  // Fetch all products from DB

  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error fetching products');
      }

      // Render the products.ejs file and pass the results (products) to it
      res.render('products', { products: results });
  });
});


// Cart page route
router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;