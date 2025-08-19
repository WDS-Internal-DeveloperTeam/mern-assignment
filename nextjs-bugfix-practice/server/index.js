const express = require('express');
const cors = require('cors');
const { pool, initDB } = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// BUG: Issue2 - Something's wrong with the query result
app.get('/api/users', (req, res) => {
  const query = pool.query('SELECT * FROM users ORDER BY id DESC');
  res.json(query);
});

// BUG: Issue6 - Long-running operations can hang
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    // BUG: Issue3 - DB operation fails under certain conditions
    const result = await pool.query(
      'INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    // Missing proper error handling for unique constraint violation
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
