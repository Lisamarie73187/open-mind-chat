'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';

const RedirectToLogin = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/login');
	}, [router]);

	return <Loading/>;
};

export default RedirectToLogin;
