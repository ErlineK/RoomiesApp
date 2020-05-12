// Bill model
const Bill = require("../../models/Bill");
// Bill model
const House = require("../../models/House");
// Payment model
const Payment = require("../../models/Payment");

const tenantsController = require("../../controllers/houses/tenantsController");
const paymentController = require("../../controllers/bills/paymentController");

/**
 * @route       api/bills/balance/:houseId/:userId
 * @access      Public
 * @desc        Calculate user balance for house
 * @returns     User balance object
 */
exports.getUserBalance = async (req, res) => {
  // // TODO: limit balance to last break even date
  try {
    // get total payments each tenant made exluding roomie transfers
    const roomieTransSums = await paymentController.getPaymentsSum(
      req.params.houseId,
      req.params.userId
    );
    // TODO: calculate base bills break-even
    const billsNotEmpty =
      roomieTransSums.billSums && roomieTransSums.billSums.length > 0;
    const numRoomies = billsNotEmpty ? roomieTransSums.billSums.length : 0;
    const billsPaidTotal = billsNotEmpty
      ? roomieTransSums.billSums.map((p) => p.total).reduce((a, b) => a + b, 0)
      : 0;
    const billsEven = (billsPaidTotal / numRoomies).toFixed(2);

    console.log("numRoomies: " + numRoomies);
    console.log("billsPaidTotal " + billsPaidTotal);
    console.log("billsEven " + billsEven);

    // TODO: calculate individual balance for each user
    //   TODO: for each roomie: billSums - roomieTransfered + roomieReceived

    // TODO: get user balance

    res.json({ msg: "Got balance successfully", balance: roomieTransSums });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get balance" });
  }
};
