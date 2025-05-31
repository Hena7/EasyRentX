import express from "express";
import { z } from "zod";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Validation schemas
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

// Admin routes - protected and admin only
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validate(createUserSchema),
  createUser
);

router.get("/", authenticate, authorize(["admin"]), getAllUsers);
router.get("/:id", authenticate, authorize(["admin"]), getUserById);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validate(updateUserSchema),
  updateUser
);
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

export default router;
