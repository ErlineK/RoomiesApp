// Payment model
const Payment = require("../../models/Payment");
// Bill model
const Bill = require("../../models/Bill");
// Bill model
const UserComment = require("../../models/UserComment");

// Bill controller
const billController = require("./billController");
// House controller
const houseController = require("../houseController");
// Notification controller
const notificationController = require("../notificationController");

exports.addNewPayment = async (req, res) => {
  try {
    // check user approved in house
    if (
      houseController.checkUserCanEdit(req.body.house_ref, req.params.userId)
    ) {
      // create comment if not empty
      const newComment = req.body.comment
        ? await new UserComment({
            author: req.params.userId,
            msg: req.body.comment,
          }).save()
        : undefined;

      //create payment
      const newPayment = await new Payment({
        ...req.body,
        user_comment: newComment,
      }).save();

      // TODO: update payment images

      // add payment to bill
      await Bill.findByIdAndUpdate(req.params.billId, {
        $push: { payments: newPayment },
      });

      try {
        // check if entire bill was paid and create 'bill paid' notification
        const fullBill = await Bill.findById(req.params.billId).populate({
          path: "payments",
          // populate: [{ path: "from_user", select: "name" }],
        });

        if (Number(fullBill.paid) >= Number(fullBill.total_amount)) {
          console.log("creating notification");
          //create notification for paid bill
          await notificationController.createNtfNotificationBill(
            req.body.house_ref,
            fullBill._id
          );
        }
      } catch (err) {
        console.log(err);
      }

      //return all house bills for response
      const newReq = { ...req, params: { houseId: req.body.house_ref } };
      billController.getAllBillsForHouse(newReq, res);
    } else {
      res.status(403).json({ error: "User not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add payment" });
  }
};

/**
 * @route       api/bills/payment/:billId/:userId
 * @access      Public
 * @note        billId holds paymentId
 */
exports.deletePayment = async (req, res) => {
  try {
    // check user made payments
    const payment = await Payment.findById(req.params.billId);

    if (payment.from_user == req.params.userId) {
      // remove payment related comments
      await UserComment.findByIdAndDelete(payment.user_comment);

      // TODO: remove payment related images and documents

      // delete payment from bill
      const bill = await Bill.findOneAndUpdate(
        { payments: payment._id },
        {
          $pull: { payments: [payment._id] },
        }
      );

      // delete payment from db
      await Payment.findByIdAndDelete(payment._id);

      // check if entire bill was paid and create 'bill paid' notification
      const fullBill = await Bill.findById(bill._id).populate({
        path: "payments",
      });

      console.log("got full bill: \n");
      console.log(fullBill);

      // check if bill not fully paid anymode and remove notification for bill paid
      if (Number(fullBill.paid) < Number(fullBill.total_amount)) {
        await Notification.deleteMany({
          type: "NTF",
          ntf_bill: fullBill._id,
        });
      }

      // return all bills
      const newReq = { ...req, params: { houseId: fullBill.ref_house } };
      billController.getAllBillsForHouse(newReq, res);
    } else {
      res.status(403).json({ error: "User not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not remove payment" });
  }
};
