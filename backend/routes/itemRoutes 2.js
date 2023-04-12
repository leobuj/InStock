const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getItems,
  createItem,
  getItemByID,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const router = express.Router();

router.route("/").get(protect, getItems);
router.route("/create").post(protect, createItem);
router
  .route("/:id")
  .get(getItemByID)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
