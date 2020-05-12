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

    // calculate base bills break-even
    const billsNotEmpty =
      roomieTransSums.billSums && roomieTransSums.billSums.length > 0;
    const numRoomies = billsNotEmpty ? roomieTransSums.billSums.length : 0;
    const billsPaidTotal = billsNotEmpty
      ? roomieTransSums.billSums.map((p) => p.total).reduce((a, b) => a + b, 0)
      : 0;
    const billsEven = billsPaidTotal / numRoomies;

    // console.log("numRoomies: " + numRoomies);
    // console.log("billsPaidTotal " + billsPaidTotal);
    // console.log("billsEven " + billsEven);

    // calculate individual balance for each user
    let userBalances = roomieTransSums.billSums;
    userBalances = userBalances.map((user) => {
      // Check if balance calculated for me
      const me = user._id == req.params.userId;

      let received = getTransfersForUser(
        me,
        roomieTransSums.roomieReceived,
        user._id
      );
      received = me ? 0 - received : received;

      // If user is me: add all given transfers, If giving: substruct for receiveing user
      let transfered = getTransfersForUser(
        me,
        roomieTransSums.roomieTransfered,
        user._id
      );
      transfered = me ? 0 - transfered : transfered;

      console.log(
        `Roomie ${user.user[0].name} total balance: ${user.total}, received: ${received}, transfered: ${transfered} `
      );

      let newUser = {
        ...user,
        totals: {
          received: received,
          transfered: transfered,
          paidBills: user.total,
          billsEven: Number(billsEven.toFixed(2)),
        },
        totalBalance: Number(
          (user.total - billsEven + received - transfered).toFixed(2)
        ),
      };
      return newUser;
    });

    res.json({ msg: "Got balance successfully", balance: userBalances });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get balance" });
  }
};

/**
 * @access      Private
 * @desc        Calculate user balance for house
 * @requires    {me: Boolean, transfers: Obj Array: iUserId: String}
 * @returns     User transfers sum total : Number
 */
function getTransfersForUser(me, transfers, iUserId) {
  let totalTransfered = 0;

  if (transfers) {
    totalTransfered = me
      ? transfers
          .map((rTransfer) => rTransfer.totalTransfered)
          .reduce((a, b) => a + b, 0)
      : transfers.filter(
          (rTrns) => rTrns._id.toString() === iUserId.toString()
        );

    if (!me) {
      totalTransfered =
        totalTransfered.length > 0
          ? (totalTransfered = totalTransfered[0].totalTransfered)
          : 0;
    }
  }

  return totalTransfered;
}
