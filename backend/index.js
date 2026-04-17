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

//Health check endpoint
app.get('/health', async (req, res) => {
  const status = {
    server: "OK",
    mongodb: "DOWN",
    redis: "DOWN"
  };

  try {
    await mongoose.connection.db.admin().ping();
    status.mongodb = "OK";
  } catch (e) {}

  try {
    await redisClient.ping();
    status.redis = "OK";
  } catch (e) {}

  const isHealthy = status.mongodb === "OK" && status.redis === "OK";

  res.status(isHealthy ? 200 : 500).json(status);
});

// Routes
app.use("/", urlRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});