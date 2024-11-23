const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json()); 
// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database connected to rough');
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connect();
  console.log(`Server running on http://localhost:${PORT}`);
});