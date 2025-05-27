import express from "express";
import * as itemController from "../controllers/item.controller.js";

const router = express.Router();

// Get all items and search
router.get("/", itemController.getAllItems);
router.get("/search", itemController.searchItems);

// Get single item
router.get("/:id", itemController.getItemById);

// Create new item
router.post("/", itemController.createItem);

// Update item
router.put("/:id", itemController.updateItem);

// Delete item
router.delete("/:id", itemController.deleteItem);

export default router;
