import mongoose from "mongoose";
import User from "./user.model.js";
import Item from "./item.model.js";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
