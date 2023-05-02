const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  getShipmentByID,
} = require("../controllers/shipmentController");

const router = express.Router();

module.exports = router;

router.route("/").get(protect, getShipments);
router.route("/:id").get(protect, getShipmentByID);
router.route("/:id").put(protect, updateShipment);
router.route("/:id").delete(protect, deleteShipment);
router.route("/create").post(protect, createShipment);
