const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  console.log("Auth Middleware: req.cookies ->", req.cookies); // ADD THIS LINE

  const { token } = req.cookies;

  if (!token) {
    console.log("Auth Middleware: No token found!"); // ADD THIS LINE
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth Middleware: Decoded token ->", decoded); // ADD THIS LINE

    const user = await userModel.findById(decoded.id);
    console.log("Auth Middleware: User found ->", user ? user.email : "none"); // ADD THIS LINE

    if (!user) {
      console.log("Auth Middleware: User not found from token!"); // ADD THIS LINE
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Middleware: JWT verification error ->", err.message); // ADD THIS LINE
    res.status(401).json({ message: "Unauthorized" });
  }
}

// ... (rest of the file)

async function getUserProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({
    userName: req.user.fullName.firstName + " " + req.user.fullName.lastName,
    email: req.user.email,
  });
}

module.exports = {
  authUser,
  getUserProfile,
};
