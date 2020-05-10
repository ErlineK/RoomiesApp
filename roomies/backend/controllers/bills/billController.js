// Bill model
const Bill = require("../../models/Bill");
// Payment model
const Payment = require("../../models/Payment");

// UserComment model
const UserComment = require("../../models/UserComment");
// User controller
const userController = require("../userController");

// House controller
const houseController = require("../houses/houseController");

// User controller
const notificationController = require("../notificationController");

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
        options: { sort: { transaction_date: -1 } },
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
    const newComment =
      req.body.comment && req.body.comment !== ""
        ? await new UserComment({
            author: req.params.userId,
            msg: req.body.comment,
          }).save()
        : undefined;

    // reate new bill and add to db
    const billParams = req.body;
    // if roomie transfer -> invoice num holds the reference num
    const invoiceNum =
      billParams.bill_type === "Roomie Transfer" ? "" : billParams.invoice_num;
    const newBill = await new Bill({
      invoice_num: invoiceNum,
      bill_type: billParams.bill_type,
      start_date: billParams.start_date,
      end_date: billParams.end_date,
      total_amount: billParams.total_amount,
      due_date: billParams.due_date,
      ref_house: req.params.houseId,
      bill_comments: [newComment],
    }).save();

    if (newBill.bill_type === "Roomie Transfer") {
      // TODO: create payment for roomie
      const roomiePayment = new Payment({
        transaction_date: billParams.due_date,
        reference_num: billParams.invoice_num,
        house_ref: req.params.houseId,
        from_user: req.params.userId,
        to_user: billParams.to_user,
        total_amount: billParams.total_amount,
      }).save();

      // add payment to bill
      const updatedBill = await Bill.findByIdAndUpdate(newBill._id, {
        $push: { payments: roomiePayment },
      });

      // create notification for roomie transfer
      notificationController.createTrnsNotification(
        req.params.userId,
        billParams.to_user,
        req.params.houseId,
        updatedBill._id
      );
    }
    // return all bills
    this.getAllBillsForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add bill" });
  }
};

/* api/bills/:houseId/:userId
 * billId in body
 */
exports.updateBill = async (req, res) => {
  try {
    //check user can edit bill
    if (
      houseController.checkUserCanEdit(req.params.houseId, req.params.userId)
    ) {
      // update bill
      await Bill.findByIdAndUpdate(req.body.billId, req.body);

      // return all bills
      this.getAllBillsForHouse(req, res);
    } else {
      res.status(403).json({ error: "User not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update bill" });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const billToDel = await Bill.findById(req.params.billId);

    // check user approved in house
    if (
      houseController.checkUserCanEdit(billToDel.ref_house, req.params.userId)
    ) {
      // remove all payments in bill
      await Payment.deleteMany({ _id: { $in: billToDel.payments } });

      // remove all comments in bill
      await UserComment.deleteMany({ _id: { $in: billToDel.bill_comments } });

      // TODO: remove all images related to bill

      // remove bill
      await Bill.findByIdAndDelete(billToDel._id);
      // return all bills
      const newReq = { ...req, params: { houseId: billToDel.ref_house } };
      this.getAllBillsForHouse(newReq, res);
    } else {
      res.status(403).json({ error: "User not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not remove bill" });
  }
};
