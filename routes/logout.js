const { logoutHandler } = require("../controler/logoutHandler");
const express = require("express");
const router = express.Router();

router.get("/", logoutHandler);

module.exports = router;
