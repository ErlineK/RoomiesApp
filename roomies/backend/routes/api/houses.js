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

// /**
//  * @route       POST api/houses
//  * @description add/save house
//  * @access      Public
//  */
// router.post("/", auth, (req, res) => {
//   const reqDataHouse = req.body.newHouse;

//   const newHouse = new House({
//     admin: req.body.userId,
//     houseName: reqDataHouse.houseName,
//     address: reqDataHouse.address,
//     city: reqDataHouse.city,
//     province: reqDataHouse.province,
//     description: reqDataHouse.description,
//     house_tenants: reqDataHouse.tenants,
//     approved_tenants: reqDataHouse.tenants,
//     avatar: reqDataHouse.avatar
//   });

//   newHouse
//     .save()
//     .then(house => {
//       // TODO: set house as active in user's object
//       House.updateMany(
//         {
//           _id: { $ne: house.id },
//           house_tenants: req.body.userId,
//           active: true
//         },
//         { $set: { active: false } }
//       )
//         .then(houses =>
//           // return entire user houses list
//           House.find({ house_tenants: req.body.userId })
//             .populate({
//               path: "house_tenants",
//               select: "email name",
//               populate: { path: "approved_tenants", select: "email name" }
//             })
//             .sort({ active: -1 })
//             .then(houses =>
//               res.json({ msg: "House added successfully", houses })
//             )
//             .catch(err =>
//               res.status(404).json({ error: "Error getting houses list" })
//             )
//         )
//         .catch(err => {
//           console.log(err);
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400).json({ error: "Unable to add this house" });
//     });
// });

// /**
//  * @route       PUT api/houses/:id
//  * @description Update house
//  * @access      Public
//  */
// router.put("/:id", auth, (req, res) => {
//   House.findByIdAndUpdate(req.params.id, req.body)
//     .then(house => res.json({ msg: "Updated successfully", house }))
//     .catch(err =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

/**
 * @route       PUT api/houses/addTenant/:houseId
 * @description Add house tenant
 * @access      Public
 */
router.put("/addTenant/:houseId", auth, (req, res) => {
  const { userId, email, name } = req.body;
  // check tenant id exist as user
  User.findOne({ email: email })
    .select("-password")
    .then(user => {
      if (!user) {
        res.status(404).json({ error: "No houses found" });
      }
      console.log("found user with email: " + user);
      // add tenant to house
      House.findByIdAndUpdate(req.params.houseId, {
        $push: { house_tenants: user }
      })
        .then(house => {
          console.log("updated house");
          console.log(house.house_tenants);

          // TODO: create invitation notification

          // get houses list
          // res.json({ msg: "Updated successfully", house });
          House.find({ house_tenants: userId })
            .populate({
              path: "house_tenants",
              select: "email name",
              populate: { path: "approved_tenants", select: "email name" }
            })
            .sort({ active: -1, opened: -1 })
            .then(houses =>
              res.json({ msg: "Got houses successfully", houses })
            )
            .catch(err => res.status(404).json({ error: "No houses found" }));
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ error: "Unable to update the Database" });
        });
    })
    .catch(err => {
      console.log("can't find user with email " + email);
      res.status(400).json({ error: "User not found" });
    });
});

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
