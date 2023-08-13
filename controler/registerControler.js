require("dotenv").config();
const fsPromise = require("fs").promises;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userDb = require("../model/user");
const path = require("path");
// const userDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const handleNewuser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "enter a valid password and user name" });
  }
  // const dublicate = userDB.users.find((person) => person.userName === user);
  const dublicate = await userDb.findOne({ userName: user }).exec();
  if (dublicate) {
    return res.status(409).json("conflict");
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // const newUser = { userName: user, password: hashedPwd };

    // userDB.setUsers([...userDB.users, newUser]);
    // await fsPromise.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(userDB.users)
    // );
    // res.write(JSON.stringify(userDB.users));
    // res.end();
    /*creating a doc data*/
    const newUser = await userDb.create({
      userName: user,
      password: hashedPwd,
    });
    console.log("newUser is created");
    console.log(newUser);
    res.json({ message: "suucessful" });
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
  }
};
module.exports = { handleNewuser };
