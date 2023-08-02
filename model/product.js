const mongoose = require("mongoose");
const schema = mongoose.schema;

const schemaBlog = new schema({
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
