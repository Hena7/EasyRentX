const Item = require('../models/Item');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .sort({ createdAt: -1 })
      .populate('owner', 'username email');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'username email phoneNumber');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      owner: req.user.id // Will be set by auth middleware
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.remove();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

// Search items
exports.searchItems = async (req, res) => {
  try {
    const { query, location, category, minPrice, maxPrice } = req.query;
    
    const filter = {};
    
    if (query) {
      filter.name = { $regex: query, $options: 'i' };
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
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
      .populate('owner', 'username email');

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error searching items', error: error.message });
  }
};