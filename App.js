// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, World! Your Express app is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});