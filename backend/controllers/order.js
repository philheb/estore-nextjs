const User = require("../models/user");
require("dotenv").config();

exports.create = (req, res) => {
  console.log("Create order: ", req.body);
};
