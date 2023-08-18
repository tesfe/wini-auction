const User = require("../model/user");

const jwt = require("jsonwebtoken");
//this code has no use on this project so far just put for farther use incase i decide to use access token with headers
const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  try {
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.ACCESS_REFRESH, (err, decoded) => {
      if (err || user.userName !== decoded.userName) return res.sendStatus(401);
      const accessToken = jwt.sign(
        { userName: decoded.userName },
        process.env.ACCESS_SECRET,

        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log("this is the problem");
  }
};
module.exports = { refreshToken };
