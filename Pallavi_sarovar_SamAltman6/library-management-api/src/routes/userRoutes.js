const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validator = require("../middleware/validator");
const { idValidation } = require("../utils/validation");

router.use(auth, role("librarian"));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 */
router.get("/", controller.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 */
router.get("/:id", idValidation, validator, controller.getUser);

/**
 * @swagger
 * /api/users/{id}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 */
router.put("/:id/role", idValidation, validator, controller.updateRole);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security: [{bearerAuth: []}]
 */
router.delete("/:id", idValidation, validator, controller.deleteUser);

module.exports = router;