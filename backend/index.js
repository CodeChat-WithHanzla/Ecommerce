// Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./conf/db.js";
import cors from "cors";
// Routes imports

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import connectCloudinary from "./conf/cloudinary.js";
// Configurations

dotenv.config();
await connectDB();
await connectCloudinary();
const port = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};
app.use(cors(corsOptions));
// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Checking if the server is running
app.get("/", (req, res) => {
  res.send("Hello world 🌍");
});

// Routes for users
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// App listening at specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});
