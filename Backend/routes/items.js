const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items and search
router.get('/', itemController.getAllItems);
router.get('/search', itemController.searchItems);

// Get single item
router.get('/:id', itemController.getItemById);

// Create new item
router.post('/', itemController.createItem);

// Update item
router.put('/:id', itemController.updateItem);

// Delete item
router.delete('/:id', itemController.deleteItem);

module.exports = router;