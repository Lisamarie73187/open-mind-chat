import React from 'react';
import Image from 'next/image';
import AvatarOne from '../../assets/avatarOne.png';

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start items-center space-x-2 mt-2">
    <Image
      src={AvatarOne}
      alt={'AvatarOne'}
      width={40}
      height={40}
      className="rounded-full border border-gray-300"
    />
    <div className="typing-indicator flex space-x-1">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  </div>
);

export default TypingIndicator;
