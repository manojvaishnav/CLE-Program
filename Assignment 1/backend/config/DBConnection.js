const mongoose = require("mongoose");

const connection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    })
    .then(() => {
      console.log("Databse connected");
    })
    .catch((err) => {
      console.log(`Database connection errror : ${err}`);
    });
};

module.exports = connection;
