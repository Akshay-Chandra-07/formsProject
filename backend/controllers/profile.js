const Users = require("../models/users");
const bcrypt = require("bcrypt");
const Files = require("../models/files");

exports.getUser = async (req, res, next) => {
  try {
    user = await Users.query()
      .select("name", "id", "email", "username", "role", "user_picture")
      .findById(req.userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updatePicture = async (req, res, next) => {
  try {
    newProfile = await Users.query().patchAndFetchById(req.userId, {
      user_picture: `http://localhost:5000/uploads/${req.files[0].filename}`,
    });
    return res.status(201).json(newProfile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error updating picture" });
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
exports.updatePassword = async (req, res, next) => {
  getCurDetails = await Users.query().findById(req.userId);

  const { oldPassword, newPassword } = req.body;
  bool = await bcrypt.compare(oldPassword, getCurDetails.password);
  if (!bool) {
    getCurDetails.msg = "Incorrect password";
    return res.status(200).json(getCurDetails);
  } else {
    newHashPass = await bcrypt.hash(newPassword, 10);
  }
  try {
    newUser = await Users.query()
      .findById(req.userId)
      .patchAndFetchById(req.userId, { password: newHashPass });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Internal Error" });
  }
};

exports.updateNameEmail = async (req, res, next) => {
  try {
    console.log(req.body);

    await Users.query()
      .findById(req.body.id)
      .patch({ name: req.body.name, email: req.body.email });
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Internal Error" });
  }
};

exports.uploadFile = async (req, res, next) => {
  const files = req.files;
  console.log(files);
  const id = req.userId;
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
    await Files.query().insertGraph(filesArray);
    return res.status(201).json({ msg: "files inserted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

exports.getFiles = async (req, res, next) => {
  try {
    console.log(req.userId);
    const files = await Files.query().where("user_id", "=", req.userId);
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
