import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const tokenVerifier = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  try {
    const verification = jwt.verify(token, SECRET_KEY);
    req.user = verification;
    next();
  } catch (error) {
    console.log("Error during token verification: ", error);
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

export default tokenVerifier;
