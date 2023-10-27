const mongoose = require("mongoose");

const tablModel = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
  },
  status: {
    type:String,
    default:"Available"
  },
});

const table = new mongoose.model("table", tablModel);

module.exports = table;