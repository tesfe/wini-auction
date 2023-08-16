const mongoose = require("mongoose");
const Schema = mongoose.schema;

const schemaUse = new mongoose.Schema({
  name: { type: String, required: true },

  url: { type: String, required: true },
  prices: { type: Number },
  bidOpen: { type: Boolean, default: false },
  bid: { type: Number },
  userName: { type: String },
});

module.exports = mongoose.model("auction", schemaUse);
