const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userDb = require("../model/user");
const path = require("path");
const { registerValidator } = require("../validators/userValidator");

const handleNewuser = async (req, res) => {
  const { user, firstName, lastName, pwd, email, adress, phone } = req.body;
  //i am only destructuring to get these values to simplify coding volume
  console.log(req.body);
  if (!user || !pwd) {
    return res
      .status(400)
      .render("logger", { message: "enter a valid password and user name" });
  }
  const { error } = registerValidator({
    user,
    pwd,
    firstName,
    lastName,
    email,
    phone,
    adress,
  });
  console.log(error);
  if (error)
    return res.render("logger", {
      message: "fill in  all required inputs ",
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
      adress,
      phone,
      email,
      firstName,
      lastName,
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
