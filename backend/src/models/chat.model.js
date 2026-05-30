const mongoose = require("mongoose");
const messageModel = require("./message.model");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

chatSchema.pre(
  "deleteOne",
  {
    document: false,
    query: true,
  },
  async function (next) {
    console.log(
      "Deleting chat and associated messages for chatId:",
      this.getQuery()._id,
    );
    await messageModel.deleteMany({ chat: this.getQuery()._id });
    next();
  },
);

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
