import { Request, Response } from "express";
import Seller from "../models/Seller";
import Order from "../models/Order";
import Spin from "../models/Spin";

// reward from a spin
export const spinReward = async (req: Request, res: Response) => {
    try {
        const { sellerId, orderNumber } = req.body;

        // validate the seller
        const seller = await Seller.findOne({ sellerId });
        if (!seller || seller.spins <=0 ) {
            return res.
            status(400).json({ message: "No spins left!" });
        }

        // check if an order exists
        const order = await Order.findOne({ sellerId, orderNumber });
        if (!order) {
            return res.
            status(400).json({ message: "invalid order!" });
        }
        
        // now to check if that order already has a spin on it
        const existingSpin = await Spin.findOne({ sellerId, orderNumber });
        if (existingSpin) {
            return res
            .status(400)
            .json({ message: "This order has already been used for a spin! Sorry!" });
        }
        
        // Fake reward logic
        const reward = Math.floor(Math.random() * 100) + 1;

        // to save the spin results
        const spin = new Spin({ sellerId, orderNumber, reward });
        await spin.save();

        // to descrease seller spins count
        seller.spins -=1;
        await seller.save();

        res.status(201).json({ 
            message: "Spin complete", 
            reward,
            // spinLeft: seller.spins
            availableSpins: seller.spins
        });
    } catch (err) {
        res.status(500)
        .json({ message: "Server error", error: err });
    }
};

// get spin history
export const getSpins = async (req: Request, res: Response) => {
    try {
        const {sellerId } = req.params;
        const spins = await Spin.findOne({ sellerId }).sort({ spunAt: -1 });

        res.json(spins);
    } catch (err) {
        res.status(500)
        .json({ message: "server error", error: err});
    }
};
