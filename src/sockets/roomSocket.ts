import { socket } from "./index";

export const joinRoom = (roomId: string, userId: string) => {
  socket.emit("joinRoom", { roomId , userId });
};

export const leaveRoom = (roomId: string, userId: string) => {
  socket.emit("leaveRoom", {roomId, userId });
};

// export const listenForUserJoined = (onUserJoin: (roomId: string, userId: string) => void) => {
//   socket.on("userJoined", onUserJoin);
// };

// export const listenForUserLeft = (onUserLeave: (roomId: string, userId: string) => void) => {
//   socket.on("userLeft", onUserLeave);
// };
