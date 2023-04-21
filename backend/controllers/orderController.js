const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
  const { status, products, address } = req.body;

  if (!products ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  } else {
    const order = new Order({ user: req.user._id, status, products, address  });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

const updateOrder = asyncHandler(async (req, res) => {
  const { status, products } = req.body;
  const order = await Order.findById(req.params.id);

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }
  if (order) {
    order.status = status;
    order.products = products;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Item not Found");
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (order) {
    await order.deleteOne();
    res.json({ message: "Order Removed" });
  }
});

module.exports = { getOrders, createOrder, getOrderByID, updateOrder, deleteOrder };