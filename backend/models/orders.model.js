import mongoose from "mongoose";
import User from "./user.model.js";
import Item from "./item.model.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  pendingBuy: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        required: true,
      },
      otp: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  pendingSell: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        required: true,
      },
      buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  itemsBought: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        required: true,
      },
      seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  itemsSold: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        required: true,
      },
      buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
});

const Order = mongoose.model("order", orderSchema);

export default Order;
