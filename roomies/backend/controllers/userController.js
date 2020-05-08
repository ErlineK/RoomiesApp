// User model
const User = require("../models/User");

exports.updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .select("-password")
    .then((user) => res.json({ msg: "Updated successfully", user }))
    .catch((err) => res.status(400).json({ error: "Could not update user" }));
};

exports.getUserByParam = async (searchObj) => {
  return User.findOne(searchObj).select("-password");
};

exports.getUserActiveHouseId = async (userId) => {
  const userHouse = await User.findById(userId).select("name active_house");
  return userHouse.active_house;
};
