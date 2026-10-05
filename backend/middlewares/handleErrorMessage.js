let { validationResult } = require("express-validator");

const handleErrorMessage = (req, res, next) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.mapped() });
  }
  next();
};

module.exports = handleErrorMessage;
