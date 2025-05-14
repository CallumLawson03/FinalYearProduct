const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Assuming you already have the DB connection
const checkAdmin = require('../middleware/checkAdmin');  // Middleware to check if the user is admin
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'public', 'productimages'));
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
  
  const upload = multer({ storage });

// GET: Add new product 
router.get('/add', checkAdmin, (req, res) => {
    res.render('addProduct', { user: req.session.user });
  });
  
// POST: Add new product 
router.post('/add', checkAdmin, upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = '/productimages/' + req.file.filename;
  
    const query = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, imageUrl], (err) => {
      if (err) return res.status(500).send('Error saving product');
      res.redirect('/products');
    });
  });
  
// GET: Edit form for a specific product
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.render('editProduct', { product: results[0], user: req.session.user });
  });
});

// POST: Handle edit submission for a product
router.post('/edit/:id', (req, res) => {
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
  
    db.query('SELECT image_url FROM products WHERE id = ?', [id], (err, results) => {
      if (err || results.length === 0) return res.status(500).send('Error finding product image');
  
      const imagePath = path.join(__dirname, '..', 'public', results[0].image_url);
  
      fs.unlink(imagePath, (unlinkErr) => {
        db.query('DELETE FROM products WHERE id = ?', [id], (deleteErr) => {
          if (deleteErr) return res.status(500).send('Delete error');
          res.redirect('/products');
        });
      });
    });
  });

module.exports = router;
