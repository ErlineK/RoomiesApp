const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema({
  houseId: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  leader: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  },
  complete: {
    type: Boolean,
    default: true,
    required: false
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chore = mongoose.model("chore", ChoreSchema);
