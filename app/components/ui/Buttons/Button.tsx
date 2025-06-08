import React from 'react';

type ButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
	text,
	type = 'button',
	onClick,
	className = '',
	disabled = false,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
        w-full bg-customLime hover:bg-customLimeHover font-semibold p-3 rounded-lg 
        transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
		>
			{text}
		</button>
	);
};

export default Button;
