const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  regionId: {
    type: String,
    required: [true, "Region is required"]
  },
  userId: {
      type: String,
      required: [true, "User ID is required"]
  },
  message: {
      type: String,
      required: [true, "Message is required"]
  },
  date: {
      type: Date,
      required: [true, "Date is required"]
  },
  chatName: {
      type: String,
      required: [true, "chat name is required"]
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;