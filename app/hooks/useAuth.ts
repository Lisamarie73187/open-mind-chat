// hooks/useAuth.ts
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import { auth } from '../../config/firebase';
import { useUser } from '../context/userContext';
import { User } from '../api/users/route';

type FormData = {
	name: string;
	email: string;
	password: string;
};

export const useAuth = () => {
	const router = useRouter();
	const { setUser } = useUser();

	const addUserToDB = useCallback(
		async (user: User) => {
			try {
				fetch('/api/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(user),
				});
				setUser({ ...user, newUser: true });
			} catch (error) {
				console.error('Error adding user:', error);
			}
		},
		[setUser],
	);

	const signUp = useCallback(
		async (formData: FormData) => {
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
		},
		[addUserToDB, router],
	);

	const signIn = useCallback(
		async (formData: FormData) => {
			const { email, password } = formData;
			try {
				await signInWithEmailAndPassword(auth, email, password);
				router.push('/');
			} catch (error) {
				console.error('Error logging in:', error);
			}
		},
		[router],
	);

	return { signUp, signIn };
};
