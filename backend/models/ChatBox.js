const mongoose = require("mongoose");

const chatboxSchema = mongoose.Schema({
  regionId: {
    type: String,
    required: [true, "Region is required"]
  },
  chatName: {
      type: String,
      required: [true, "Chat name is required"]
  },
});

const ChatBox = mongoose.model("ChatBox", chatboxSchema);

module.exports = ChatBox;