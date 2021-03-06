const mongoose = require("mongoose");
//Sign up
const chatSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        username: {
          type: String,
        },
        last_online: {
          type: Date,
          default: Date.now()
        },
      },
    ],
    messages: [
      {
        sender: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },

  { collection: "chats" }
);

const model = mongoose.model("ChatSchema", chatSchema);

module.exports = model;
