// Notification model
const Notification = require("../models/Notification");
// User constroller
const userController = require("./userController");

// House constroller
const houseController = require("./houseController");

// exports.getNotificationsForUser = async (req, res) => {
//     try{}
//     catch(err){
//         console.log(err);
//         res.status(400).json({ error: "Could not get notifications" });
//     }
// };

exports.getNotificationsForUser = async (req, res) => {
  try {
    //get user active house id
    const houseId = await userController.getUserActiveHouseId(
      req.params.userId
    );
    //   TODO: limit number of notifications
    const notifications = await Notification.find()
      .where("ntf_house")
      .equals(houseId)
      // .where("to_user")
      // .equals(req.params.userId)
      .or({ to_user: { $exists: false } }, { to_user: req.params.userId })
      .populate({
        path: "from_user",
        select: "email name",
      })
      .populate({ path: "ntf_house", select: "houseName address city" })
      .populate({
        path: "ntf_bill",
        select: "bill_type total_amount start_date end_date",
      })
      .sort({ added_date: -1 });

    res.json({
      msg: "Got user notification successfully",
      messages: notifications,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

exports.addNotification = async (req, res) => {
  try {
    //create new notification
    await Notification.create(req.body);

    // return all notifications
    getNotificationsForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

exports.addMsgNotification = async (req, res) => {
  try {
    //create new notification
    await Notification.create(req.body);

    // return all notifications for user
    getNotificationsForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

exports.createNvtNotification = async (fromId, toId, houseId) => {
  try {
    //create invitation notification
    const newInvitation = await Notification.create({
      type: "NVT",
      to_user: toId,
      from_user: fromId,
      ntf_house: houseId,
    });

    return newInvitation;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.createNtfNotification = async (houseId, billId) => {
  try {
    //create invitation notification
    const newNtfNotification = await Notification.create({
      type: "NTF",
      ntf_house: houseId,
      ntf_bill: billId,
    });

    return newNtfNotification;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.createTrnsNotification = async (fromId, toId, houseId, billId) => {
  try {
    //create invitation notification
    const newNotification = await Notification.create({
      type: "TRNS",
      to_user: toId,
      from_user: fromId,
      ntf_house: houseId,
      ntf_bill: billId,
    });

    return newNotification;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.acceptInvitation = async () => {
  try {
    //TODO: change invitation status to accepted
    //TODO: add house as user's active house
    //TODO: create welcome notification (NTF, general) to all house tenants but current
    //   TODO: return user's notifications?
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update invitation" });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    //update notification
    await Notification.findByIdAndUpdate(req.params.notificationID, req.body);
    //return all notifications for user
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update notification" });
  }
};
