const express = require("express");
const router = express.Router();

// Route to handle user logout
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).json({ message: "Error logging out" });
      } else {
        res.status(200).json({ message: "Logout successful" });
      }
    });
  } else {
    res.status(400).json({ message: "No session found" });
  }
});

module.exports = router;
