const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Assuming you already have the DB connection
const checkAdmin = require('../middleware/checkAdmin');  // Middleware to check if the user is admin

// GET: Edit form for a specific product
router.get('/edit/:id', checkAdmin, (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.render('editProduct', { product: results[0], user: req.session.user });
  });
});

// POST: Handle edit submission for a product
router.post('/edit/:id', checkAdmin, (req, res) => {
  const { name, description, price } = req.body;
  const id = req.params.id;
  db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], (err) => {
    if (err) return res.status(500).send('Update error');
    res.redirect('/products');
  });
});

// POST: Delete a product
router.post('/delete/:id', checkAdmin, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Delete error');
    res.redirect('/products');
  });
});

module.exports = router;
