"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "../api/users/route";
import { useUser } from "../context/userContext";

const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const user = useUser();
  const router = useRouter();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        await addUser({
          name,
          email,
          loginTime: new Date().toISOString(),
          uid: newUser.uid,
        });
        await updateProfile(newUser, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/welcome");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const addUser = async (user: User) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("User added:", data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Open Mind Chat</title>
      </Head>
      <div className="flex items-center justify-center pt-200">
        {user.user ? (
          <div className="bg-purple-50 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">
              You are already logged in
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-customLime hover:bg-customLimeHover text-white font-semibold p-3 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleAuthAction}
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
        )}
      </div>
    </>
  );
};

export default Login;
