// Express backend for blog app (intentionally buggy)
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'password',
  port: 5432,
});

// Bug: No await on async DB call, race condition possible
app.get('/posts', (req, res) => {
  pool.query('SELECT * FROM posts', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'DB error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Bug: No input validation, possible SQL injection
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  pool.query(`INSERT INTO posts (title, content) VALUES ('${title}', '${content}') RETURNING *`, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'DB error' });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// Bug: Incorrect error handling, always returns 200
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM posts WHERE id = $1', [id], (err, result) => {
    res.json({ success: true });
  });
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
