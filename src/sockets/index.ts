import { io, Socket } from "socket.io-client";
const URL = "https://chatapp-frontend-d0m4.onrender.com";

export const socket: Socket = io(URL, {
  autoConnect: false,
  auth: {
    token: sessionStorage.getItem("authToken")
  }
});

