import Item from "../models/item.model.js";
import { AppError } from "../utils/appError.js";

// Get all items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find().populate("owner", "name email");
    res.status(200).json({
      success: true,
      data: {
        items: items.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          images: item.images,
          location: item.location,
          owner: {
            id: item.owner._id,
            name: item.owner.name,
            email: item.owner.email,
          },
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single item by ID
export const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!item) {
      return next(new AppError("Item not found", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        item: {
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          images: item.images,
          location: item.location,
          owner: {
            id: item.owner._id,
            name: item.owner.name,
            email: item.owner.email,
          },
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create new item
export const createItem = async (req, res, next) => {
  try {
    const item = await Item.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: {
        item: {
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          images: item.images,
          location: item.location,
          owner: item.owner,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update item
export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return next(new AppError("Item not found", 404));
    }

    // Check if user is the owner
    if (item.owner.toString() !== req.user.id.toString()) {
      return next(new AppError("Not authorized to update this item", 403));
    }

    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("owner", "name email");

    if (!updatedItem) {
      return next(new AppError("Item not found", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        item: {
          id: updatedItem._id,
          title: updatedItem.title,
          description: updatedItem.description,
          price: updatedItem.price,
          category: updatedItem.category,
          condition: updatedItem.condition,
          images: updatedItem.images,
          location: updatedItem.location,
          owner: {
            id: updatedItem.owner._id,
            name: updatedItem.owner.name,
            email: updatedItem.owner.email,
          },
          createdAt: updatedItem.createdAt,
          updatedAt: updatedItem.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return next(new AppError("Item not found", 404));
    }

    // Check if user is the owner
    if (item.owner.toString() !== req.user.id.toString()) {
      return next(new AppError("Not authorized to delete this item", 403));
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Search items
export const searchItems = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice, condition, location } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (condition) {
      query.condition = condition;
    }

    if (location) {
      query["location.city"] = { $regex: location, $options: "i" };
    }

    const items = await Item.find(query).populate("owner", "name email");

    res.status(200).json({
      success: true,
      data: {
        items: items.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          condition: item.condition,
          images: item.images,
          location: item.location,
          owner: {
            id: item.owner._id,
            name: item.owner.name,
            email: item.owner.email,
          },
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
