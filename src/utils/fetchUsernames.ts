import axiosInstance from "./axios";

export const fetchUsernames = async (userIds: string[]): Promise<string[]> => {
  if (!Array.isArray(userIds)) return [];

    const responses = await Promise.all(
      userIds.map(async (id) => {
        try {
          const { data } = await axiosInstance.get(`/api/user/${id}`);
          
          return data.username;

        } catch {
          return id; 
        }
      })
    );

    return responses;
  };