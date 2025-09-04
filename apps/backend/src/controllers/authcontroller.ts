import { Request, Response } from "express";
import Seller from "../models/Seller";
import jwt from "jsonwebtoken";

// to log in
export const login = async (req: Request, res: Response) => {
  try {
    const { sellerId, password } = req.body;
    const seller = await Seller.findOne({ sellerId });

    if (!seller || seller.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create jwt token
    const token = jwt.sign(
      { sellerId: seller.sellerId, name: seller.name },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ 
      message: "Login successful", 
      sellerId: seller.sellerId,
      name: seller.name, 
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// log out
export const logout = (req: Request, res: Response) => {
    res.json({ message: "Logged out successfully" });
};