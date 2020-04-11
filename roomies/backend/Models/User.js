const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const HouseSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  birth_date: {
    type: Date
  },
  user_avatar: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = House = mongoose.model("house", HouseSchema);
