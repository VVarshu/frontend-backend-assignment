const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER
 */
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT id FROM users WHERE email = ?";

  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.error("DB error (check user):", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ message: "Password hashing failed" });
      }

      const insertUserQuery =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(
        insertUserQuery,
        [name, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("DB error (insert user):", err);
            return res
              .status(500)
              .json({ message: "User registration failed" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  });
};

/**
 * LOGIN USER
 */
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const findUserQuery = "SELECT * FROM users WHERE email = ?";

  db.query(findUserQuery, [email], (err, result) => {
    if (err) {
      console.error("DB error (login):", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt compare error:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT
      const jwt = require("jsonwebtoken");

      const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
    );


      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  });
};
