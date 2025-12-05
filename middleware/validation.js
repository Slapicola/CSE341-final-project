const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Product validation rules
const productValidation = [
  body('productName')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3 })
    .withMessage('Product name must be at least 3 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer')
];

// Category validation rules
const categoryValidation = [
  body('CategoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3 })
    .withMessage('Category name must be at least 3 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long')
];

// User validation rules
const userValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .isAlpha()
    .withMessage('First name must contain only letters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .isAlpha()
    .withMessage('Last name must contain only letters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
];

// Order validation rules
const orderValidation = [
  body('user')
    .notEmpty()
    .withMessage('User is required'),
  body('products')
    .notEmpty()
    .withMessage('Products are required')
    .isArray()
    .withMessage('Products must be an array'),
  body('totalProductAmount')
    .notEmpty()
    .withMessage('Total product amount is required')
    .isInt({ min: 1 })
    .withMessage('Total product amount must be at least 1'),
  body('totalPrice')
    .notEmpty()
    .withMessage('Total price is required')
    .isNumeric()
    .withMessage('Total price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number')
];

module.exports = {
  validate,
  productValidation,
  categoryValidation,
  userValidation,
  orderValidation
};