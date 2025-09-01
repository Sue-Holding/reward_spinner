import mongoose, { Mongoose } from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error("MONGO_URI is not defined in .env!");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected at ${connect.connection.host}`);
        console.log(`Using database: ${connect.connection.name}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`MongoDB connection error: ${err.message}`);
        } else {
            console.error("Unknown MongoDB connection error:", err);
        }
        process.exit(1);
    }
};

export default connectDB;