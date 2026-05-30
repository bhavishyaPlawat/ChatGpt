const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const memoryController = require("../controller/memory.controller");

router.get("/", authMiddleware.authUser, memoryController.getUserMemories);
router.delete("/", authMiddleware.authUser, memoryController.deleteMemory);

module.exports = router;
