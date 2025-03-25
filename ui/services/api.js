import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const sendMessage = async (messages, prompt) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat`, {
      messages,
      prompt
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};