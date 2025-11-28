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
    body('dbType')
        .trim()
        .notEmpty()
        .withMessage('DB type is required.'),
    body('host')
        .trim()
        .notEmpty()
        .withMessage('Host is required.'),
    body('port')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Port is required.'),
    body('dbName')
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
        .isNumeric()
        .withMessage('Db connection is required.'),
];

export const getQueriesByConnectionIdValidation = [
    body('connectionId')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Connection id is required.'),
];

export const saveScheduleValidation = [
    body('cron')
        .trim()
        .notEmpty()
        .withMessage('Cron expression is required.'),
    body('queryId')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Query id is required.'),
];
