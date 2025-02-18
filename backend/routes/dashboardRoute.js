const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const tokenValidator = require("../middlewares/tokenValidator");

router.get("/home", tokenValidator, dashboard.users);
router.get("/download", dashboard.downloadExcel)

module.exports = router;
