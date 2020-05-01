const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

const billController = require("../../controllers/billController");

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

module.exports = router;
