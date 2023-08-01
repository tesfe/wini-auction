const fsPromise = require("fs").promises;
const bcrypt = require("bcrypt");
const path = require("path");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleNewuser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .sendStatus(400)
      .json({ message: "enter a valid password and user name" });
  }
  const dublicate = userDB.users.find((person) => person.userName === user);
  if (dublicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { userName: user, password: hashedPwd };

    userDB.setUsers([...userDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.write(JSON.stringify(userDB.users));
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { handleNewuser };
