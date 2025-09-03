import { Request, Response } from "express";
import Seller from "../models/Seller";
import Order from "../models/Order";
import Spin from "../models/Spin";

// reward from a spin
export const spinReward = async (req: Request, res: Response) => {
    try {
        const { sellerId, orderNumber } = req.body;

        const order = await Order.findOne({ sellerId, orderNumber });
        if (!order) {
            return res.status(400).json({ message: "invalid order!" });
        }

    // Fake reward logic
    const reward = Math.floor(Math.random() * 100) + 1;

    const spin = new Spin({ sellerId, orderNumber, reward });
    await spin.save();

    // Increase seller spins count
    await Seller.updateOne({ sellerId }, { $inc: { spins: 1 } });

    res.status(201).json({ message: "Spin complete", reward });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// get spin history
export const getSpins = async (req: Request, res: Response) => {
    try {
        const {sellerId } = req.params;
        const spins = await Spin.findOne({ sellerId });

        res.json(spins);
    } catch (err) {
        res.status(500).json({ message: "server error", error: err});
    }
};
