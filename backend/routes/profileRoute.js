const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");
const tokenValidator = require("../middlewares/tokenValidator");
const upload = require("../util/multer");

router.get("/:id/allFiles", profile.getAllFiles);
router.delete("/:id/files/delete", profile.deleteFileById);
router.post("/:id/upload", upload.array("files"), profile.uploadFile);
router.get("/:id/files", profile.getFiles);
router.delete("/:id/delete", profile.deleteUser);
router.put("/:id/update", profile.updateDetails);
router.get("/:id", tokenValidator, profile.getUser);

module.exports = router;
