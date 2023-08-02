const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

const pwd = process.env.PW_D;

const uri = db_url.replace("<password>", pwd);

const connectdb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("db connection:", error);
  }
};
module.exports = connectdb;
