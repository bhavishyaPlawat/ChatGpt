import axios from "axios";

// Base configuration for Axios
const API_URL = "http://localhost:3000/api/chat";

// Create an axios instance to handle credentials automatically
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/auth
});

export const chatService = {
  // Fetch all chats for the user
  getAllChats: async () => {
    try {
      // Calls GET /api/chat/getChats
      const response = await apiClient.get("/getChats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      throw error;
    }
  },

  // Create a new chat room
  createChat: async (title) => {
    try {
      const response = await apiClient.post("/", { title });
      return response.data;
    } catch (error) {
      console.error("Failed to create chat:", error);
      throw error;
    }
  },

  //fetch all message of that chat
  getMessages: async (chatId) => {
    try {
      const response = await apiClient.get(`/${chatId}/messages`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      throw error;
    }
  },
};
