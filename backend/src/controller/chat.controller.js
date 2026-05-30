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

async function updateChat(req, res) {
  const { chatId } = req.params;
  const { title } = req.body;
  const user = req.user;

  try {
    const chat = await chatModel.findOneAndUpdate(
      { _id: chatId, user: user._id },
      { title },
      { new: true },
    );
    if (!chat) {
      return res.status(404).json({ message: "chat not found" });
    }
    res.status(200).json({
      message: `chat title updated to ${chat.title} successfully`,
    });
  } catch (err) {
    console.error("Error in updateChat:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteChat(req, res) {
  const { chatId } = req.params;
  const user = req.user;

  try {
    const chat = await chatModel.deleteOne({
      _id: chatId,
    });
    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteChat:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function autoTitleChat(req, res) {
  const { chatId } = req.params;
  const user = req.user;
  try {
    const chat = await chatModel.findOne({ _id: chatId, user: user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });

    const oldest = messages[0];

    let newTitle;
    if (!oldest) {
      newTitle = "Anonymous";
    } else {
      newTitle = oldest.content.split(" ").slice(0, 2).join(" ");
    }

    const updatedChat = await chatModel.findByIdAndUpdate(
      {
        _id: chatId,
      },
      {
        title: newTitle,
      },
      {
        new: true,
      },
    );
    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      message: "Chat title updated successfully",
      chat: {
        _id: updatedChat._id,
        title: updatedChat.title,
        lastActivity: updatedChat.lastActivity,
        user: updatedChat.user,
      },
    });
  } catch (err) {
    console.error("Error in autoTitleChat:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add getMessages to the module exports
module.exports = {
  createChat,
  getChats,
  getMessages, // New export
  updateChat, // New export
  deleteChat, // New export
  autoTitleChat, // New export
};
