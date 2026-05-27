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

module.exports = router;
