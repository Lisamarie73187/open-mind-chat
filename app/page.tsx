'use client';

import React from 'react';
import Login from './components/Login';
import { useUser } from './context/userContext';
import Home from './components/Home';

const Main: React.FC = () => {
  const user = useUser();

  return <div className="flex-grow">{user.user ? <Home/> : <Login />}</div>;
};

export default Main;
