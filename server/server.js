const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware MUST come first
app.use(
  cors({
    origin: [
      "https://mern-shopping-app-eta.vercel.app/",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// Route imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Routes (after middleware)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed:", err.message);
  });
