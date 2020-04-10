const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
  admin: {
    type: ObjectId,
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
    required: false
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
    type: String
  }
});

module.exports = House = mongoose.model("house", HouseSchema);
