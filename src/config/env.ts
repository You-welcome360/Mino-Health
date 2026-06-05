import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

export const env = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET, // now guaranteed string
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
};