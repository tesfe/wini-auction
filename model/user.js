const mongoose = require("mongoose");
const Schema = mongoose.schema;

const schemaUse = new mongoose.Schema({
  userName: { type: String, required: true },

  password: { type: String, required: true },
  refreshToken: String,
});

module.exports = mongoose.model("user", schemaUse);
