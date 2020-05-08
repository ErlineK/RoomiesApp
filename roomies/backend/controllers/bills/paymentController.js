// Payment model
const Payment = require("../../models/Payment");
// Bill model
const Bill = require("../../models/Bill");

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
          await notificationController.createNtfNotification(
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
