const express = require("express");
const router = express.Router();

// Load House model
const House = require("../../models/House");

/**
 * @route       GET api/houses/test
 * @description tests houses route
 * @access      Public
 */
router.get("/test", (req, res) => res.send("house route testing!"));

/**
 * @route       GET api/houses/
 * @description Get all houses
 * @access      Private
 */
router.get("/", (req, res) => {
  House.find()
    .sort({ dueDate: -1 })
    .then(houses => res.json(houses))
    .catch(err => res.status(404).json({ noHousesfound: "No houses found" }));
});

/**
 * @route       GET api/houses
 * @description Get all houses for userId
 * @access      Public
 */
router.get("/:userId", (req, res) => {
  House.find({ tenants: req.params.userId })
    .sort({ active: +1 })
    .then(houses => res.json(houses))
    .catch(err => res.status(404).json({ noHousesfound: "No houses found" }));
});

/**
 * @route       GET api/houses/:id
 * @description Get single house by id
 * @access      Public
 */
router.get("/:id", (req, res) => {
  House.findById(req.params.id)
    .then(house => res.json(house))
    .catch(err => res.status(404).json({ noHousesfound: "No house found" }));
});

/**
 * @route       POST api/houses
 * @description add/save house
 * @access      Public
 */
router.post("/", (req, res) => {
  House.create(req.body)
    .then(house =>
      // TODO: set all other houses of that user to active: false
      res.json({ msg: "House added successfully", house })
    )
    .catch(err => res.status(400).json({ error: "Unable to add this house" }));
});

/**
 * @route       PUT api/houses/:id
 * @description Update house
 * @access      Public
 */
router.put("/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body)
    .then(house => res.json({ msg: "Updated successfully", house }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

/**
 * @route       PUT api/houses/remove/:id
 * @description Remove house for tenant. If no tenants left in house - delete house
 * @access      Public
 */

//  TODO: set that
// router.put("/reamove/:id", (req, res) => {
//   House.findByIdAndUpdate(req.params.id, req.body)
//     .then(house => res.json({ msg: "Updated successfully", house }))
//     .catch(err =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

// TODO: add tenants to house

/**
 * @route       DELETE api/houses/:id
 * @description Delete house by id
 * @access      Private
 */
router.delete("/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, req.body)
    .then(house => res.json({ mgs: "House entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such a house" }));
});

module.exports = router;
