import axios from 'axios';

interface ChatAIResponse {
  message: string;
}

interface Message {
    userId: string;
    message: string;
    timestamp: string;
    role: string;
  }
  

export const getChatAIResponse = async (input: string): Promise<ChatAIResponse> => {
  try {
    const response = await axios.post<ChatAIResponse>('/api/chatAI', input, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message to ChatAI:', error);
    throw new Error('Failed to send message');
  }
};


  export const fetchAllMessages = async (userId?: string): Promise<Message[]> => {
    console.log({userId});
    if (!userId) {
      throw new Error('User ID is required');
    }
    try {
      const response = await axios.get<{ messages: Message[] }>(`/api/messages/${userId}`);
      console.log({response});
      return response.data.messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  };

  export const addMessageAndGetAIResponse = async (message: Message): Promise<any> => {
    try {
      const response = await axios.post(`/api/messages/${message.userId}`, message, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log({response});
      return response.data.chatBotObj;
    } catch (error) {
      console.error('Error adding message:', error);
      throw new Error('Failed to add message');
    }
  }
