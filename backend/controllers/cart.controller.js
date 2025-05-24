import Item from "../models/item.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/orders.model.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate("items.item")
      .exec();
    if (!cart) {
      return res.status(200).json({ success: true, items: [] });
    }
    const items = cart.items.map((item) => item.item);
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error while fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addItemToCart = async (req, res) => {
  const { id } = req.body;

  try {
    const item = await Item.findById(id).exec();
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    if (item.seller_id.toString() === req.user.id)
      return res
        .status(400)
        .json({
          success: false,
          message: "You cannot add your own items to cart",
        });

    const cart = await Cart.findOne({ user: req.user.id }).exec();
    if (!cart) {
      const newCart = new Cart({
        user: req.user.id,
        items: [{ item: id }],
      });
      await newCart.save();
    } else if (!cart.items) {
      cart.items = [{ item: id }];
      await cart.save();
    } else {
      if (cart.items.find((item) => item.item == id))
        return res
          .status(400)
          .json({ success: false, message: "Item already in cart" });

      const prevOrder = await Order.findOne({ user: req.user.id }).exec();
      if (prevOrder) {
        if (prevOrder.pendingBuy) {
          if (prevOrder.pendingBuy.find((item) => item.item == id))
            return res
              .status(400)
              .json({
                success: false,
                message: "Item already in pending orders",
              });
        }
      }

      cart.items.push({ item: id });
      await cart.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error while adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { id } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id }).exec();
    cart.items = cart.items.filter((item) => item.item != id);
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error while removing item from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
