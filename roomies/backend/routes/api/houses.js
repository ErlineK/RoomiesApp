const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

// House model
const House = require("../../models/House");
// User model
const User = require("../../models/User");

const houseController = require("../../controllers/houseController");

/**
 * @route       api/houses/:userId
 * @access      Public
 */
router
  .route("/:userId")
  .head(auth)
  .get(houseController.getAllHousesForUser)
  .patch(houseController.updateHouse)
  .post(houseController.addNewHouse);

/**
 * @route       api/houses/:userId/tenants
 * @access      Public
 */
router
  .route("/:userId/tenants")
  .head(auth)
  .put(houseController.addTenant);

// /**
//  * @route       PUT api/houses/addTenant/:houseId
//  * @description Add house tenant
//  * @access      Public
//  */
// router.put("/addTenant/:houseId", auth, (req, res) => {
//   const { userId, email, name } = req.body;
//   // check tenant id exist as user
//   User.findOne({ email: email })
//     .select("-password")
//     .then(user => {
//       if (!user) {
//         res.status(404).json({ error: "No houses found" });
//       }

//       // add tenant to house
//       House.findByIdAndUpdate(req.params.houseId, {
//         $push: { house_tenants: user }
//       })
//         .then(house => {
//           console.log("updated house");
//           console.log(house.house_tenants);

//           // TODO: create invitation notification
//         vvvv

//           // get houses list
//           // res.json({ msg: "Updated successfully", house });
//           House.find({ house_tenants: userId })
//             .populate({
//               path: "house_tenants",
//               select: "email name",
//               populate: { path: "approved_tenants", select: "email name" }
//             })
//             .sort({ active: -1, opened: -1 })
//             .then(houses =>
//               res.json({ msg: "Got houses successfully", houses })
//             )
//             .catch(err => res.status(404).json({ error: "No houses found" }));
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(400).json({ error: "Unable to update the Database" });
//         });
//     })
//     .catch(err => {
//       console.log("can't find user with email " + email);
//       res.status(400).json({ error: "User not found" });
//     });
// });

// /**
//  * @route       PUT api/houses/remove/:id
//  * @description Remove house for tenant. If no tenants left in house - delete house
//  * @access      Public
//  */
//  TODO: set that
// router.put("/reamove/:id", (req, res) => {
//   House.findByIdAndUpdate(req.params.id, req.body)
//     .then(house => res.json({ msg: "Updated successfully", house }))
//     .catch(err =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

// TODO: add tenants to house

module.exports = router;
