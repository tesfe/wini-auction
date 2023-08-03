// const fsPromise = require("fs").promises;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbUser = require("../model/product");
// const path = require("path");
// const userDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const handleNewuser = async (req, res) => {
  const { user, pwd } = req.body;
  // if (!user || !pwd) {
  //   return res
  //     .sendStatus(400)
  //     .json({ message: "enter a valid password and user name" });
  // }
  const dublicate = await dbUser.findOne({ userName: user }).exec();
  if (dublicate) {
    return res.sendStatus(409);
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
    const newUser = await dbUser.create({
      userName: user,
      password: hashedPwd,
    });
    console.log("newUser is created");
    console.log(newUser);
    res.json({ message: "suucessful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { handleNewuser };
