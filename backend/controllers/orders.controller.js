import Cart from "../models/cart.model.js";
import Order from "../models/orders.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const getOrders = async (req, res) => {
  try {
    let category = req.query.category;
    let orders = [];
    if (category === "pending") {
      orders = await Order.findOne({ user: req.user.id })
        .populate({
          path: "pendingBuy.item",
          populate: {
            path: "seller_id",
          },
        })
        .exec();
      if (orders) {
        orders = orders.pendingBuy;
        orders = orders.map((order) => {
          return {
            ...order._doc,
            seller_id: order.item.seller_id,
          };
        });
      }
    } else if (category === "bought") {
      orders = await Order.findOne({ user: req.user.id })
        .populate("itemsBought.item")
        .populate("itemsBought.seller_id")
        .exec();
      if (orders) orders = orders.itemsBought;
    } else if (category === "sold") {
      orders = await Order.findOne({ user: req.user.id })
        .populate("itemsSold.item")
        .populate("itemsSold.buyer_id")
        .exec();
      if (orders) orders = orders.itemsSold;
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error while fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getOrdersSell = async (req, res) => {
  try {
    let orders = [];
    orders = await Order.findOne({ user: req.user.id })
      .populate("pendingSell.item")
      .populate("pendingSell.buyer_id")
      .exec();
    if (orders) orders = orders.pendingSell;
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error while fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addPendingOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.item")
      .exec();
    if (!cart || !cart.items)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    const otps = cart.items.map((item) => {
      return {
        id: item.item,
        otp: String(crypto.randomInt(100000, 999999)),
      };
    });

    const hashedotps = await Promise.all(
      otps.map(async (otp) => {
        const salt = await bcrypt.genSalt(10);
        const hashedotp = await bcrypt.hash(otp.otp, salt);

        return hashedotp;
      })
    );

    const prevOrder = await Order.findOne({ user: req.user.id }).exec();

    if (!prevOrder) {
      const newOrder = new Order({
        user: req.user.id,
        pendingBuy: cart.items.map((item, index) => {
          return { item: item.item, otp: hashedotps[index] };
        }),
      });
      await newOrder.save();
    } else if (!prevOrder.pendingBuy) {
      prevOrder.pendingBuy = cart.items.map((item, index) => {
        return { item: item.item, otp: hashedotps[index] };
      });
      await prevOrder.save();
    } else {
      prevOrder.pendingBuy = prevOrder.pendingBuy.concat(
        cart.items.map((item, index) => {
          return { item: item.item, otp: hashedotps[index] };
        })
      );
      await prevOrder.save();
    }

    for (const item of cart.items) {
      const seller = await Order.findOne({ user: item.item.seller_id }).exec();
      if (!seller) {
        const newOrder = new Order({
          user: item.item.seller_id,
          pendingSell: [{ item: item.item._id, buyer_id: req.user.id }],
        });
        await newOrder.save();
      } else if (!seller.pendingSell) {
        seller.pendingSell = [{ item: item.item._id, buyer_id: req.user.id }];
        await seller.save();
      } else {
        seller.pendingSell.push({ item: item.item._id, buyer_id: req.user.id });
        await seller.save();
      }
    }

    cart.items = [];
    await cart.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Order placed successfully",
        otps,
        buyer_id: req.user.id,
      });
  } catch (error) {
    console.error("Error while adding pending order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { buyer_id, item_id, otp } = req.body;
    const order = await Order.findOne({
      user: buyer_id,
    })
      .populate("pendingBuy.item")
      .exec();

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    const item = order.pendingBuy.find((item) => {
      return item.item._id == item_id;
    });
    if (!item) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }

    const validOtp = await bcrypt.compare(otp, item.otp);
    if (!validOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    order.pendingBuy = order.pendingBuy.filter(
      (item) => item.item._id != item_id
    );

    if (!order.itemsBought) order.itemsBought = [];

    const seller = await Order.findOne({
      user: item.item.seller_id,
    });

    order.itemsBought.push({ item: item_id, seller_id: item.item.seller_id });

    if (!seller.itemsSold) seller.itemsSold = [];
    seller.itemsSold.push({ item: item_id, buyer_id: buyer_id });

    seller.pendingSell = seller.pendingSell.filter(
      (item) => item.item != item_id
    );

    await order.save();
    await seller.save();

    res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error while confirming order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
