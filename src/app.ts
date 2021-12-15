import http from "http";
import express from "express";
import { POOLS } from "./data";

const DATA_DIR: string = process.env.DATA_DIR || "/ba-db/data-dir/";
const LISTEN_PORT: number = Number(process.env.PORT || 8899);

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

app.get("/", async (req, res) => {
  res.send("hello from ba-db");
});

app.get("/pools", async (req, res) => {
  const result = POOLS;
  res.send(result);
});

server.listen(LISTEN_PORT, () => {
  console.log("BA DB Service is using DATA_DIR:" + DATA_DIR);
  console.log("BA DB Service started on *:" + LISTEN_PORT);
});
