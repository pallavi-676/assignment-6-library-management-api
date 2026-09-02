const { body, param, query } = require("express-validator");

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").optional().isIn(["student", "librarian"]).withMessage("Role must be student or librarian")
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

const bookValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("isbn").trim().notEmpty().withMessage("ISBN is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")
];

const idValidation = [
  param("id").trim().notEmpty().withMessage("ID is required")
];

const searchValidation = [
  query("q").optional().trim().notEmpty().withMessage("Search query cannot be empty")
];

module.exports = {
  registerValidation,
  loginValidation,
  bookValidation,
  idValidation,
  searchValidation
};