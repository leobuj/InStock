const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user._id });
  res.json(items);
});

const createItem = asyncHandler(async (req, res) => {
  const { name, quantity, description } = req.body;

  if (!name || !quantity) {
    res.status(400);
    throw new Error("Please fill out all fields");
  } else {
    const item = new Item({ user: req.user._id, name, quantity, description });
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  }
});

const getItemByID = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "item not found" });
  }

  res.json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const { name, quantity, description } = req.body;
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }
  if (item) {
    item.name = name;
    item.quantity = quantity;
    item.description = description;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Item not Found");
  }

  if (item.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (item) {
    await item.deleteOne();
    res.json({ message: "Item Removed" });
  }
});

module.exports = { getItems, createItem, getItemByID, updateItem, deleteItem };
