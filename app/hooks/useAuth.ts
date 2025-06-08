// hooks/useAuth.ts
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut as firebaseSignOut,
	User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../../config/firebase';
import { useUser } from '../hooks/useUser';

type FormData = {
	name: string;
	email: string;
	password: string;
};

export const useAuth = () => {
	const router = useRouter();
	const { createUser, fetchUser } = useUser();

	const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, [fetchUser]);

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
				await createUser({
					name,
					email,
					uid: newUser.uid,
				});
				router.push('/');
			} catch (error) {
				console.error('Error signing up:', error);
			}
		},
		[createUser, router],
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

	const signOut = useCallback(async () => {
		try {
			await firebaseSignOut(auth);
			setCurrentUser(null);
			router.push('/login');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}, [router]);

	return { signUp, signIn, signOut, currentUser, loading };
};
