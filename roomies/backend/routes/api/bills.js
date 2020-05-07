const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

const billController = require("../../controllers/billController");
const paymentController = require("../../controllers/paymentController");

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

module.exports = router;
