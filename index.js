const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());

app.use(express.json());
//this for all coming data  converts to json

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("connected to server");
});
