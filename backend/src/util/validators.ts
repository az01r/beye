import { body } from 'express-validator';

export const signupValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
];

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
];

export const saveConnnectionValidation = [
    body('host')
        .trim()
        .notEmpty()
        .withMessage('Host field is required.'),
    body('port')
        .trim()
        .notEmpty()
        .withMessage('Host field is required.'),
    body('db_name')
        .trim()
        .notEmpty()
        .withMessage('Host field is required.'),
    body('user')
        .trim()
        .notEmpty()
        .withMessage('Host field is required.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Host field is required.'),
];
