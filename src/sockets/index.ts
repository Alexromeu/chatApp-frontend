import { io, Socket } from "socket.io-client";
const URL = "http://192.168.1.70:3000";

export const socket: Socket = io(URL, {
  autoConnect: false,
  auth: {
    token: sessionStorage.getItem("authToken")
  }
});

