const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  regionId: {
    type: String,
    required: [true, "Region ID is required"]
  },
  region: {
    type: String,
    required: [true, "Region is required"]
  }
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
