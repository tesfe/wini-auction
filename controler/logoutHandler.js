const userDb = require("../model/user");

const logoutHandler = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await userDb.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.status(204).json(foundUser);
    }
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { logoutHandler };
