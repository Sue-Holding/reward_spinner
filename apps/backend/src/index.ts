import app from "./server"
import connectDB from "./db";
import dotenv from "dotenv";
import express from "express";

dotenv.config();


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(3000, () => {
        console.log(`Server is runnng on port ${PORT}`);
    });
});