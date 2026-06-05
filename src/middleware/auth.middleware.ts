import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  // 1. Check header exists
  if (!authHeader?.startsWith("Bearer ")) {
  return res.status(401).json({
    message: "Invalid authorization format",
  });
}
  // 2. Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token format",
    });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      username: string;
    };

    // 4. Attach user to request
    req.user = decoded;

    // 5. Continue
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};