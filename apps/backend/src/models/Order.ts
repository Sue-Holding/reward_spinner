import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    sellerId: string;
    orderNumber: string;
    amount: number;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    sellerId: { type: String, required: true },
    orderNumber: { tye: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;