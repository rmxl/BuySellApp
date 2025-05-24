import User from "../models/user.model.js";
import Item from "../models/item.model.js";

export const getItems = async (req, res) => {
  const categories = req.query.categories ? req.query.categories : [];
  const searchQuery =
    req.query.searchQuery === undefined ? "" : req.query.searchQuery;

  try {
    let items = [];
    if (categories.length == 0 && searchQuery == "") {
      items = await Item.find({});
    } else if (categories.length == 0) {
      items = await Item.find({
        name: { $regex: `^${searchQuery}`, $options: "i" },
      });
    } else if (searchQuery == "") {
      items = await Item.find({
        category: { $in: categories },
      });
    } else {
      items = await Item.find({
        category: { $in: categories },
        name: { $regex: `^${searchQuery}`, $options: "i" },
      });
    }
    let updatedNames = [];
    updatedNames = await Promise.all(
      items.map(async (item) => {
        const seller = await User.findById(item.seller_id)
          .select("firstname lastname")
          .exec();

        return `${seller.firstname} ${seller.lastname}`;
      })
    );

    items = items.map((item, index) => {
      return {
        ...item._doc,
        seller_name: updatedNames[index],
      };
    });

    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error while fetching Items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getItemById = async (req, res) => {
  try {
    let item = await Item.findById(req.query.id).exec();
    const seller = await User.findById(item.seller_id)
      .select("firstname lastname")
      .exec();
    item = {
      ...item._doc,
      seller_name: `${seller.firstname} ${seller.lastname}`,
    };
    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Error while fetching Item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addItem = async (req, res) => {
  try {
    if (
      req.body.name === "" ||
      req.body.price === "" ||
      req.body.description === "" ||
      req.body.category === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Fields should not be empty" });
    }

    if (req.body.price < 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Price should be greater than or equal to 0",
        });
    }

    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      seller_id: req.user.id,
    });
    await item.save();
    res.status(200).json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.error("Error while adding Item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
