const mongoose = require("mongoose");
const Item = require("../models/itemModel");

const shipmentSchema = mongoose.Schema(
  {
    carrier: {
      type: String,
      required: true,
    },
    expectedArrival: {
      type: Date,
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    itemsContained: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;
