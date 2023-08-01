const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const loginUser = async (req, res) => {
  const { user, pwd } = req.body;

  const foundUser = userDB.users.find((person) => person.userName === user);
  if (!foundUser) return res.sendStatus(401); //unathorized
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.status(200).json(`username ${user}is logged in`);
  } else res.sendStatus(401);
};
module.exports = { loginUser };
