import React from 'react';

type BoxContainerProps = {
	children: React.ReactNode;
	className?: string;
};

const BoxContainer: React.FC<BoxContainerProps> = ({
	children,
	className = '',
}) => {
	return (
		<div
			className={`bg-purple-50 p-8 rounded-lg shadow-lg w-full max-w-md grid gap-3 ${className}`}
		>
			{children}
		</div>
	);
};

export default BoxContainer;
