import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

//Register Controller
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//Login Controller
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

