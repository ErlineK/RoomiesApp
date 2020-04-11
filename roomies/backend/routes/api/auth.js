const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../helpers/auth");

// User Model
import User from "../../models/User";

/**
 * @route   POST api/auth
 * @desc    Auth user
 * @access  Public
 */

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password" });
  }

  // get user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      jwt.sign(
        {
          id: user._id
        },
        config.get("JWT_SECRET"),
        { expiresIn: 60 * 60 * 1000 },
        (err, token) => {
          if (err) throw err;

          res.json({
            msg: "User was added successfully",
            token,
            user: user
          });
        }
      );
    });
  });
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

export default router;
