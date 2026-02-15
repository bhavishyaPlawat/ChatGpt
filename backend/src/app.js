const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

/* Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

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

module.exports = app;
