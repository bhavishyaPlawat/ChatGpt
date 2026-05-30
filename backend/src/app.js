const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const env = require("dotenv").config();
/* Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const userRoutes = require("./routes/user.routes");
const memoryRoutes = require("./routes/memory.routes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-gpt-26.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* using middlewares */
app.use(express.json());
app.use(cookieParser());

/* Using Routes */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/memory", memoryRoutes);

module.exports = app;
