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
    // userID of leader
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  complete: {
    type: Boolean,
    default: false
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chore = mongoose.model("chore", ChoreSchema);
