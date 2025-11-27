import { type Request, type Response, type NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../types/error-type.js';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new CustomError(errors.array().map((error) => error.msg), 422);
        next(error);
    }
    next();
};