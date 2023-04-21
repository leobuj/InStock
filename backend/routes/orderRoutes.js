const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getOrders,
  createOrder,
  getOrderByID,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(protect, getOrders);
router.route("/create").post(protect, createOrder);
router
  .route("/:id")
  .get(getOrderByID)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;