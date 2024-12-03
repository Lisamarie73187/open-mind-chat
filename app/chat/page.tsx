'use client';
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Logout from '../components/Logout';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { useUser } from '../context/userContext';
import { addMessageAndGetAIResponse, fetchAllMessages } from '../services/chat';

interface MessageObj {
  userId: string;
  message: string;
  timestamp: string;
  role: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [botTyping, setBotTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [messageId, setMessageId] = useState<string | undefined>(undefined);

  const user = useUser();

  const userId = user.user?.uid || '';

  const loadMessages = useCallback(
    async (userId: string, lastId?: string) => {
      try {
        const response = await fetchAllMessages(userId, lastId);
        if (response.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...response]);
          setMessageId(response[response.length - 1]._id);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages.');
      }
    },
    [userId],
  );

  const loadMoreMessages = useCallback(async () => {
    setLoadingMore(true);
    await loadMessages(userId, messageId);
    setLoadingMore(false);
  }, [userId, loadMessages, messageId]);

  const handleMessageInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [],
  );

  const sendMessage = useCallback(async () => {
    if (!message.trim() || !userId) return;

    const userMessage: MessageObj = {
      userId,
      message,
      timestamp: new Date().toISOString(),
      role: 'user',
    };
    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setMessage('');

    setBotTyping(true);
    setLoading(true);

    try {
      const chatBotResponse = await addMessageAndGetAIResponse(userMessage);
      setMessages((prevMessages) => [chatBotResponse, ...prevMessages]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message.');
    } finally {
      setBotTyping(false);
      setLoading(false);
    }
  }, [message, userId]);

  useEffect(() => {
    if (userId) {
      loadMessages(userId);
    }
  }, [userId, loadMessages]);

  const renderedMessages = useMemo(
    () =>
      messages.map((msg, index) => <MessageBubble key={index} message={msg} />),
    [messages],
  );

  return (
    <div className="min-h-screen flex justify-center bg-custom p-4">
      <Logout />
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-full lg:max-w-4xl md:max-w-xl sm:max-w-md bg-purple-50 rounded-xl shadow-lg flex flex-col h-[80vh]">
     
        <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse space-y-reverse space-y-4">
          
          {botTyping && <TypingIndicator />}
          {renderedMessages}
          <div className="flex flex-col items-center p-4">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium py-2 px-4 rounded"
            onClick={loadMoreMessages}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More Messages'}
          </button>
        </div>
        </div>
        <ChatInput
          message={message}
          onMessageChange={handleMessageInput}
          onSendMessage={sendMessage}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Chat;
