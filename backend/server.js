const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./utils/database");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email); // Debug log

    // Handle test credentials
    if (email === "test@example.com" && password === "Test123!") {
      const token = jwt.sign(
        { id: "test-user", email, role: "patient" },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign({ id: "test-user" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        user: {
          id: "test-user",
          email,
          role: "patient",
        },
        token,
        refreshToken,
      });
    }

    // Regular database authentication
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log("Found users:", users.length); // Debug log

    if (users.length === 0) {
      console.log("No user found with email:", email); // Debug log
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    console.log("Password validation:", validPassword); // Debug log

    if (!validPassword) {
      console.log("Invalid password for user:", email); // Debug log
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error); // Debug log
    res.status(500).json({
      message: "Login failed. Please try again.",
      error: error.message,
    });
  }
});

// Protected routes
app.get("/api/patients", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM patients");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/patients/:id", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM patients WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Patient not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/patients", authenticateToken, async (req, res) => {
  try {
    const { name, age, condition } = req.body;
    const [result] = await pool.query(
      "INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)",
      [name, age, condition]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/patients/:id", authenticateToken, async (req, res) => {
  try {
    const { name, age, condition } = req.body;
    await pool.query(
      "UPDATE patients SET name = ?, age = ?, condition = ? WHERE id = ?",
      [name, age, condition, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/patients/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM patients WHERE id = ?", [req.params.id]);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected routes for doctors (admin capabilities)
app.get("/api/doctors", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM doctors");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Test database connection on server start
  try {
    await pool.query("SELECT 1");
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✓ Database connection verified on server start"
    );
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "✗ Could not verify database connection"
    );
    console.error(error);
  }
});
