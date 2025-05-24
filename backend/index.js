import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import connect from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import supportRoutes from "./routes/support.routes.js";
import tokenVerifier from "./tokenVerifier.js";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.BACKEND_PORT || 5000;

app.use((req, res, next) => {
  const unprotectedRoutes = [
    "/login",
    "/register",
    "/cas/login",
    "/cas/callback",
  ];

  if (unprotectedRoutes.includes(req.path)) {
    return next();
  }

  tokenVerifier(req, res, next);
});

app.use(express.json());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", supportRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
