const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", urlRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});