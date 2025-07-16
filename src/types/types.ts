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
}


