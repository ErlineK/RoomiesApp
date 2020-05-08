const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

const billController = require("../../controllers/bills/billController");
const paymentController = require("../../controllers/bills/paymentController");
const billCommentsController = require("../../controllers/bills/billCommentsController");

/**
 * @route       api/bills/:houseId/:userId
 * @access      Public
 */
router
  .route("/:houseId/:userId")
  .head(auth)
  .get(billController.getAllBillsForHouse)
  .patch(billController.updateBill)
  .post(billController.addNewBill);

/**
 * @route       api/bills/payment/:houseId/:userId
 * @access      Public
 */
router
  .route("/payment/:billId/:userId")
  .head(auth)
  // .get(billController.getAllBillsForHouse)
  // .patch(billController.updateBill)
  .post(paymentController.addNewPayment)
  .delete(billController.deleteBill);

/**
 * @route       api/bills/comment/:houseId/:userId
 * @access      Public
 */
router
  .route("/comment/:billId/:userId")
  .head(auth)
  // .patch(billController.updateBill)
  .post(billCommentsController.addNewComment);
// .delete(billController.deleteComment);

module.exports = router;
