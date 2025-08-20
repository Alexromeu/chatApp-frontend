import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import type { Message } from "../types/types"

export const useMessages = (roomId: string, userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
 
  useEffect(() => {

    if (!userId) return;

    axiosInstance
      .get('/messages', {
        params: { roomId, userId } 
      })
      .then(res => {
         console.log("useMessge : error : ",messages)
        setMessages(res.data)
      })
      .catch(error => {
        
        console.error('Error fetching messages:', error, userId);
      });
     
  
  }, [roomId, userId]);

  return { messages, setMessages };
};
