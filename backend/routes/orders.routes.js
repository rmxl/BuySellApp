import express from "express";
import {
  getOrders,
  addPendingOrder,
  getOrdersSell,
  confirmOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/getOrders", getOrders);
router.get("/getOrdersSell", getOrdersSell);
router.post("/addPendingOrder", addPendingOrder);
router.post("/confirmOrder", confirmOrder);

export default router;
