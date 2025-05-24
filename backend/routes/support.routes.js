import express from "express";
import { getSupportGemini } from "../controllers/support.controller.js";

const router = express.Router();

router.post("/getSupportGemini", getSupportGemini);

export default router;
