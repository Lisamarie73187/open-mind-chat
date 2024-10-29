"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "a" && password === "b") {
      router.push("/welcome");
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <>
      <Head>
        <title>Login - Open Mind Chat</title>
      </Head>
      
      <div className="flex items-center justify-center pt-200">
        <form
          onSubmit={handleLogin}
          className="bg-purple-50 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">
            Login to Open Mind Chat
          </h2>
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:border-cyan-500"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-6 w-full focus:outline-none focus:border-cyan-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-customLime hover:bg-customLimeHover text-white font-semibold p-3 rounded-lg transition-colors duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
