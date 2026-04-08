import http from "http";
import { Server } from "socket.io";
import app, { connectDatabase } from "./server.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const port = process.env.PORT || 4174;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    socket.user = verifyToken(token);
    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
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
