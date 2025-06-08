'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from './hooks/useAuth';
import RedirectToLogin from './components/RedirectToLogin';
import { User, useUser } from './hooks/useUser';
import Welcome from './components/Welcome';
import Logout from './components/Logout';
import { PageLayout } from './components/ui';

const Main: React.FC = () => {
	const { currentUser, loading } = useAuth();
	const { user, fetchUser } = useUser();
	// const [user, setUser] = useState<User | null>()

	useEffect(() => {
		const getUser = (async () => {
			if (currentUser) {
				await fetchUser(currentUser.uid);
			}
		})
		getUser();
	}, [currentUser, fetchUser])

	console.log({user})

	if (loading) return <div>Loading...</div>;
	if (!currentUser) return <RedirectToLogin />;

	return (
		<PageLayout>
			<Logout/>
			{user &&
				<Welcome user={user} />
			}
		</PageLayout>
	);
};

export default Main;
