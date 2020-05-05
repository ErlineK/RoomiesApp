const mongoose = require("mongoose");
const userComment = require("./UserComment").model("userComment");
const house = require("./House").model("house");
const payment = require("./Payment").model("payment");

const BillSchema = new mongoose.Schema({
  date_added: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  invoice_num: {
    type: String,
    maxlength: 12,
  },
  ref_house: {
    type: mongoose.Types.ObjectId,
    ref: house,
    required: true,
  },
  bill_type: {
    type: String,
    enum: [
      "Other",
      "Hydro",
      "Gas",
      "internet/TV",
      "Groceries",
      "Roomie Transfer",
    ],
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0.1,
    max: 1000.0,
  },
  payments: [
    {
      type: mongoose.Types.ObjectId,
      ref: payment,
    },
  ],
  payed: {
    type: Number,
    // default: 0,
    default: function () {
      try {
        return this.payments
          .map((p) => p.total_amount)
          .reduce((a, b) => a + b, 0);
      } catch (err) {
        return 0;
      }
    },

    // TODO: set calculated/virtual field of payments sums
  },
  bill_comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: userComment,
    },
  ],
  bill_images: [
    {
      type: String,
    },
  ],
});

module.exports = Bill = mongoose.model("bill", BillSchema);
