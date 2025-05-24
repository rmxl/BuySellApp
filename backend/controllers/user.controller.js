import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).exec();
    user.password = undefined;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error while fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    if (
      !req.body.firstname &&
      !req.body.lastname &&
      !req.body.age &&
      !req.body.contact
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Fields should not be empty" });
    }

    if (req.body.age && req.body.age < 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Age should be greater than or equal to 0",
        });
    }

    const user = await User.findById(req.user.id).exec();
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.age = req.body.age || user.age;
    user.contact = req.body.contact || user.contact;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error while updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserId = async (req, res) => {
  res.status(200).json({ success: true, id: req.user.id });
};
