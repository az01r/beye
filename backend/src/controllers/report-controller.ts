import type { Request, Response, NextFunction } from "express";

import Report from "../models/report.js";
import path from "path";
import CustomError from "../types/error-type.js";

export const readReports = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  try {
    const reports = await Report.findAll({
      where: {
        userId,
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).json({ reports });
  } catch (error) {
    next(error);
  }
};

export const getReport = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as number;
  const fileName = req.body.fileName as string;
  try {
    const filePath = path.join(process.cwd(), 'data', userId.toString(), fileName);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        throw new CustomError("File download failed.", 500);
      }
    });
  } catch (error) {
    next(error);
  }
};
