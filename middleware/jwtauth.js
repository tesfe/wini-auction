const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const jwtVery = (req, res, next) => {
//   const authHeader = req.header["authorization"];

//   if (!authHeader) return res.sendStatus(401);
//   console.log(authHeader);
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(401);
//     req.user = decoded.userName;
//     next();
//   });
// };
const jwtRefresh = (req, res, next) => {
  const cookies = req?.cookies;

  console.log(cookies);
  if (!cookies) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.ACCESS_REFRESH, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded.userName;
    next();
  });
};

module.exports = jwtRefresh;
