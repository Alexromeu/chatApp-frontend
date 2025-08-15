import axiosInstance from "../utils/axios";


export const getChatRooms = (userId: string) =>
  axiosInstance.get(`/chatrooms?userId=${userId}`);

export const createChatRoom = (payload: { name: string; creator: string }) =>
  axiosInstance.post("/chatrooms", payload);

export const getAllRooms = () => {
  return axiosInstance.get("/chatrooms/all");
}

export const getRoomById = (roomId: string) => 
  axiosInstance.get(`/getRoom?roomId=${roomId}`); 

export const getFilteredRooms = (query: string) => 
  axiosInstance.get(`/filterRoom/?name=${query}`)
