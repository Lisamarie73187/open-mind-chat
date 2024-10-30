"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login: React.FC = () => {
  const [name, setName] = useState<string>(""); // New state for name
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });
      router.push("/welcome");
    } catch (error) {
      alert("Signup error: " + error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      router.push("/welcome");
    } catch (error) {
      alert("Login error: " + error);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Open Mind Chat</title>
      </Head>
      <div className="flex items-center justify-center pt-200">
        <form
          onSubmit={isSigningUp ? handleSignUp : handleLogin}
          className="bg-purple-50 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">
            {isSigningUp ? "Sign Up" : "Login"} to Open Mind Chat
          </h2>
          {isSigningUp && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:border-cyan-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {isSigningUp ? "Sign Up" : "Log In"}
          </button>
          <p className="text-center mt-4">
            {isSigningUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="text-cyan-700 font-semibold underline"
            >
              {isSigningUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
