const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controler/refreshToken");

router.get("/", refreshToken);
module.exports = router;
