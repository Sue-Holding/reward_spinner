import app from "./app"
import connectDB from "./db";
import dotenv from "dotenv";
import express from "express";
import Seller from "./models/Seller";
import Order from "./models/Order";
import Spin from "./models/Spin";

dotenv.config();


const PORT = process.env.PORT || 3000;

connectDB();

app.listen(3000, () => {
    console.log(`Server is runnng on port ${PORT}`);
});