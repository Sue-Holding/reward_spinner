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

app.post("/login", async (req, res) => {
    const { sellerId, password } = req.body;
    const seller = await Seller.findOne({ sellerId, password });

    if (!seller) {
        return res.status(401).json({ message: "Invalid credentials "});
    }

    res.json({
        message: "login successful",
        seller: {
            sellerId: seller.sellerId,
            name: seller.name,
            spins: seller.spins,
        },
    });
});

app.listen(3000, () => {
    console.log(`Server is runnng on port ${PORT}`);
});