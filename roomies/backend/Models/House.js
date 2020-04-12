const mongoose = require("mongoose");
const UserSchema = require("./User");

const HouseSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  opened: {
    type: Date,
    default: Date.now,
    required: true
  },
  houseName: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    enum: ["ON", "QC", "NS", "NB", "MB", "BC", "PE", "SK", "AB", "NL"],
    required: true
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  },
  tenants: {
    //holds user ids
    type: [mongoose.Types.ObjectId],
    required: true
  }
});

module.exports = House = mongoose.model("house", HouseSchema);
