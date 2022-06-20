import http from "http";
import express from "express";
import cors from "cors";
import { DATA_DIR, LISTEN_PORT } from "./env";

import poolRoutes from "./routes/poolRoutes";
import ctxRoutes from "./routes/ctxRoutes";
import ptxRoutes from "./routes/ptxRoutes";
import ptxCtxRoutes from "./routes/ptxCtxRoutes";
import configRoutes from "./routes/configRoutes";
import appSyncRoutes from "./routes/appSyncRoutes";
import { Server } from "socket.io";
import { appChecker } from "./appChecker";
import { PoolProvider } from "./providers/PoolProvider";
import { poolService } from "./services/poolService";

const onExit = async () => {
  console.log("BA DB Service stopped.");
};
process.on("exit", onExit);
process.on("SIGINT", () => {
  process.exit();
});

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", async (req, res, next) => {
  res.send("hello from ba-db");
});

app.use("/pools", poolRoutes);
app.use("/ctx", ctxRoutes);
app.use("/ptx", ptxRoutes);
app.use("/ptx-ctx", ptxCtxRoutes);
app.use("/config", configRoutes);
app.use("/appSync", appSyncRoutes);
// app.use("/clear", clearRoutes);

// test uri
setInterval(async () => {
  const pools = await poolService.getPools();

  io.emit("pools", pools);
}, 5000);

appChecker().then(() => {
  server.listen(LISTEN_PORT, () => {
    console.log("BA DB Service is using DATA_DIR:" + DATA_DIR);
    console.log("BA DB Service started on *:" + LISTEN_PORT);
  });
});
