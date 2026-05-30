const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/me", authMiddleware.authUser, authMiddleware.getUserProfile);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
