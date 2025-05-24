import express from "express";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/cart", getCart);
router.post("/cart", addItemToCart);
router.delete("/cart", removeItemFromCart);

export default router;
