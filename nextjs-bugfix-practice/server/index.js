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
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// BUG: Issue6 - Long-running operations can hang
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;

  // Optional: Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    // ✅ FIXED: Correct table name (assumed 'users')
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting user:', error);

    if (error.code === '23505') {
      // Unique constraint violation (e.g., duplicate email)
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
