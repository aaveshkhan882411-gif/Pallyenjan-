const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pally Engine is running!' });
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('<h1>Pally Web App Backend is Live</h1><p>Frontend file structure mismatch. Please check repository folder name.</p>');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
