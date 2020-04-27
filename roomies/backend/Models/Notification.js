const mongoose = require("mongoose");
const user = require("./User").model("user");
const house = require("./House").model("house");

const NotificationSchema = new mongoose.Schema({
  type: {
    /* NVT => Invitation to join a peoperty account
     * MSG => message on messages board
     * NTF => notification of payed bill/welcome/new tenant/birthdays(?)/transfer between tenants
     */
    type: String,
    enum: ["NVT", "MSG", "NTF"],
    required: true
  },
  ntf_type: {
    type: String,
    enum: ["transfer", "general"]
  },
  to_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true
  },
  from_user: {
    type: mongoose.Types.ObjectId,
    ref: user
  },
  added_date: {
    type: Date,
    default: Date.now
  },
  ntf_house: {
    type: mongoose.Types.ObjectId,
    ref: house
  },
  ntf_bill: {
    type: mongoose.Types.ObjectId
  },
  msg: {
    type: String
  },
  accepted: {
    type: Boolean,
    default: false
  },
  viewed: {
    type: Boolean,
    default: false
  }
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
