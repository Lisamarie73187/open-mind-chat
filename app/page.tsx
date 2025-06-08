'use client';

import React from 'react';
import Login from './components/Login';
import { useUser } from './context/userContext';
import Home from './pages/Home/Home';
import Loading from './components/Loading';

const Main: React.FC = () => {
	const user = useUser();

	if (user.loading) {
		return <Loading />;
	} else {
		return <div className="flex-grow">{user.user ? <Home /> : <Login />}</div>;
	}
};

export default Main;
