const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Middleware to ensure the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // User is authenticated
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// Route to get the logged-in user's information
router.get('/getUser', isAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  const query = 'SELECT id, name, email, avatar FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

module.exports = router;
