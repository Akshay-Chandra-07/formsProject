const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile");
const tokenValidator = require("../middlewares/tokenValidator");
const upload = require("../util/multer");

router.get("/allFiles", tokenValidator, profile.getAllFiles);
router.delete("/files/delete", tokenValidator, profile.deleteFileById);
router.post(
  "/upload",
  tokenValidator,
  upload.array("files"),
  profile.uploadFile,
);
router.get("/files", tokenValidator, profile.getFiles);
router.delete("/:id/delete", tokenValidator, profile.deleteUser);
router.put("/update-password", tokenValidator, profile.updatePassword);
router.put("/update-name-email", tokenValidator, profile.updateNameEmail);
router.post(
  "/picture-update",
  tokenValidator,
  upload.array("picture"),
  profile.updatePicture,
);

router.get("/single-user", tokenValidator, profile.getUser);

module.exports = router;
