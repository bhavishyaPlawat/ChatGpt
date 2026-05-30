const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const chatController = require("../controller/chat.controller");

const router = express.Router();

/* POST /api/chat/ */
router.post("/", authMiddleware.authUser, chatController.createChat);

// GET /api/getChats
router.get("/getChats", authMiddleware.authUser, chatController.getChats);

// GET /api/chat/message
router.get(
  "/:chatId/messages",
  authMiddleware.authUser,
  chatController.getMessages,
);

// PUT /api/chat/:chatId
router.put("/:chatId", authMiddleware.authUser, chatController.updateChat);

//delete /api/chat/:chatId
router.delete("/:chatId", authMiddleware.authUser, chatController.deleteChat);

// POST /api/chat/:chatId/auto-title
router.post(
  "/:chatId/auto-title",
  authMiddleware.authUser,
  chatController.autoTitleChat,
);

module.exports = router;
