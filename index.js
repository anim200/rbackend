const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("./models/User");
const cors = require('cors');


dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json()); 
app.use(cors());
// Database connection
// Database connection
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDB database connected to rough');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);  // Exit the process if DB connection fails
    }
  };
  

app.post("/register", async (req, res) => {
    console.log("hello")
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create new user
      const user = new User({ name, email, password });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
app.get("/", (req, res) => {
    res.send("API is running!");
  });
  


const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connect(); // Ensure database connection is established
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

