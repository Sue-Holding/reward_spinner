import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import spinRoutes from "./routes/spinRoutes";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", //frontend server
    credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/spins", spinRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is live!")
})

export default app;