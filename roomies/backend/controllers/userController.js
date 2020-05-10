// User model
const User = require("../models/User");

/**
 * @route
 * @access      Public
 * @desc        User's params to update
 * @returns     Updated user
 */
exports.updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .select("-password")
    .then((user) => res.json({ msg: "Updated successfully", user }))
    .catch((err) => res.status(400).json({ error: "Could not update user" }));
};

/**
 * @access      Private
 * @receives    User params object
 * @returns     User object without the password
 */
exports.getSafeUserByParam = async (searchObj) => {
  return User.findOne(searchObj).select("-password");
};

/**
 * @access      Private
 * @receives    User params object
 * @returns     User object without the password
 */
exports.getUserActiveHouseId = async (userId) => {
  const userHouse = await User.findById(userId).select("name active_house");
  return userHouse.active_house;
};

/**
 * @access      Private
 * @receives    houseId, userId
 * @returns     User object without the password
 * @desc    updates user's active_house
 */
exports.updateActiveHouse = async (houseId, userId) => {
  return User.findByIdAndUpdate(userId, { active_house: houseId }).select(
    "-password"
  );
};
