const express = require("express");
const router = express.Router();

const controller = require("../controllers/transactionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions (librarian only)
 *     tags: [Transactions]
 *     security: [{bearerAuth: []}]
 */
router.get("/", auth, role("librarian"), controller.getAll);

/**
 * @swagger
 * /api/transactions/my:
 *   get:
 *     summary: Get current user's transactions
 *     tags: [Transactions]
 *     security: [{bearerAuth: []}]
 */
router.get("/my", auth, controller.getMy);

module.exports = router;