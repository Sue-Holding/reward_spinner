import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import spinRoutes from "./routes/spinRoutes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/spins", spinRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is live!")
})

export default app;