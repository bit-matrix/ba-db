import http from "http";
import express from "express";
import { initialDatas } from "./initialDatas";
import { DATA_DIR, LISTEN_PORT } from "./env";

import poolRoutes from "./routes/poolRoutes";
import ctxRoutes from "./routes/ctxRoutes";
import ptxRoutes from "./routes/ptxRoutes";
import configRoutes from "./routes/configRoutes";
import clearRoutes from "./routes/clearRoutes";

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

const server = http.createServer(app);

app.get("/", async (req, res, next) => {
  res.send("hello from ba-db");
});

app.use("/pools", poolRoutes);
app.use("/ctx", ctxRoutes);
app.use("/ptx", ptxRoutes);
app.use("/config", configRoutes);
app.use("/clear", clearRoutes);

initialDatas().then(() => {
  server.listen(LISTEN_PORT, () => {
    console.log("BA DB Service is using DATA_DIR:" + DATA_DIR);
    console.log("BA DB Service started on *:" + LISTEN_PORT);
  });
});
