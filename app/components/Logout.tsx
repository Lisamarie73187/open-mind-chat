import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui';

const Logout: React.FC = () => {
	const router = useRouter();
	const { signOut } = useAuth();

	const handleLogout = useCallback(async () => {
		try {
			await signOut();
			router.push('/');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}, [router, signOut]);

	return (
		<Button
			onClick={handleLogout}
			text='Logout'
			className="absolute top-4 w-32 right-4 px-4 py-2 text-sm bg-customLime hover:bg-customLimeHover rounded"
		/>

	);
};

export default Logout;
