import { Request, Response } from "express";
import Order from "../models/Order";
import Seller from "../models/Seller";

// add new order to seller
export const addOrder = async (req: Request, res: Response) => {
    try {
        const { sellerId, orderNumber, amount } = req.body;

        // check if i have a seller in db - recheck this
        // const seller = await Seller.findOne({ sellerId });
        // if (!seller) {
        //     return res.status(404).json({ message: "Seller not found "});
        // }

        // to save an order
        const order = new Order({ sellerId, orderNumber, amount });
        await order.save();

        await Seller.updateOne({ sellerId }, { $inc: { spins: 1 } });

        const seller = await Seller.findOne({ sellerId });

        res.status(201).json({ 
             message: "Order added", 
             order, 
             availableSpins: seller?.spins ?? 0, 
         });
        // add spins valid on the new order
        // seller.spins += 1;
        // await seller.save();

        // res.status(201).json({ 
        //     message: "Order added", 
        //     order, 
        //     spins: seller.spins 
        // });

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