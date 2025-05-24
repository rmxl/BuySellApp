import express from "express";
import {
  getItems,
  getItemById,
  addItem,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/getItems", getItems);
router.get("/getItem", getItemById);
router.post("/addItems", addItem);

export default router;
