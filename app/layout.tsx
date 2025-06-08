'use client';

import './globals.css';
// import { UserProvider } from './context/userContext';
import Footer from './components/Footer';
import HeaderBanner from './components/HeaderBanner';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen antialiased bg-custom flex flex-col">
				<HeaderBanner />
				{children}
				{/* <UserProvider>{children}</UserProvider> */}
				<Footer />
			</body>
		</html>
	);
}
