// app/components/Login.tsx
"use client"; // Add this directive at the top

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for useRouter
import Head from 'next/head';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'a' && password === 'b') {
      router.push('/chat');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <>
      <Head>
        <title>Login - Open Mind Chat</title>
      </Head>
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Open Mind Chat</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-6 w-full"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-700 text-white p-3 rounded-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
