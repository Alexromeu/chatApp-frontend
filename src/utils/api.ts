import axiosInstance from "../utils/axios";


export const getChatRooms = (userId: string) =>
  axiosInstance.get(`/chatrooms?userId=${userId}`);

export const createChatRoom = (payload: { name: string; creator: string }) =>
  axiosInstance.post("/chatrooms", payload);

export const getAllRooms = () => {
  return axiosInstance.get("/chatrooms/all");
}