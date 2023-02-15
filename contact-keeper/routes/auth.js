const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//@Route    GET    api/auth
//@desc    Get a logggedin user
//@access    Private
router.get("/", auth, async (req, res) => {
  try {
    const uid = req.user.id;
    const user = await User.findById(uid).select("-password");
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@Route    POST    api/auth
//@desc    authenticate user and get token
//@access    Public
router.post(
  "/",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "Enter password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 43200 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
