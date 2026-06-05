import { Request, Response } from "express";


//Get Profile
export const getProfile = (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
};