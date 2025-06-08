import React from 'react';

type PageLayoutProps = {
	children: React.ReactNode;
	className?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({
	children,
	className = '',
}) => {
	return (
		<main
			className={`flex items-center justify-center min-h-screen ${className}`}
		>
			<div className="flex justify-center w-full">{children}</div>
		</main>
	);
};

export default PageLayout;
