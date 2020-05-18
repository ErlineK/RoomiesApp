// User model
const User = require("../models/User");

/**
 * @route
 * @access      Public
 * @description User's params to update
 * @returns     Updated user
 */
exports.updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .select("-password")
    .then((user) => res.json({ msg: "Updated successfully", user }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Could not update user" });
    });
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
exports.getUserActiveHouse = async (userId) => {
  return await User.findById(userId).select(
    "name active_house active_house_date"
  );
};

/**
 * @access      Private
 * @receives    houseId, userId
 * @returns     User object without the password
 * @description updates user's active_house
 */
exports.updateActiveHouse = async (houseId, userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      active_house: houseId,
      active_house_date: Date.now(),
    },
    { new: true }
  ).select("-password");
};
