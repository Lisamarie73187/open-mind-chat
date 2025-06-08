import React from 'react';

type LinkButtonProps = {
	text: string;
	onClick: () => void;
	className?: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({
	text,
	onClick,
	className = '',
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-cyan-700 underline font-semibold hover:text-cyan-800 transition-colors ${className}`}
		>
			{text}
		</button>
	);
};

export default LinkButton;
