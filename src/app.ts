import http from "http";
import express from "express";
import cors from "cors";
import { DATA_DIR, LISTEN_PORT } from "./env";

import poolRoutes from "./routes/poolRoutes";
import ctxRoutes from "./routes/ctxRoutes";
import ptxRoutes from "./routes/ptxRoutes";
import ptxCtxRoutes from "./routes/ptxCtxRoutes";
import appSyncRoutes from "./routes/appSyncRoutes";
import { Server } from "socket.io";
import { appChecker } from "./appChecker";
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  const pools = await poolService.getPools();

  socket.emit("pools", pools);

  socket.on("checkTxStatus", (txIds) => {
    const txIdsArr = txIds.split(",");

    enum TX_STATUS {
      PENDING,
      WAITING_PTX,
      WAITING_PTX_CONFIRM,
      SUCCESS,
      FAILED,
    }

    const txStatuses = txIdsArr.map((tx: any) => {
      return {
        txId: tx,
        poolTxId: "",
        status: TX_STATUS.PENDING,
        timestamp: Math.floor(Date.now() / 1000),
      };
    });

    socket.emit("checkTxStatusResponse", txStatuses);
  });

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
app.use("/appSync", appSyncRoutes);
// app.use("/clear", clearRoutes);

appChecker().then(() => {
  server.listen(LISTEN_PORT, () => {
    console.log("BA DB Service is using DATA_DIR:" + DATA_DIR);
    console.log("BA DB Service started on *:" + LISTEN_PORT);
  });
});
