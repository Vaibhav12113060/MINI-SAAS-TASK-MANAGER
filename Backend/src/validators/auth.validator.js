const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.registerValidator = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validateRequest,
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest,
];
