const express = require("express");
const router = express.Router();
const path = require("path");
const { loginUser } = require("../controler/login");

router.post("/", loginUser);

module.exports = router;
