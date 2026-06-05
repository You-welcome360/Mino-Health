import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import {
  findByUsername,
  createUser,
} from "../repositories/user.repository";

import { RegisterInput, LoginInput } from "../schemas/auth.schema";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

//Register
export const registerUser = async (
  data: RegisterInput
) => {
  const { username, password } = data;

  // 1. Check if user exists
  const existingUser =
    await findByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // 3. Create user object
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
  };

  // 4. Save user
  const createdUser = await createUser(
    newUser
  );

  // 5. Return safe user (NEVER return password)
  return {
    id: createdUser.id,
    username: createdUser.username,
  };
};


//Login
export const loginUser = async (
  data: LoginInput
) => {
  const { username, password } = data;

  // 1. Find user
  const user = await findByUsername(username);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate JWT
const token = jwt.sign(
  {
    userId: user.id,
    username: user.username,
  },
  env.JWT_SECRET,
  {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions
);

  // 4. Return token
  return { token };
};