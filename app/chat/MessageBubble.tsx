import React from 'react';
import Image from 'next/image';
import AvatarOne from '../../assets/avatarOne.png';
import AvatarTwo from '../../assets/avatarTwo.png';

interface MessageObj {
  role: string;
  message: string;
}

interface MessageBubbleProps {
  message: MessageObj;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => (
  <div
    className={`flex ${
      message.role === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    {message.role === 'user' ? (
      <div className="flex items-start space-x-3">
        <div className="bg-cyan-500 text-white p-3 rounded-lg shadow-md max-w-lg text-md">
          {message.message}
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
        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md text-md w-3/4">
          {message.message}
        </div>
      </div>
    )}
  </div>
);

export default MessageBubble;
