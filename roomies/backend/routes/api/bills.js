const express = require("express");
const router = express.Router();
const { auth, billAuth } = require("../../helpers/auth");

const billController = require("../../controllers/bills/billController");
const paymentController = require("../../controllers/bills/paymentController");
const billCommentsController = require("../../controllers/bills/billCommentsController");

/**
 * @route       api/bills/:houseId/:userId
 * @access      Public
 */
router
  .route("/:houseId/:userId")
  // .head(auth)
  .get(auth, billController.getAllBillsForHouse)
  .patch(auth, billController.updateBill)
  .post(auth, billController.addNewBill);

/**
 * @route       api/bills/bill/:billId/:userId
 * @access      Public
 */
router
  .route("/bill/:billId/:userId")
  // .head(auth)
  // .get(billController.getAllBillsForHouse)
  // .patch(billController.updateBill)
  // .post(paymentController.addNewPayment)
  .delete(auth, billAuth, billController.deleteBill);

/**
 * @route       api/bills/payment/:billId/:userId
 * @access      Public
 */
router
  .route("/payment/:billId/:userId")
  // .get(billController.getAllBillsForHouse)
  // .patch(billController.updateBill)
  .post(auth, billAuth, paymentController.addNewPayment)
  .delete(auth, paymentController.deletePayment);

/**
 * @route       api/bills/comment/:billId/:userId
 * @access      Public
 */
router
  .route("/comment/:billId/:userId")
  // .patch(billController.updateBill)
  .post(auth, billCommentsController.addNewComment);
// .delete(billController.deleteComment);

module.exports = router;
