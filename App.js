// app.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const db = require('./config/db');  // Import the db connection
const app = express();

const generalRoutes = require('./routes/generalRoutes');
const authRoutes = require('./routes/authRoutes');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like images and css 
app.use(express.static('public'));

app.use('/', generalRoutes);
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
