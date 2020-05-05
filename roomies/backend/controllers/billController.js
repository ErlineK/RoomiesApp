// Bill model
const Bill = require("../models/Bill");
// UserComment model
const UserComment = require("../models/UserComment");
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
      .or(
        { bill_type: { $ne: "Roomie Transfer" } },
        {
          $and: [
            { bill_type: "Roomie Transfer" },
            { "payments.to_user": req.params.userId },
          ],
        },
        {
          $and: [
            { bill_type: "Roomie Transfer" },
            { "payments.from_user": req.params.userId },
          ],
        }
      )
      .populate({
        path: "bill_comments",
        populate: { path: "author", select: "name" },
      })
      .populate({
        path: "payments",
        populate: [
          { path: "from_user", select: "name" },
          {
            path: "user_comment",
            populate: { path: "author", select: "name" },
          },
        ],
      })
      .sort({ due_date: +1 });

    res.json({ msg: "Got bills successfully", bills: bills });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not find bills" });
  }
};

exports.addNewBill = async (req, res) => {
  try {
    // create comment
    const newComment = await new UserComment({
      author: req.params.userId,
      msg: req.body.comment,
    }).save();

    // reate new bill and add to db
    const billParams = req.body;
    const newBill = await new Bill({
      // TODO: create object
      invoice_num: billParams.invoice_num,
      bill_type: billParams.bill_type,
      start_date: billParams.start_date,
      end_date: billParams.end_date,
      total_amount: billParams.total_amount,
      due_date: billParams.due_date,
      ref_house: req.params.houseId,
      bill_comments: [newComment],
    }).save();

    if (newBill.bill_type === "Roomie Transfer") {
      // TODO: create notification for roomie transfer
    }
    // return all bills
    this.getAllBillsForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add bill" });
  }
};

exports.updateBill = async (req, res) => {
  try {
    // TODO: update bill
    // TODO: create notification if roomie transfer
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update bill" });
  }
};
