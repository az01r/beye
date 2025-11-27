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
        .withMessage('Host is required.'),
    body('port')
        .trim()
        .notEmpty()
        .withMessage('Port is required.'),
    body('db_name')
        .trim()
        .notEmpty()
        .withMessage('DB name is required.'),
    body('user')
        .trim()
        .notEmpty()
        .withMessage('User is required.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.'),
];

export const saveQueryValidation = [
    body('query')
        .trim()
        .notEmpty()
        .withMessage('Query is required.'),
    body('connectionId')
        .trim()
        .notEmpty()
        .withMessage('Db connection is required.'),
];

export const getQueriesByConnectionIdValidation = [
    body('connectionId')
        .trim()
        .notEmpty()
        .withMessage('Connection id is required.'),
];
