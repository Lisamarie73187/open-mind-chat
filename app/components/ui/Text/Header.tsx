import React from 'react';

type HeaderProps = {
	text: string;
	className?: string;
};

const Header: React.FC<HeaderProps> = ({ text, className = '' }) => {
	return (
		<h2 className={`text-2xl font-bold text-cyan-900 text-center ${className}`}>
			{text}
		</h2>
	);
};

export default Header;
