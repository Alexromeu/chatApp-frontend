import { io, Socket } from "socket.io-client";
const URL = "https://chatapp-backend-zo7f.onrender.com";

export const socket: Socket = io(URL, {
  autoConnect: false,
  auth: {
    token: sessionStorage.getItem("authToken")
  }
});

