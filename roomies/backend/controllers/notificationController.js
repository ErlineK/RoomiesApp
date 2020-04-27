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
    console.log("\n\n");
    console.log("getting all notifications for user " + req.params.userId);
    //   TODO: limit number of notifications
    const notifications = await Notification.find()
      .where("to_user")
      .equals(req.params.userId)
      .populate({
        path: "from_user",
        select: "email name"
      })
      .populate({ path: "ntf_house", select: "houseName address city" })
      .sort({ added_date: -1 });

    res.json({
      msg: "Got user notification successfully",
      messages: notifications
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
  console.log("creating invitation");
  try {
    //create invitation notification
    const newInvitation = await Notification.create({
      type: "NVT",
      to_user: toId,
      from_user: fromId,
      ntf_house: houseId
    });

    return newInvitation;
  } catch (err) {
    console.log(err);
    return err;
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
