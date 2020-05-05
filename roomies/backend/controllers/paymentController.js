// Payment model
const Payment = require("../models/Payment");
// Bill model
const Bill = require("../models/Bill");

// User constroller
const billController = require("./billController");

exports.addNewPayment = async (req, res) => {
  try {
    console.log("\n adding new payment \n");
    // create comment if not empty

    const newComment = req.body.comment
      ? await new UserComment({
          author: req.params.userId,
          msg: req.body.comment,
        }).save()
      : undefined;

    // TODO: test user in approved tenant in bill's house

    //create payment
    // TODO: update payment images
    const newPayment = await new Payment({
      ...req.body,
      user_comment: newComment,
    }).save();

    // add payment to bill
    const updatedBill = await Bill.findByIdAndUpdate(req.params.billId, {
      $push: { payments: newPayment },
    });

    console.log("\nUpadted Bill:\n");
    console.log(updatedBill);

    //return all house bills for response
    const newReq = { ...req, params: { houseId: req.body.house_ref } };

    billController.getAllBillsForHouse(newReq, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add payment" });
  }
};
