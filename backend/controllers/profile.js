const Users = require("../models/users");
const bcrypt = require("bcrypt");
const Files = require("../models/files");

exports.getUser = async (req, res, next) => {
  try {
    user = await Users.query()
      .select("name", "id", "email", "username", "role")
      .findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await Users.query().deleteById(req.params.id);
    // allUsers = await Users.query().select("name", "id", "email", "username","role")
    return res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    next(error);
  }
};
exports.updateDetails = async (req, res, next) => {
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

exports.uploadFile = async (req, res, next) => {
  const files = req.files;
  const id = req.params.id;
  console.log(files, id);
  const filesArray = [];
  files.forEach((file) => {
    filesArray.push({
      user_id: id,
      filename: file.originalname,
      directory: `http://localhost:5000/uploads/${file.filename}`,
    });
  });
  try {
    await Files.query().insert(filesArray);
    return res.status(201).json({ msg: "files inserted" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Error" });
  }
};

exports.getFiles = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const files = await Files.query().where("user_id", "=", req.params.id);
    console.log(files);
    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Error" });
  }
};

exports.deleteFileById = async (req, res) => {
  try {
    await Files.query().delete().where("id", "=", req.query.fileId);
    res.status(200).json({ msg: "File deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal error" });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    files = await Files.query();
    console.log(files);
    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal error" });
  }
};
