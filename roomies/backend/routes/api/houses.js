const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");

const houseController = require("../../controllers/houseController");

/**
 * @route       api/houses/:userId
 * @access      Public
 */
router
  .route("/:userId")
  .get(auth, houseController.getAllHousesForUser)
  .patch(auth, houseController.updateHouse)
  .post(auth, houseController.addNewHouse);

/**
 * @route       api/houses/:userId/tenants
 * @access      Public
 */
router.route("/:userId/tenants").put(auth, houseController.addTenant);

module.exports = router;
