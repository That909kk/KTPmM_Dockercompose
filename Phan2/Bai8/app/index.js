const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

app.get('/', async (req, res) => {
  try {
    // Create connection to MySQL
    const connection = await mysql.createConnection(dbConfig);
    
    // Test the connection
    const [rows] = await connection.execute('SELECT 1 as value');
    
    await connection.end();
    
    res.send('Connected to MySQL! Result: ' + JSON.stringify(rows));
  } catch (error) {
    res.status(500).send('Error connecting to MySQL: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});