const express = require("express");
const { body } = require("express-validator");

const handleErrorMessage = require("../middlewares/handleErrorMessage");
const UserController = require("../controllers/UserController");
const User = require("../models/User");

const router = express.Router();

router.post("/login", 
  [
    body("email").notEmpty(),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UserController.login
);
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UserController.register,
);

module.exports = router;
