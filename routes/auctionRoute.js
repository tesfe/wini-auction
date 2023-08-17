const express = require("express");
const router = express.Router();
const auction = require("../controler/auctionData");

router.post("/", auction);
module.exports = router;
