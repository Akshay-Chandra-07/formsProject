const Users = require("../models/users");

exports.users = async (req, res) => {
  try {
    const users = await Users.query().select(
      "id",
      "name",
      "email",
      "username",
      "role"
    );
    res.status(200).json(users);
  } catch (error) {
    next(error); //global error handler
  }
};
