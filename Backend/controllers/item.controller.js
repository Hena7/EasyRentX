import itemService from "../services/item.service.js";
import { AppError } from "../utils/AppError.js";
// Get all items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// Get single item by ID
export const getItemById = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// Create new item
export const createItem = async (req, res, next) => {
  try {
    const item = await itemService.createItem(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// Update item
export const updateItem = async (req, res, next) => {
  try {
    const item = await itemService.updateItem(
      req.params.id,
      req.body,
      req.user._id
    );
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
export const deleteItem = async (req, res, next) => {
  try {
    const result = await itemService.deleteItem(req.params.id, req.user._id);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Search items
export const searchItems = async (req, res, next) => {
  try {
    const items = await itemService.searchItems(req.query);
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};
