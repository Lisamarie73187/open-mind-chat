'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Merriweather } from 'next/font/google';
import { useUser } from '../context/userContext';
import Logout from './Logout';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Welcome() {
  const router = useRouter();
  const user = useUser();

  const handleChatNavigation = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col flex-grow items-center pt-20 p-8 text-center">
      <Logout />
      <>
          <h1 className="text-5xl text-cyan-900 mb-4">Welcome {user.user?.name}</h1>
          <h2
            className={`${merriweather.className} text-7xl leading-tight max-w-xl text-cyan-900 mb-8`}
          >
            How are you feeling today?
          </h2>
          <p className="text-2xl text-cyan-900 max-w-2xl mb-20">
            Whether you're seeking a moment of peace, a compassionate listener,
            or a safe space to express your thoughts,
            <span className="font-bold"> Ami</span> is here to listen and offer
            support.
          </p>
          <button
            type="button"
            onClick={handleChatNavigation}
            className="bg-customLime hover:bg-customLimeHover font-bold py-3 px-8 rounded-3xl"
          >
            Let’s Chat
          </button>
        </>
    </div>
  );
}
