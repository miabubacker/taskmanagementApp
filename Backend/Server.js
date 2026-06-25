require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const authMiddleware = require("./middleware/AuthMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);


app.get("/profile", authMiddleware, (req, res) => {
     console.log(req.user,'user')
  res.json({
    success: true,
    message: "Welcome to profile"
  });
});

app.get("/", (req, res) => {
    res.send("Server Running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});