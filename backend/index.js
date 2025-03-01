// Packages 
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./conf/db.js";
// Configurations
dotenv.config(); 
const port = process.env.PORT || 5000;
connectDB();
const app = express();
// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`); 
});
app.get("/", (req, res) => {
    res.send("Hello world 🌍");
});