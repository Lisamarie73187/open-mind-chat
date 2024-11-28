'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { auth } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { User } from '../api/users/route';
import { useUser } from '../context/userContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addUserToDB = useCallback(
    async (user: User) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        setUser({ ...user, newUser: true });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    [setUser],
  );

  const signUp = useCallback(async () => {
    const { email, password, name } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName: name });
      await addUserToDB({
        name,
        email,
        loginTime: new Date().toISOString(),
        uid: newUser.uid,
      });

      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }, [formData, addUserToDB, router]);

  const signIn = useCallback(async () => {
    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User signed in:', userCredential.user);
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }, [formData, router]);

  const handleAuthAction = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (isSigningUp) {
          await signUp();
        } else {
          await signIn();
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    [isSigningUp, formData, signUp, signIn],
  );

  const authButtonText = useMemo(
    () => (isSigningUp ? 'Sign Up' : 'Log In'),
    [isSigningUp],
  );
  const switchText = useMemo(
    () => (isSigningUp ? 'Already have an account?' : 'Don’t have an account?'),
    [isSigningUp],
  );
  const toggleAuthModeText = useMemo(
    () => (isSigningUp ? 'Log in' : 'Sign up'),
    [isSigningUp],
  );

  return (
    <>
      <Head>
        <title>Login - Open Mind Chat</title>
      </Head>
      <div className="flex items-center justify-center pt-200">
        <form
          onSubmit={handleAuthAction}
          className="bg-purple-50 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">
            {authButtonText} to Open Mind Chat
          </h2>
          {isSigningUp && (
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:border-cyan-500"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:border-cyan-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg mb-6 w-full focus:outline-none focus:border-cyan-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-customLime hover:bg-customLimeHover font-semibold p-3 rounded-lg transition-colors duration-300"
          >
            {authButtonText}
          </button>
          <p className="text-center mt-4">
            {switchText}{' '}
            <button
              type="button"
              onClick={() => setIsSigningUp((prev) => !prev)}
              className="text-cyan-700 font-semibold underline"
            >
              {toggleAuthModeText}
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
