const Item = require("../models/itemModel");
const Shipment = require("../models/shipmentModel");
const asyncHandler = require("express-async-handler");
const cron = require("node-cron");

const getShipments = asyncHandler(async (req, res) => {
  const shipments = await Shipment.find({ user: req.user._id });
  res.json(shipments);
});

const createShipment = asyncHandler(async (req, res) => {
  const { carrier, expectedArrival, trackingNumber, itemsContained } = req.body;

  if (!carrier || !expectedArrival || !trackingNumber || !itemsContained) {
    res.status(400);
    throw new Error("Please fill out all the fields!");
  } else {
    const shipment = new Shipment({
      user: req.user._id,
      carrier,
      expectedArrival,
      trackingNumber,
      itemsContained,
    });
    const createdShipment = await shipment.save();
    // Populate the itemsContained field with the actual Item documents

    res.status(201).json(createdShipment);
  }
});

const getShipmentByID = asyncHandler(async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);

  if (shipment) {
    res.json(shipment);
  } else {
    res.status(404).json({ message: "Shipment not found!" });
  }
});

const updateShipment = asyncHandler(async (req, res) => {
  const { carrier, expectedArrival, trackingNumber, itemsContained } = req.body;
  const shipment = await Shipment.findById(req.params.id);

  if (shipment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }
  if (shipment) {
    if (req.body.carrier) {
      shipment.carrier = req.body.carrier;
    }
    if (req.body.expectedArrival) {
      shipment.expectedArrival = req.body.expectedArrival;
    }
    if (req.body.trackingNumber) {
      shipment.trackingNumber = req.body.trackingNumber;
    }
    if (req.body.itemsContained) {
      shipment.itemsContained = req.body.itemsContained;
    }

    const updatedShipment = await shipment.save();
    res.json(updatedShipment);
  } else {
    res.status(404);
    throw new Error("Shipment not found");
  }
});

const deleteShipment = asyncHandler(async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);

  if (!shipment) {
    res.status(404);
    throw new Error("Shipment not Found");
  }

  if (shipment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (shipment) {
    await shipment.deleteOne();
    res.json({ message: "Shipment Removed" });
  }
});

// Define a cron job that runs every day at midnight
const expireShipmentJob = cron.schedule("0 0 * * *", async () => {
  try {
    // Find all shipments that have an expected arrival date before the current date
    const expiredShipments = await Shipment.find({
      expectedArrival: { $lt: new Date() },
    });

    // Loop through the expired shipments and delete them
    for (const shipment of expiredShipments) {
      await shipment.deleteOne();
    }
    console.log(`Deleted ${expiredShipments.length} expired shipments`);
  } catch (err) {
    console.error("Failed to delete expired shipments:", err);
  }
});

const deleteExpiredShipments = async () => {
  const currentDate = new Date();
  await Shipment.deleteMany({ expectedArrival: { $lt: currentDate } });
};

module.exports = {
  getShipments,
  createShipment,
  getShipmentByID,
  updateShipment,
  deleteShipment,
  deleteExpiredShipments,
};
