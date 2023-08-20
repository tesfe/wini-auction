const express = require("express");
const router = express.Router();
const { ItemByName, allAuction } = require("../controler/auctionData");

router.route("/").get(allAuction).post(ItemByName);

module.exports = router;
