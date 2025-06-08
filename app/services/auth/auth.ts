// services/authService.ts
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import { auth } from '../../../config/firebase';
import { User } from './types';

export const addUserToDatabase = async (user: User): Promise<void> => {
	try {
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		if (!res.ok) {
			throw new Error(`Failed to add user: ${res.statusText}`);
		}
	} catch (error) {
		console.error('Error adding user to DB:', error);
		throw error;
	}
};

export const signUpUser = async (
	name: string,
	email: string,
	password: string,
): Promise<User> => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	const firebaseUser = userCredential.user;

	await updateProfile(firebaseUser, { displayName: name });

	const user: User = {
		name,
		email,
		loginTime: new Date().toISOString(),
		uid: firebaseUser.uid,
	};

	await addUserToDatabase(user);
	return user;
};

export const signInUser = async (
	email: string,
	password: string,
): Promise<void> => {
	await signInWithEmailAndPassword(auth, email, password);
};
