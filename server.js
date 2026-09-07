const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from root and public
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pally Engine is running!' });
});

// Fallback loader for index.html
app.get('*', (req, res) => {
  const publicIndex = path.join(__dirname, 'public', 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');

  if (fs.existsSync(publicIndex)) {
    res.sendFile(publicIndex);
  } else if (fs.existsSync(rootIndex)) {
    res.sendFile(rootIndex);
  } else {
    res.status(404).send('<h1>Frontend file index.html not found in root or public folder</h1>');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
