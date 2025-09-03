import { Request, Response } from "express";
import Order from "../models/Order";

// add new order to seller
export const addOrder = async (req: Request, res: Response) => {
    try {
        const { sellerId, orderNumber, amount } = req.body;

        const newOrder = new Order({ sellerId, orderNumber, amount });
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// GET oders for seller
export const getOrders = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        const orders = await Order.findOne({ sellerId });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};