const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_Host,
    username: process.env.DB_Username,
    password: process.env.DB_Password,
    port: process.env.DB_Port,
    database: process.env.DB_Name,
    sslmod: process.env.DB_SSLMode,
})