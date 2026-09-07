const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pally Engine is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

