const jwt = require("jsonwebtoken");
let maxAge = 3 * 24 * 60 * 60;  // 3 days lifespan
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports = createToken;
