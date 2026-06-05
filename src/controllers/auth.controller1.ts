import { Request, Response } from "express";
import { users } from "../data/user";

import {
  hashPassword,
  comparePassword,
} from "../utils/bcrypt";

import { generateToken } from "../utils/jwt";

import crypto from "crypto";

export const register = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;

  const existingUser = users.find(
    (u) => u.username === username
  );
  // console.log(req.body);
  
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User exists" });
  }

  const hashedPassword =
    await hashPassword(password);

  users.push({
    id: crypto.randomUUID(),
    username,
    password: hashedPassword,
  });
  // console.log(users);
  

  return res.status(201).json({
    message: "User registered",
    users
  });
};

export const login = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;
  // console.log(req.body);
  
  const user = users.find(
    (u) => u.username === username
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }

  const token = generateToken(
    user.id,
    user.username
  );

  return res.json({ token });
};