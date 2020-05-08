// Bill model
const Bill = require("../../models/Bill");

// UserComment model
const UserComment = require("../../models/UserComment");
// User constroller
const userController = require("../userController");

exports.addNewComment = async (req, res) => {
  try {
    //   TODO: check if user permitetd to edit bill
    // create comment
    const newComment =
      req.body.comment && req.body.comment !== ""
        ? await new UserComment({
            author: req.params.userId,
            msg: req.body.comment,
          }).save()
        : undefined;

    //    TODO: add comment to bill_comments

    // return all bills
    this.getAllBillsForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add comment" });
  }
};
