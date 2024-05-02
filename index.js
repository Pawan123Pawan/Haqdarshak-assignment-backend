const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_create-user",
  password: "tQVJ94&8Qz6y?cb",
  database: "freedb_users-database",
});


db.connect((err) => {
  if (err) {
    console.error("Failed to reconnect to MySQL:", err);
    return;
  }
  console.log("Reconnected to MySQL.");
});

// CREATE
app.post("/user", (req, res) => {
  const {
    fullname,
    gender,
    language,
    age,
    dateOfBirth,
    district,
    state,
    pincode,
    loginWithWay,
    verificationType,
    phoneNumber,
  } = req.body;

  // Check if all required fields are present
  if (
    !fullname ||
    !gender ||
    !language ||
    !district ||
    !state ||
    !pincode ||
    !loginWithWay ||
    !verificationType ||
    !phoneNumber
  ) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

  const query =
    "INSERT INTO users (fullname, gender, language, age, date_of_birth, district, state, pincode, login_with_way, verification_type, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    fullname,
    gender,
    language,
    +age,
    dateOfBirth,
    district,
    state,
    +pincode,
    loginWithWay,
    verificationType,
    phoneNumber,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating user");
      return;
    }

    res
      .status(201)
      .send({ message: "User created successfully.", result: result });
  });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
