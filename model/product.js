const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaBlog = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// const exPort = mongoose.model("product", schemaBlog);
// module.exports = exPort;

module.exports = mongoose.model("product", schemaBlog);
