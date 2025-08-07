import { socket } from "../sockets";

export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  status?: "online" | "offline";
};


export type ChatRoom = {
  id: string;
  name: string;
  participants: User[];
  messages: Message[];
};


export type Message = MessagePayload & {
  id: string;
};


export type MessagePayload = {
  senderId: string;
  roomId: string;
  content: string;
  timestamp: number; 
  sendername:string;
}

export type TokenPayload = {
  userId: string;
  username: string;
};

export type AuthContextType = {
  token: string | null;
  userId: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};


export type SocketContextType = {
  socket: typeof socket;
  userId: string | null;
  username: string | null;
  roomId: string;
  roomname: string | null;
};