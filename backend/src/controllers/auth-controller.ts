import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();

import User from "../models/user.js";
import CustomError from "../types/error-type.js";

const jwtSign = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    // const userAlreadyExist = await User.findOne({ where: { email } });
    // if (userAlreadyExist) {
    //   const errorMessage =
    //     userAlreadyExist.email === email
    //       ? "E-Mail already registered."
    //       : "Nickname already taken.";
    //   throw new CustomError(errorMessage, 401);
    // }
    const user = await User.create({ email, password: hashedPassword });
    const token = jwtSign(user.id);
    res.status(201).json({
      message: "Signed up.",
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new CustomError("E-Mail not registered yet.", 401);
    }
    const isEqual = await bcrypt.compare(password, user.password!);
    if (!isEqual) {
      throw new CustomError("Password is incorrect.", 401);
    }
    const token = jwtSign(user.id);
    res.status(200).json({
      jwt: token,
    });
  } catch (error) {
    next(error);
  }
};

interface UserPayload extends JwtPayload {
  userId: number;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const error = new CustomError("No token provided.", 401);
    next(error);
  }
  try {
    const decodedToken = jwt.verify(
      token!,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.userId = decodedToken.userId;
    console.log(decodedToken.userId);
  } catch (e) {
    const error = new CustomError("Authentication failed.", 401);
    next(error);
  }
  next();
};
