const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const MONGO_URI = process.env.MONGO_URI;

var app = express();

// Enable CORS
app.use(cors());
app.options("*", cors());

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => console.log(error));
database.once("connected", () => console.log("Database Connected"));

// Routes
const authRoutes = require("./routes/auths");
const taskRoutes = require("./routes/tasks");
const profileRoutes = require("./routes/profiles");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
