require("dotenv").config();
const userDb = require("../model/user");

const { registerValidator } = require("../validators/userValidator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const setting = async (req, res) => {
  try {
    const user = req?.user;
    const loggedUser = await userDb.findOne({ userName: user }).exec();

    const { userName, firstName, lastName, email, phone, adress } = loggedUser;
    const data = { userName, firstName, lastName, email, phone, adress };
    console.log(data);

    res.render("setting", { data, message: undefined });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  try {
    let { userName, firstName, lastName, email, phone, adress, password } =
      req?.body;
    console.log(req.body);
    const user = req?.user;
    const loggedUser = await userDb.findOne({ userName: user }).exec();

    if (!password) {
      const { userName, firstName, lastName, email, phone, adress } =
        loggedUser;
      const data = { userName, firstName, lastName, email, phone, adress };
      return res.render("setting", { data, message: "enter your password" });
    }

    const { error } = registerValidator({
      user: userName,
      pwd: password,
      firstName,
      lastName,
      email,
      phone,
      adress,
    });
    if (error) {
      const { userName, firstName, lastName, email, phone, adress } =
        loggedUser;
      const data = { userName, firstName, lastName, email, phone, adress };

      return res.render("setting", {
        data,
        message: "enter valid user information",
      });
    }
    console.log(loggedUser.password);
    const match = await bcrypt.compare(password, loggedUser.password);
    console.log(match);
    if (!match) {
      const { userName, firstName, lastName, email, phone, adress } =
        loggedUser;
      const data = { userName, firstName, lastName, email, phone, adress };
      return res.render("setting", {
        data,
        message: "enter valid  password",
      });
    }

    await userDb.updateOne(
      { userName },
      {
        $set: { userName, firstName, lastName, email, phone, adress },
      }
    );

    const updated = await userDb.findOne({ userName }).exec();
    console.log(updated);
    try {
      const { userName, firstName, lastName, email, phone, adress } = updated;
      const data = { userName, firstName, lastName, email, phone, adress };
      return res.render("setting", {
        data,
        message: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setting, editProfile };
