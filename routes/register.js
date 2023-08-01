const express = require("express");
const router = express.Router();
const checkin = require("../controler/registerControler");

router.post("/", checkin.handleNewuser);
module.exports = router;
