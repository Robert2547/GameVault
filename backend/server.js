import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import connectDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes); // Handle signup, login, logout
app.use("/api/game", gameRoutes); // Handle IGDB API requests (Game Catalog API)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
