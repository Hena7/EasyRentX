import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import itemRoutes from "./item.routes.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

export default router;
