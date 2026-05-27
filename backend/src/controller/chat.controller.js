const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    user: user._id,
    title,
  });

  res.status(201).json({
    message: "Chat created successfully",
    chat: {
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    },
  });
}

async function getChats(req, res) {
  const user = req.user;
  const chats = await chatModel.find({ user: user._id });

  res.status(200).json({
    message: "Chat received succesfull",
    chats: chats.map((chat) => ({
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    })),
  });
}
// In controller/chat.controller.js

async function getMessages(req, res) {
  const { chatId } = req.params;
  const user = req.user;

  try {
    const chat = await chatModel.findOne({ _id: chatId, user: user._id });

    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found or unauthorized" });
    }

    // FIX: Changed 'sender' to 'role' to match message.model.js
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .select("role content createdAt");

    res.status(200).json({
      message: "Messages retrieved successfully",
      chatId: chat._id,
      messages: messages.map((msg) => ({
        _id: msg._id,
        role: msg.role, // FIX: specific to your model
        content: msg.content,
        createdAt: msg.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add getMessages to the module exports
module.exports = {
  createChat,
  getChats,
  getMessages, // New export
};
