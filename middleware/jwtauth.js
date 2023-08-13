const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const jwtVery = (req, res, next) => {
  const authHeader = req.header["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded.userName;
    next();
  });
};
module.exports = jwtVery;
