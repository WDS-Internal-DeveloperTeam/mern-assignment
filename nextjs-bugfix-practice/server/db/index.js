const { Pool } = require('pg');
require('dotenv').config();

// BUG: Issue7 - Resource usage grows over time
const MAX_CONNECTIONS = 100;

// BUG: Issue4 - Connection issues might occur in production
const pool = new Pool({
  connectionString: process.env.PGURL,
  ssl: false,
  password: 'admin',
  user: 'postgres'
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = {
  pool,
  initDB
};
