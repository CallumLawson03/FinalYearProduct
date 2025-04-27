const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    port: process.env.DB_Port,
    database: process.env.DB_Name,
});

// Export the database connection object
module.exports = db;

