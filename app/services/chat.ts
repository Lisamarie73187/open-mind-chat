import axios from 'axios';

interface ChatAIResponse {
  message: string;
}

interface Message {
  userId: string;
  message: string;
  timestamp: string;
  role: string;
  _id?: string;
}

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getChatAIResponse = async (
  input: string,
): Promise<ChatAIResponse> => {
  try {
    const response = await apiClient.post<ChatAIResponse>('/chatAI', input);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error sending message to ChatAI:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to send message');
  }
};

export const fetchAllMessages = async (
  userId: string,
  lastId?: string,
  limit = 10,
): Promise<Message[]> => {
  try {
    const queryParams = new URLSearchParams({
      userId,
      limit: limit.toString(),
    });

    if (lastId) {
      queryParams.append('lastId', lastId);
    }

    const response = await apiClient.get<{ messages: Message[] }>(
      `/messages?${queryParams.toString()}`,
    );
    return response.data.messages;
  } catch (error: any) {
    console.error(
      'Error fetching messages:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to fetch messages');
  }
};

export const addMessageAndGetAIResponse = async (
  message: Message,
): Promise<Message> => {
  try {
    const response = await apiClient.post<{ chatBotMessage: Message }>(
      `/messages?userId=${message.userId}`,
      message,
    );
    return response.data.chatBotMessage;
  } catch (error: any) {
    console.error(
      'Error adding message:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to add message');
  }
};
