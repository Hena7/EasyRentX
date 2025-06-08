import Item from "../models/item.model.js";
import { AppError } from "../utils/AppError.js";

// Get all items
const getAllItems = async () => {
  try {
    const items = await Item.find()
      .sort({ createdAt: -1 })
      .populate("owner", "username email");
    return items;
  } catch (error) {
    throw new AppError("Error fetching items", 500);
  }
};

// Get single item by ID
const getItemById = async (id) => {
  try {
    const item = await Item.findById(id).populate(
      "owner",
      "username email phoneNumber"
    );

    if (!item) {
      throw new AppError("Item not found", 404);
    }

    return item;
  } catch (error) {
    throw new AppError("Error fetching item", 500);
  }
};

// Create new item
const createItem = async (itemData, userId) => {
  try {
    if (!userId) {
      throw new AppError("Authentication required", 401);
    }

    const newItem = new Item({
      ...itemData,
      owner: userId,
    });

    const savedItem = await newItem.save();
    return savedItem;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Update item
const updateItem = async (id, updateData, userId) => {
  try {
    const item = await Item.findById(id);

    if (!item) {
      throw new AppError("Item not found", 404);
    }

    // Check if user is the owner
    if (item.owner.toString() !== userId) {
      throw new AppError("Not authorized to update this item", 403);
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return updatedItem;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Delete item
const deleteItem = async (id, userId) => {
  try {
    const item = await Item.findById(id);

    if (!item) {
      throw new AppError("Item not found", 404);
    }

    // Check if user is the owner
    if (item.owner.toString() !== userId) {
      throw new AppError("Not authorized to delete this item", 403);
    }

    await item.deleteOne();
    return { message: "Item deleted successfully" };
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

// Search items
const searchItems = async (filters) => {
  try {
    const { query, location, category, minPrice, maxPrice } = filters;
    const filter = {};

    if (query) {
      filter.name = { $regex: query, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .populate("owner", "username email");

    return items;
  } catch (error) {
    throw new AppError("Error searching items", 500);
  }
};

const itemService = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
};

export default itemService;
