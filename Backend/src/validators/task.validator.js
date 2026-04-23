const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.taskValidator = [
  body("title").notEmpty().withMessage("Title is required").trim().escape(),
  body("description").optional().trim().escape(),
  body("status")
    .optional()
    .isIn(["Pending", "Completed"])
    .withMessage("Status must be either Pending or Completed"),
  validateRequest,
];
