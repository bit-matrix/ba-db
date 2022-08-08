import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { poolService } from "../services/poolService";

export class BitmatrixSocket {
  private io: Server;
  private static instance: BitmatrixSocket;

  currentSocket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.connect();
  }

  public static getInstance(server?: HttpServer): BitmatrixSocket {
    if (!BitmatrixSocket.instance) {
      if (server) BitmatrixSocket.instance = new BitmatrixSocket(server);
    }

    return BitmatrixSocket.instance;
  }

  private connect = () => {
    this.io.on("connection", async (socket) => {
      console.log("a user connected");

      const pools = await poolService.getPools();

      socket.emit("pools", pools);

      this.currentSocket = socket;

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  };
}
