import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

// Validation middleware
const registerValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName").optional().trim(),
  body("lastName").optional().trim(),
  body("phoneNumber").optional().trim(),
  body("address").optional().trim(),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const profileUpdateValidation = [
  body("firstName").optional().trim(),
  body("lastName").optional().trim(),
  body("phoneNumber").optional().trim(),
  body("address").optional().trim(),
];

// Auth routes
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.get("/profile", authenticate, getProfile);
router.put(
  "/profile",
  authenticate,
  profileUpdateValidation,
  validateRequest,
  updateProfile
);

router.get("/me", authenticate, getProfile);

export default router;
