import mongoose, { Schema, Document } from "mongoose";

export interface ISpin extends Document {
    sellerId: string;
    orderNumber: string;
    reward: number;
    spunAt: Date;
}

const SpinSchema: Schema = new Schema({
    sellerId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    reward: { type: Number, required: true },
    spunAt: { type: Date, default: Date.now },
});

const Spin = mongoose.model<ISpin>("Spin", SpinSchema);

export default Spin;