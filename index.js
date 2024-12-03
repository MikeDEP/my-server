const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!'); 
  });
  

// Database connection
const db = mysql.createPool({
  host: 'localhost',  
  user: 'mikedep510',       
  password: 'Duke1234',  
  database: 'gym_management', 
});

// HTTP GET endpoint
app.get('/data', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM users'); 
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// HTTP POST endpoint
app.post('/data', async (req, res) => {
  const { column1, column2 } = req.body; 
  try {
    const [result] = await db.query('INSERT INTO my_table (column1, column2) VALUES (?, ?)', [column1, column2]);
    res.json({ message: 'Data added successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// HTTP DELETE endpoint
app.delete('/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM users WHERE id = ?', [id]); // Replace 'my_table' with your table name
      res.json({ message: `Data with id ${id} deleted successfully` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

