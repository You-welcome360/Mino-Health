import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (
  userId: string,
  username: string
) => {
  return jwt.sign(
    { userId, username },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};