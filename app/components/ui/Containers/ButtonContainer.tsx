import React from 'react';

type ButtonContainerProps = {
	children: React.ReactNode;
	className?: string;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({
	children,
	className = '',
}) => {
	return (
		<div className={`flex justify-end gap-2 ${className}`}>{children}</div>
	);
};

export default ButtonContainer;
