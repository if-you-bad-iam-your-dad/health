const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config.js');

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test and log database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('\x1b[32m%s\x1b[0m', '✓ Database connected successfully!');
    console.log('Connected to database:', dbConfig.database);
    console.log('Host:', dbConfig.host);
    console.log('User:', dbConfig.user);
    connection.release();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '✗ Database connection failed!');
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testConnection();

module.exports = pool;
