require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const PORT = process.env.PORT;
app.use(cors());
const path = require("path");
const jwtAuth = require("./middleware/jwtauth");
const connectDb = require("./db");
const cookieParse = require("cookie-parser");
//this for all coming data  converts to json
app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParse());
app.use(express.static(path.join(__dirname, "public")));
//connecting to mongodb
connectDb();

const mongoose = require("mongoose");
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refreshin"));
app.use("/logout", require("./routes/logout"));
//app.use(jwtAuth);
app.use("/products", require("./routes/mainPage"));
app.use("/product", require("./routes/productRoute"));
app.all("*", (req, res) => {
  res.sendStatus(404);
});

mongoose.connection.once("open", () => {
  console.log("database connected");

  app.listen(PORT, () => {
    console.log("connected to server");
  });
});
