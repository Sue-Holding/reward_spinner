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

        // get all spins for the sellers, newest first
        const spins = await Spin.find({ sellerId }).sort({ spunAt: -1 });

        // if no spin made yet
        if (!spins || spins.length === 0) {
            return res.json({
                message: "No spins found for this seller yet",
                spins: [],
                totalRewards: 0,
                totalSpins: 0,
                availableSpins: 0,        
            });
        }

        // rewards total
        const totalRewards = spins.reduce((sum, spin ) => sum + spin.reward, 0);
        const totalSpins = spins.length;

        // get the sellers avail spins
        const seller = await Seller.findOne({ sellerId });
        const availableSpins = seller?.spins ?? 0;

        res.json({
            spins,
            totalRewards,
            totalSpins,
            availableSpins,
        });
    } catch (err) {
        res.status(500)
        .json({ message: "server error", error: err});
    }
};
