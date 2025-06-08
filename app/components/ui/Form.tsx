import React from 'react';

type FormContainerProps = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
	className?: string;
};

const Form: React.FC<FormContainerProps> = ({
	onSubmit,
	children,
	className = '',
}) => {
	return (
		<form onSubmit={onSubmit} className={`grid gap-4 w-full ${className}`}>
			{children}
		</form>
	);
};

export default Form;
