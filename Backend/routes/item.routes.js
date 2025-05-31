import express from "express";
import * as itemController from "../controllers/item.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Get all items and search
router.get("/", itemController.getAllItems);
router.get("/search", itemController.searchItems);

// Get single item
router.get("/:id", itemController.getItemById);

// Create new item
router.post("/", authenticate, itemController.createItem);

// Update item
router.put("/:id", authenticate, itemController.updateItem);

// Delete item
router.delete("/:id", authenticate, itemController.deleteItem);

export default router;
