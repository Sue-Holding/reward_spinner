import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    seller?: { 
        sellerId: string; 
        name: string 
    };
}
export const authMiddleware = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided! "});
    }

    try {
        const decoded = jwt.verify(
                token, 
                process.env.JWT_SCRET || "secretkey"
            ) as { sellerId: string; name: string };

        req.seller = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};