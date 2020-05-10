// House model
const House = require("../models/House");
// User constroller
const userController = require("./userController");

// User constroller
const notificationController = require("./notificationController");

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     All user's houses
 */
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

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     Usdeted house
 */
exports.updateHouse = async (req, res) => {
  House.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((house) => res.json({ msg: "Updated successfully", house }))
    .catch((err) => res.status(400).json({ error: "Could not update house" }));
};

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     Updated user (all houses are retreived from client)
 */
exports.addNewHouse = async (req, res) => {
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

/**
 * @route       api/houses/:userId/tenants
 * @access      Public
 * @receives    {house Id, tenant email, tenant name (to be used later)}
 * @returns     All houses for user
 */
exports.addTenant = async (req, res) => {
  const { houseId, email, name } = req.body;

  try {
    // get user with tenant email
    const tenant = await userController.getSafeUserByParam({ email: email });
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

/**
 * @access      Private
 * @returns     house item
 * @desc    add tenant to 'approved tenants' list of a house object
 */
exports.setTenantActive = async (houseId, userId) => {
  return House.findByIdAndUpdate(houseId, {
    $push: { approved_tenants: userId },
  });
};

/**
 * @access      Private
 * @returns     house item
 * @desc    checks a user is an approved tenant in house and is authorized to modify related info
 */
exports.checkUserCanEdit = async (houseId, userId) => {
  try {
    const authorized = await House.find({
      _id: houseId,
      approved_tenants: userId,
    });
    return authorized;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * @route       api/houses/house/:userId/:houseId
 * @access      Public
 * @returns     Updated user
 */
exports.acceptHouseInv = async (req, res) => {
  try {
    // update invitation accepted and do accept invitation proccess
    const invitationItem = await Notification.findOneAndUpdate(
      {
        ntf_house: req.params.houseId,
        to_user: req.params.userId,
      },
      {
        accepted: true,
        viewed: true,
      },
      { new: true }
    );

    await notificationController.acceptInvitation(
      invitationItem,
      req.params.userId
    );

    const user = await userController.getSafeUserByParam({
      _id: req.params.userId,
    });
    res.json({ msg: "Invitation accepted", user });
  } catch (err) {
    res.status(400).json({ error: "Could not accept house invitation" });
  }
};
