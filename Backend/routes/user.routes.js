import express from "express";
import { body } from "express-validator";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Validation middleware
const createUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const updateUserValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please include a valid email"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Admin routes - protected and admin only
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createUserValidation,
  validateRequest,
  createUser
);
router.get("/", authenticate, authorize(["admin"]), getAllUsers);
router.get("/:id", authenticate, authorize(["admin"]), getUserById);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateUserValidation,
  validateRequest,
  updateUser
);
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

export default router;
