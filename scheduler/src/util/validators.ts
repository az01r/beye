import { body } from 'express-validator';

export const getReportValidation = [
    body('fileName')
        .trim()
        .notEmpty()
        .withMessage('File name is required.'),
];