import mongoose, { Schema, Document } from "mongoose";

export interface ISeller extends Document {
    sellerId: string;
    name: string;
    password: string;
    spins: number;
}

const SellerSchema: Schema = new Schema({
    sellerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    spins: { type: Number, default: 0 },
});

const Seller = mongoose.model<ISeller>("Seller", SellerSchema);

export default Seller;