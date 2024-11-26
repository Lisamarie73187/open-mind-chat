'use client';
import React, { useState, useEffect } from 'react';
import { firstWelcomeChat } from '../api/botSystemRole';
import Logout from '../components/Logout';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { useUser } from '../context/userContext';

interface MessageObj {
  userId?: string;
  message: string;
  timestamp: string;
  role: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [botTyping, setBotTyping] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    const fetchInitialResponse = async () => {
      setLoading(true);
      try {
        setMessages([
          {
            message: firstWelcomeChat,
            timestamp: new Date().toString(),
            role: 'therapist',
          },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialResponse();
  }, []);

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage: MessageObj = {
        userId: user.user?.uid,
        message,
        timestamp: new Date().toString(),
        role: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      setBotTyping(true);
      setLoading(true);

      try {
        const responseMessage = await getAIResponse(userMessage);

        setTimeout(() => {
          setBotTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: responseMessage,
              timestamp: new Date().toString(),
              role: 'therapist',
            },
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
        setBotTyping(false);
        setLoading(false);
      }
    }
  };

  const getAIResponse = async (userMessageObj: MessageObj) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessageObj),
    });

    const data = await response.json();
    return data.response;
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
