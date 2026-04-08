import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app, { connectDatabase } from "./server.js";

const port = process.env.PORT || 4174;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  await connectDatabase();
  server.listen(port, () => {
    console.log(`Voltinex backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
