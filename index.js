const cors = require("cors");

require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const app = express();
app.use(cors());
const path = require("path");

const connectDb = require("./db");
const PORT = process.env.PORT;
//this for all coming data  converts to json
app.use(express.json());
//connecting to mongodb
connectDb();

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.all("*", (req, res) => {
  res.sendStatus(404);
});

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log("connected to server");
  });
});
