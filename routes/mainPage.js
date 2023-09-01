const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  const userName = req?.user;
  const user = userName.toUpperCase();
  res.render("index", { user });
});

module.exports = router;
