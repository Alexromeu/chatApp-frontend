import { socket } from "./index";
import type { Message, MessagePayload } from "../types/types"


export const listenForChatMessages = (onMessage: (msg: Message) => void) => {
  socket.on("chatMessage", onMessage);
};

export const sendMessage = (message: MessagePayload) => {
  socket.emit("chatMessage", message);
};
