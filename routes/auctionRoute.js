const express = require("express");
const router = express.Router();
const auction = require("../controler/auctionData");

router.get("/", auction);
module.exports = router;
