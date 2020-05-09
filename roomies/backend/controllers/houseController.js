// House model
const House = require("../models/House");
// User constroller
const userController = require("./userController");

// User constroller
const notificationController = require("./notificationController");

exports.getAllHousesForUser = async (req, res) => {
  try {
    // get all houses where user is a tenant
    const houses = await House.find()
      .where("house_tenants")
      .equals(req.params.userId)
      .populate({
        path: "house_tenants",
        select: "email name",
      })
      .populate({ path: "approved_tenants", select: "name" })
      .sort({ opened: -1 });

    res.json({ msg: "Got user houses successfully", houses: houses });
  } catch (err) {
    res.status(404).json({ error: "Could not find houses" });
  }
};

exports.updateHouse = async (req, res) => {
  House.findByIdAndUpdate(req.params.userId, req.body)
    .then((house) => res.json({ msg: "Updated successfully", house }))
    .catch((err) => res.status(400).json({ error: "Could not update house" }));
};

exports.addNewHouse = async (req, res) => {
  console.log("calling addNewHouse");
  const reqDataHouse = req.body.newHouse;

  try {
    // save new house
    const newHouse = await new House({
      admin: req.params.userId,
      houseName: reqDataHouse.houseName,
      address: reqDataHouse.address,
      city: reqDataHouse.city,
      province: reqDataHouse.province,
      description: reqDataHouse.description,
      house_tenants: [req.params.userId], // set user as first member in house
      approved_tenants: [req.params.userId], // self approved
      avatar: reqDataHouse.avatar,
    }).save();

    //update user's active house
    const updateUserReq = {
      params: { userId: req.params.userId },
      body: { active_house: newHouse._id },
    };
    // update user and return
    userController.updateUser(updateUserReq, res);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not save new house" });
  }
};

exports.addTenant = async (req, res) => {
  const { houseId, email, name } = req.body;

  try {
    // get user with tenant email
    const tenant = await userController.getUserByParam({ email: email });
    if (!tenant) {
      res.status(404).json({ error: "No such user" });
    }

    // add tenant to house
    await House.findByIdAndUpdate(houseId, {
      $push: { house_tenants: tenant },
    });

    // create invitation notification
    notificationController.createNvtNotification(
      req.params.userId,
      tenant._id,
      houseId
    );
    // get houses list
    this.getAllHousesForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not add tenant" });
  }
};

exports.checkUserCanEdit = async (houseId, userId) => {
  try {
    const authorized = await House.find({
      _id: houseId,
      active_tenants: userId,
    });
    return authorized;
  } catch (err) {
    console.log(err);
    return false;
  }
};
