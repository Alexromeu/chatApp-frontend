import axiosInstance from "../utils/axios";


export const getChatRooms = (userId: string) =>
  axiosInstance.get(`/api/chatrooms?userId=${userId}`);

export const createChatRoom = (payload: { name: string; creator: string }) =>
  axiosInstance.post("/api/chatrooms", payload);

export const getAllRooms = () => {
  return axiosInstance.get("/api/chatrooms/all");
}

export const getRoomById = (roomId: string) => 
  axiosInstance.get(`/api/getRoom?roomId=${roomId}`); 

export const getFilteredRooms = (query: string) => 
  axiosInstance.get(`/api/filterRoom/?name=${query}`)
