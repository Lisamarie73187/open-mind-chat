"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AvatarOne from "../assets/avatarOne.png";
import AvatarTwo from "../assets/avatarTwo.png";
import { firstWelcomeChat } from "../api/botSystemRole";

interface Message {
  message: string;
  timestamp: string;
  role: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialResponse = async () => {
      setLoading(true);
      try {
        setMessages([
          {
            message: firstWelcomeChat,
            timestamp: new Date().toString(),
            role: "therapist",
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
    setLoading(true);
    if (message.trim()) {
      const newMessage: Message = {
        message,
        timestamp: new Date().toString(),
        role: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      try {
        const responseMessage = await getAIResponse(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: responseMessage, timestamp: new Date().toString(), role: "therapist" },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getAIResponse = async (userMessage: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    return data.response;
  };

  return (
    <div className="min-h-screen flex justify-center bg-custom p-4">
      <div className="w-full max-w-2xl bg-purple-50 rounded-xl shadow-lg flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-4">
          {[...messages].reverse().map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "user" ? (
                <div className="flex items-start space-x-3">
                  <div className="bg-cyan-500 text-white p-3 rounded-lg shadow-md max-w-xs text-md">
                    {msg.message}
                  </div>
                  <Image
                    src={AvatarTwo}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <Image
                    src={AvatarOne}
                    alt="Bot Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                  <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md max-w-xs text-md">
                    {msg.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <footer className="bg-white p-3 shadow-md flex items-center rounded-xl">
          <input
            type="text"
            value={message}
            onChange={handleMessageInput}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`${
              loading ? "bg-gray-500" : "bg-cyan-500 hover:bg-cyan-700"
            } text-white px-4 py-2 rounded-lg`}
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;


const mock = [
  {
    message: "dfs",
    role: "user",
    timestamp: "Mon Oct 28 2024 15:25:11 GMT-0600 (Mountain Daylight Time)"
  },
  {
    message: "I'm sorry to hear that you're feeling overwhelmed. It's important to remember that it's okay to feel this way sometimes. Would you like to talk more about what's been on your mind and causing you to feel overwhelmed? Remember, you're not alone, and I'm here to listen and offer support.",
    role: "therapist",
    timestamp: "Mon Oct 28 2024 15:25:12 GMT-0600 (Mountain Daylight Time)"
  },
  {
    message: "asdfasdfasfasdfasdfs",
    role: "user",
    timestamp: "Mon Oct 28 2024 15:25:11 GMT-0600 (Mountain Daylight Time)"
  },
  {
    message: "I'm sorry to hear that you're feeling overwhelmed. It's important to remember that it's okay to feel this way sometimes. Would you like to talk more about what's been on your mind and causing you to feel overwhelmed? Remember, you're not alone, and I'm here to listen and offer support.",
    role: "therapist",
    timestamp: "Mon Oct 28 2024 15:25:12 GMT-0600 (Mountain Daylight Time)"
  }
]
