"use client";
import React from "react";
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  const handleChatNavigation = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom p-8 text-center">
      <h1 className="text-5xl font-bold text-cyan-900 mb-4">Hello Daniel</h1>
      
      <h2 className="text-7xl text-cyan-900 mb-6">How are you feeling today?</h2>
      
      <p className="text-2xl text-cyan-900 max-w-md mb-8">
        Whether you're in need of calm, a compassionate listener, or a safe place to reflect, Ami is here to listen.
      </p>

      <button
        type="button"
        onClick={handleChatNavigation}
        className="bg-customLime hover:bg-customLimeHover font-bold py-3 px-8 rounded-3xl"
      >
        Let’s Chat
      </button>
    </div>
  );
}