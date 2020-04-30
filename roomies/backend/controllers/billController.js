// Bill model
const Bill = require("../models/Bill");
// User constroller
const userController = require("./userController");

// User constroller
const notificationController = require("./notificationController");

exports.getAllBillsForHouse = async (req, res) => {
  try {
    // get all houses where user is a tenant
    const bills = await Bill.find()
      .where("ref_house")
      .equals(req.params.houseId)
      .populate({
        path: "payments",
        populate: [
          { path: "from_user", select: "name" },
          { path: "to_user", select: "name" },
          { path: "comments", populate: { path: "author", select: "name" } }
        ]
      })
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" }
      })
      .sort({ due_date: -1 });

    res.json({ msg: "Got bills successfully", bills: bills });
  } catch (err) {
    res.status(404).json({ error: "Could not find bills" });
  }
};

exports.addNewBill = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add bill" });
  }
};

exports.updateBill = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update bill" });
  }
};
