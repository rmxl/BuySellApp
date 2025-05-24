import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { casCallback, casLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/cas/login", casLogin);
router.get("/cas/callback", casCallback);

export default router;
