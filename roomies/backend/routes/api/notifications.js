const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

const notificationController = require("../../controllers/notificationController");

/**
 * @route       api/notifications/:userId
 * @access      Public
 */
router
  .route("/:userId")
  .head(auth)
  .get(notificationController.getNotificationsForUser)
  .post(notificationController.addNotification);

/**
 * @route       api/notifications/:userId/:notificationID
 * @access      Public
 */
router
  .route("/:userId/:notificationID")
  .head(auth)
  .patch(notificationController.updateNotification);
//   .delete(notificationController.deleteNotification);

// TODO: invitation approved + create welcome messages to all tenants
// TODO: transfer accepted

module.exports = router;
