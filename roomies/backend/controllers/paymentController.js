// Payment model
const Payment = require("../models/Payment");
// Bill model
const Bill = require("../models/Bill");

exports.addNewPayment = async (payment) => {
  try {
    console.log("\n adding new payment \n");
    // create comment
    const newComment = await new UserComment({
      author: payment.userId,
      msg: payment.comment,
    });

    //create payment

    // TODO: update payment data
    // TODO: update payment images
    return await new Payment({
      transaction_date: "",
      from_user: payment.userId,
      to_user: payment.to_user,
      payed_for: "",
      total_amount: "",
      comments: [newComment],
    }).save();
  } catch (err) {
    console.log(err);
    return { error: "Could not add payment" };
  }
};
