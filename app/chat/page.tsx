'use client';
import React, { useState, useEffect, useCallback } from 'react';
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
  const user = useUser();

  const userId = user.user?.uid || '';

 

  const getMessages = useCallback(async (userId: string) => {
    try {
      const response = await fetchAllMessages(userId);
      setMessages(response.reverse());
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages.');
    }
  }, [userId]);

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (userId) {
      getMessages(userId);
    }
  }, [userId, getMessages]);
  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage: MessageObj = {
        userId: user.user?.uid || '',
        message,
        timestamp: new Date().toString(),
        role: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      setBotTyping(true);
      setLoading(true);

      try {
        if(!user.user?.uid) {
          return;
        }
        const chatBotResponse = await addMessageAndGetAIResponse(userMessage);
        console.log({chatBotResponse});

        setTimeout(() => {
          setBotTyping(false);
          setMessages((prevMessages) => [...prevMessages, chatBotResponse])
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
        setBotTyping(false);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-custom p-4">
      <Logout />
      <div className="w-full lg:max-w-4xl md:max-w-xl sm:max-w-md bg-purple-50 rounded-xl shadow-lg flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse space-y-reverse space-y-4">
          {botTyping && <TypingIndicator />}
          {[...messages].reverse().map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
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
