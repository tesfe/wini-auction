const express = require("express");
const router = express.Router();
const { handleNewuser } = require("../controler/registerControler");

router.post("/", handleNewuser);

module.exports = router;
