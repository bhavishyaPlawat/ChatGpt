const env = require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");
const { initSocketServer } = require("./src/sockets/socket.service");
const httpServer = require("http").createServer(app);

connectDb();
initSocketServer(httpServer);

app.get("/health", (req, res) => {
  console.log("🔍 /health endpoint hit");
  res.json({
    success: true,
    message: "Digital Saathi API is running",
    env: env.NODE_ENV,
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
