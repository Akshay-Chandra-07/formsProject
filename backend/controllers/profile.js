const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  try {
    user = await Users.query()
      .select("name", "id", "email", "username")
      .findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateDetails = async (req, res) => {
  getCurDetails = await Users.query().findById(req.params.id);

  const { name, email, oldPassword, newPassword } = req.body;
  const availData = {}; // to store available data to update
  

  // check which data is available to update
  if (name) availData.name = name;
  if (email) availData.email = email;
  if (oldPassword && newPassword) {
    console.log(oldPassword, newPassword);
    bool = await bcrypt.compare(oldPassword, getCurDetails.password);
    console.log(bool);
    if (!bool) {
      getCurDetails.msg = "Incorrect password";
      return res.status(200).json(getCurDetails);
    } else {
      newHashPass = await bcrypt.hash(newPassword, 10);
      availData.password = newHashPass;
    }
  }
  try {
    if (availData.name || availData.email || availData.password) {
      console.log(availData);
      newUser = await Users.query()
        .findById(req.params.id)
        .patchAndFetchById(req.params.id, availData);
      return res.status(201).json(newUser);
    }
    getCurDetails.msg = "No data to update";
    return res.status(200).json(getCurDetails);
  } catch (error) {
    next(error);
  }
};
