import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import type { Message } from "../types/types"

export const useMessages = (roomId: string, userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
 console.log(userId)
  useEffect(() => {
    axiosInstance
      .get('/messages', {
        params: { roomId, userId } //userId is null, in params only have roomId
      })
      .then(res => setMessages(res.data))
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
     
  }, [roomId, userId]);

  return { messages, setMessages };
};
