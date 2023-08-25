const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userDb = require("../model/user");
const path = require("path");
const { userValidator } = require("../validators/userValidator");

const handleNewuser = async (req, res) => {
  const { user, pwd } = req.body;
  //i am only destructuring to get these values to simplify coding volume
  if (!user || !pwd) {
    return res
      .status(400)
      .render("logger", { message: "enter a valid password and user name" });
  }
  const { error } = userValidator({ user, pwd });
  if (error)
    return res.render("logger", {
      message: "enter valid username and password",
    });
  // const dublicate = userDB.users.find((person) => person.userName === user);
  const dublicate = await userDb.findOne({ userName: user }).exec();
  if (dublicate) {
    return res
      .status(409)
      .render("logger", { message: "this account is not authrozed" });
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = await userDb.create({
      userName: user,
      password: hashedPwd,
    });
    console.log("newUser is created");
    console.log(newUser);
    res.render("logger", {
      message: {
        succes:
          "thank you have successfully created account ,now login to your account",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
  }
};
module.exports = { handleNewuser };
