import { socket } from "./index";


export const emitUserOnline = (userId: string) => {
  socket.emit("userOnline", userId);
};

export const onOnlineUsersUpdate = (handler: (roomId: string, users: string[]) => void) => {
  socket.on("onlineUsers", ({ roomId, users }) => {
    handler(roomId, users)
  });
};

export const emitTyping = (roomId: string, senderId: string) => {
  socket.emit("typing", { roomId, senderId });
};

export const emitStopTyping = (roomId: string, senderId: string) => {
  socket.emit("stopTyping", { roomId, senderId });
};

export const listenForTyping = (
  onTyping: (payload: {roomId: string, senderId: string}) => void,
  onStopTyping: (payload: {roomId: string, senderId: string}) => void

) => {
  socket.on("typing", onTyping);
  socket.on("stopTyping", onStopTyping);
};

export const listenForOnlineUsers = (
  onUserOnline: (userId: string) => void,
) => {
  socket.on("userOnline", onUserOnline);
};

