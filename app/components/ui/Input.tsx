import React from 'react';

type InputProps = {
	name: string;
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
};

const Input: React.FC<InputProps> = ({
	name,
	type = 'text',
	placeholder = '',
	value,
	onChange,
	required = false,
	className = '',
}) => {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			required={required}
			className={`
        border border-gray-300 p-3 rounded-lg w-full 
        focus:outline-none focus:border-cyan-500 ${className}
      `}
		/>
	);
};

export default Input;
