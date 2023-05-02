const mongoose = require("mongoose");
const itemSchema = require("./itemModel");

const orderSchema = mongoose.Schema(
  {
    status: {
        type: String,
        default: 'pending',
        required: true,
    },
    products: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        
    },
    address: {
        type: String,
        required: true
    },
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

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;