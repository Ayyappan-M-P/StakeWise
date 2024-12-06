// const express = require('express');
// const cors = require('cors'); // Import cors module
// const db = require('./db'); // Import the database connection file

// const app = express(); // Initialize the Express app

// // Middleware to parse JSON data
// app.use(express.json());

// // Middleware to enable CORS
// app.use(cors());

// // Register endpoint
// app.post('/api/register', (req, res) => {
//   const { email, name, phone, country, city, bankName, accountNo, ifscCode, password } = req.body;

//   const query = `
//     INSERT INTO users (email, name, phone, country, city, bankName, accountNo, ifscCode, password)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Execute the query
//   db.query(query, [email, name, phone, country, city, bankName, accountNo, ifscCode, password], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ message: 'Error registering user' });
//     } else {
//       res.status(200).json({ message: 'User registered successfully' });
//     }
//   });
// });

// // Test endpoint to check if backend is connected
// app.get('/api/test', (req, res) => {
//   res.status(200).json({ message: 'Backend is connected!' });
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const cors = require('cors'); // Import cors module
// const db = require('./db'); // Import the database connection file

// const app = express(); // Initialize the Express app

// // Middleware to parse JSON data
// app.use(express.json());

// // Middleware to enable CORS
// app.use(cors());

// // Register endpoint
// app.post('/api/register', (req, res) => {
//   const { email, name, phone, country, city, bankName, accountNo, ifscCode, password } = req.body;

//   const query = `
//     INSERT INTO users (email, name, phone, country, city, bankName, accountNo, ifscCode, password)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Execute the query
//   db.query(query, [email, name, phone, country, city, bankName, accountNo, ifscCode, password], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ message: 'Error registering user' });
//     } else {
//       res.status(200).json({ message: 'User registered successfully' });
//     }
//   });
// });

// // Login endpoint
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   // Check if user exists in the database
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ message: 'Error logging in' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = results[0];

//     // Compare provided password with the stored password in the database
//     if (password === user.password) {
//       return res.status(200).json({ message: 'Login successful', user: { email: user.email, name: user.name } });
//     } else {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//   });
// });

// //get user 
// app.get('/api/getUser', (req, res) => {
//   // Assuming you're using sessions or JWT for authentication
//   const user = req.session?.user || null; // Modify based on your auth mechanism
//   if (user) {
//     res.status(200).json({ user });
//   } else {
//     res.status(401).json({ message: "No user logged in" });
//   }
// });

// //logout

// app.post('/api/logout', (req, res) => {
//   // Clear session or token
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//       res.status(500).json({ message: "Error logging out" });
//     } else {
//       res.status(200).json({ message: "Logout successful" });
//     }
//   });
// });


// // Test endpoint to check if backend is connected
// app.get('/api/test', (req, res) => {
//   res.status(200).json({ message: 'Backend is connected!' });
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db'); // Import the database connection file

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies)
  })
);

// Middleware for session management
app.use(
  session({
    secret: 'your_secret_key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // Use secure: true in production with HTTPS
  })
);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, name, phone, country, city, bankName, accountNo, ifscCode, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Email, name, and password are required' });
  }

  try {
    const hashedPassword = password; // Use a hashing library like bcrypt for secure storage
    const query = `
      INSERT INTO users (email, name, phone, country, city, bankName, accountNo, ifscCode, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [email, name, phone, country, city, bankName, accountNo, ifscCode, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }

      res.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = results[0];

//     if (password === user.password) {
//       req.session.user = { id: user.id, email: user.email, name: user.name, avatar: user.avatar || '/default-avatar.png' };
//       return res.status(200).json({ message: 'Login successful', user: req.session.user });
//     } else {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//   });
// });

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT id, name, email, password FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    if (password === user.password) {
      req.session.user = { id: user.id, email: user.email, name: user.name, avatar: user.avatar || '/default-avatar.png' };
      return res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});


// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend is connected!' });
});





// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
