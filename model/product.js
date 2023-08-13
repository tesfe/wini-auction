const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaBlog = new mongoose.Schema({
  color: [String],
  company: [String],
  name: String,
  prices: Number,
  url: String,
  category: [String],
});

// const YourModel = mongoose.model('YourModel', yourSchema);

// module.exports = YourModel;

// const exPort = mongoose.model("product", schemaBlog);
// module.exports = exPort;

module.exports = mongoose.model("product", schemaBlog);
