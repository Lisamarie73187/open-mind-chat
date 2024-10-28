import React from "react";
import Image from 'next/image';
import AvatarOne from '../assets/avatarOne.png';
import AvatarTwo from '../assets/avatarTwo.png';

const MainPage: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center h-[80vh] bg-gray-100 w-full mx-auto shadow-xl">
      <header className="bg-slate-900 text-white text-center p-4 shadow-xl">
        <h1 className="text-2xl font-bold">Open Mind Chat</h1>
        <p className="text-sm">A space for mindful conversations</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start space-x-3">
        <Image
            src={AvatarOne}
            alt="Bot Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
        />
          <div className="bg-gray-200 text-gray-800 p-3 rounded-lg shadow-md max-w-xl">
            Hello! Welcome to OpenMind Chat. How are you feeling today?
          </div>
        </div>
        
        <div className="flex items-start justify-end space-x-3">
          <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xl">
            I'm feeling good, thank you! How about you?
          </div>
          <Image
            src={AvatarTwo}
            alt="Bot Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
        />
        </div>
      </main>
      <footer className="bg-white p-4 shadow-md flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </footer>
    </div>
  );
};

export default MainPage;
