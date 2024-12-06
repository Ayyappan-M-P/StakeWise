app.post('/api/login', (req, res) => {

  const SECRET_KEY = "secret";
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Query to find user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare the provided password with the stored password
      if (password === user.password) {
        // Log the successful login in the login table
        const loginQuery = 'INSERT INTO login (user_id) VALUES (?)';
        db.query(loginQuery, [user.id], (loginErr) => {
          if (loginErr) {
            console.error('Error logging login:', loginErr);
            return res.status(500).json({ message: 'Server error' });
          }

          const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
          });
    
          // Respond with token
          return res.status(200).json({ token, user: { email: user.email, name: user.name } });

        });
      } else {
        // Password doesn't match
        res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
