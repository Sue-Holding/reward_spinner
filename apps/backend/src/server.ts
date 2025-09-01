import express, { Request, Response } from "express";
// import * as express from "express";
// import { Request, Response } from "express";


const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Server is live!")
})

export default app;