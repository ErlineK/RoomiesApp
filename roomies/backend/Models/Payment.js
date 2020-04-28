const mongoose = require("mongoose");
const user = require("./User").model("user");
const comment = require("./Comment").model("comment");
const house = require("./House").model("house");

const PaymentSchema = new mongoose.Schema({
  transaction_date: {
    type: Date,
    default: Date.now
  },
  house_ref: {
    type: mongoose.Types.ObjectId,
    ref: house,
    required: true
  },
  from_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true
  },
  to_user: {
    type: mongoose.Types.ObjectId,
    ref: user
  },
  payed_for: {
    type: String
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0.1,
    max: 1000.0
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: comment
    }
  ],
  transaction_images: [
    {
      type: String
    }
  ],
  accepted: {
    type: Boolean,
    default: false
  }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
