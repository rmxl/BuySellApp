import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import xml2js from "xml2js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, age, contact, password } = req.body;

  if (!firstname || !lastname || !email || !age || !contact || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fields should not be empty" });
  }

  if (age < 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Age should be greater than or equal to 0",
      });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      firstname,
      lastname,
      email,
      age,
      contact,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fields should not be empty" });
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, {});

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const casConfig = {
  cas_url: "https://login.iiit.ac.in/cas",
  service_url: "http://localhost:5000",
  cas_version: "3.0",
};

export const validateCasTicket = async (ticket) => {
  try {
    console.log("Validating CAS ticket:", ticket);
    const validateUrl = `${
      casConfig.cas_url
    }/p3/serviceValidate?service=${encodeURIComponent(
      casConfig.service_url + "/cas/callback"
    )}&ticket=${ticket}`;
    const response = await axios.get(validateUrl);

    return new Promise((resolve, reject) => {
      xml2js.parseString(response.data, (err, result) => {
        if (err) reject(err);

        const serviceResponse = result["cas:serviceResponse"];
        if (serviceResponse["cas:authenticationSuccess"]) {
          const success = serviceResponse["cas:authenticationSuccess"][0];
          const user = {
            email: success["cas:user"][0],
            attributes: success["cas:attributes"]
              ? success["cas:attributes"][0]
              : {},
          };
          resolve(user);
        } else {
          reject(new Error("CAS Authentication failed"));
        }
      });
    });
  } catch (error) {
    throw new Error(`CAS Validation failed: ${error.message}`);
  }
};

export const casLogin = async (req, res) => {
  const loginUrl = `${casConfig.cas_url}/login?service=${encodeURIComponent(
    casConfig.service_url + "/cas/callback"
  )}`;
  res
    .status(200)
    .json({ success: true, message: "Redirecting to CAS login", loginUrl });
};

export const casCallback = async (req, res) => {
  try {
    console.log("CAS callback reached in backend");
    const { ticket } = req.query;
    console.log("Ticket:", ticket);
    if (!ticket) {
      return res.redirect("/login?error=no_ticket");
    }
    const userData = await validateCasTicket(ticket);
    console.log("User data:", userData);

    if (userData) {
      console.log("user is validated");

      const user = await User.findOne({
        email: userData.email,
      }).exec();

      if (!user) {
        console.log("User not found in database.");
        return res.redirect("http://localhost:5173/register");
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, {});
      res.redirect(`http://localhost:5173/settoken?token=${token}`);
    } else {
      console.log("user is not validated");
      res.redirect(" http://localhost:5173/login");
    }
  } catch (error) {
    console.error("CAS authentication error:", error);
    res.redirect("/login?error=cas_auth_failed");
  }
};
