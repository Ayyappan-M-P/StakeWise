const express = require('express');
const db = require('./db'); // Import the database connection file

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Register endpoint
app.post('/api/register', (req, res) => {
  const { email, name, phone, country, city, bankName, accountNo, ifscCode, password } = req.body;

  const query = `
    INSERT INTO users (email, name, phone, country, city, bankName, accountNo, ifscCode, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  db.query(query, [email, name, phone, country, city, bankName, accountNo, ifscCode, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Error registering user' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
