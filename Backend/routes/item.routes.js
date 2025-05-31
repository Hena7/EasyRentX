import express from "express";
import { z } from "zod";
import * as itemController from "../controllers/item.controller.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// Validation schemas
const createItemSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    price: z.number().positive(),
    category: z.string(),
    condition: z.enum(["new", "like-new", "good", "fair", "poor"]),
    images: z.array(z.string().url()).optional(),
    location: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
    }),
  }),
});

const updateItemSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(),
    condition: z.enum(["new", "like-new", "good", "fair", "poor"]).optional(),
    images: z.array(z.string().url()).optional(),
    location: z
      .object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      })
      .optional(),
  }),
});

const searchItemsSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    condition: z.enum(["new", "like-new", "good", "fair", "poor"]).optional(),
    location: z.string().optional(),
  }),
});

// Get all items and search
router.get("/", itemController.getAllItems);
router.get("/search", validate(searchItemsSchema), itemController.searchItems);

// Get single item
router.get("/:id", itemController.getItemById);

// Create new item
router.post(
  "/",
  authenticate,
  validate(createItemSchema),
  itemController.createItem
);

// Update item
router.put(
  "/:id",
  authenticate,
  validate(updateItemSchema),
  itemController.updateItem
);

// Delete item
router.delete("/:id", authenticate, itemController.deleteItem);

export default router;
