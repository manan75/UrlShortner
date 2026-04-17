const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const urlRoutes = require("./routes/urlRoutes");
const {connectRedis} = require("./db/redis")
require("dotenv").config();

const app = express();

// Connect DB
connectDB();

// Connect Redis
connectRedis();


// Middleware
app.use(cors());
app.use(express.json());

//Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


// Routes
app.use("/", urlRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});