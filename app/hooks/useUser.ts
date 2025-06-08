import { useState, useCallback } from 'react';

export type User = {
	uid: string;
	name: string;
	email: string;
	newUser?: boolean;
};

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = useCallback(async (uid: string): Promise<User | null> => {
		try {
			const response = await fetch(`/api/users?uid=${uid}`);
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
				return data.user;
			} else {
				console.warn('Fetch failed with status:', response.status);
				return null;
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			return null;
		}
	}, []);

	const createUser = useCallback(async (newUser: User) => {
		try {
			await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});
			setUser({ ...newUser, newUser: true });
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}, []);

	return {
		user,
		setUser,
		fetchUser,
		createUser,
	};
};
