const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const dashboard = require("../controllers/dashboard");
const profile = require("../controllers/profile");
const tokenValidator = require("../middlewares/tokenValidator");

router.post("/signup", auth.register);
router.post("/login", auth.login);

module.exports = router;
