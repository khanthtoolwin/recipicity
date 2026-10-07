const createToken = require("../helpers/createToken");
const User = require("../models/User");

const UserController = {
  login: async (req, res) => {
    try {
      let {email, password} = req.body;
      let user = await User.login(email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token)
      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({msg: error.message})
    }
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token);
      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = UserController;
