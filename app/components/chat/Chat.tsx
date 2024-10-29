"use client";
import React, { useState} from "react";
import Image from "next/image";
import AvatarOne from "../../assets/avatarOne.png";
import AvatarTwo from "../../assets/avatarTwo.png";

interface Message {
  message: string;
  timestamp: string;
  role: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
  
    const data = await response.json();
    return data.response;
  };

  return (
    <div className="flex flex-col justify-center h-[80vh] bg-gray-100 w-full mx-auto shadow-xl rounded-lg overflow-hidden ">
      <header className="bg-cyan-600 text-white text-center p-4">
        <h1 className="text-2xl font-bold">Open Mind Chat</h1>
        <p className="text-sm">A space for mindful conversations</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
       {[...mock].reverse().map((msg, index) => (
          <div key={index}>
            {msg.role === "user" ? (
              <div className="flex items-start justify-end space-x-3 space-y-1 w-full my-4">
                <div className="bg-cyan-500 text-white p-3 rounded-lg shadow-md max-w-xl">
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
              <div className="flex items-start space-x-3 space-y-0">
                <Image
                  src={AvatarOne}
                  alt="Bot Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg shadow-md max-w-xl">
                  {msg.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      <footer className="bg-white p-4 shadow-md flex items-center">
        <input
          type="text"
          value={message}
          onChange={handleMessageInput}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`${loading ? 'bg-gray-500 hover:bg-gray-500' : 'bg-cyan-500 hover:bg-cyan-700'} text-white px-4 py-2 rounded-lg`}
        >
          Send
        </button>
      </footer>
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
