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
  try {
    // get total payments each tenant made exluding roomie transfers
    const roomieTransSums = await paymentController.getPaymentsSum(
      req.params.houseId,
      req.params.userId
    );

    // console.log("\ngot roomie trans: ");
    // console.log(roomieTransSums);

    // // TODO: limit balance to last break even date
    // const paymentSums = await paymentController.getPaymentsSum(
    //   req.params.houseId
    // );

    // TODO: calculate individual balance for each user
    // TODO: get user balance

    res.json({ msg: "Got balance successfully", balance: roomieTransSums });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get balance" });
  }
};
