'use client';

import './globals.css';
import { Open_Sans } from 'next/font/google';
import { UserProvider } from './context/userContext';

const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['300', '800'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen antialiased bg-custom flex flex-col">
				{/* Header */}
				<div className="p-2 self-start w-full flex justify-between items-center">
					<div>
						<div
							className={`${openSans.className} font-bold text-[20px] px-2 text-cyan-900`}
						>
							+ Open Mind Chat
						</div>
						<div className="italic text-[16px] px-2 text-cyan-900">
							A Space for Mindful Conversations
						</div>
					</div>
				</div>
				<UserProvider>{children}</UserProvider>
				<div className="flex justify-center text-cyan-900 text-xs pb-2">
					Lisa Marie Herzberg ©2024
				</div>
			</body>
		</html>
	);
}
