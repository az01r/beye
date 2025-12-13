import type { Request, Response, NextFunction } from 'express';
import type CustomError from '../types/error-type.js';

export default (error: CustomError | any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    const message = error.message || 'An error occured';

    if (message instanceof Array) {
        message.forEach(msg =>  {
            console.log(`\x1b[31m\Error ${statusCode}: ${msg}\x1b[0m`);
        })
    }else {
        console.log(`\x1b[31m\Error ${statusCode}: ${message}\x1b[0m`);
    }
    
    res.status(statusCode).json({ message });
};
