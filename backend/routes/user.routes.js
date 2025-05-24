import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserId,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/id", getUserId);

export default router;
