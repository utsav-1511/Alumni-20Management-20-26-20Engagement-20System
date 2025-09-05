import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const requireAuth: RequestHandler = (req: any, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Missing auth" });
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid auth format" });
    const token = parts[1];
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
