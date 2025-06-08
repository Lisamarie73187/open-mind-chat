import React from 'react';

type BodyTextProps = {
	text: string;
	className?: string;
};

const BodyText: React.FC<BodyTextProps> = ({ text, className = '' }) => {
	return <p className={`text-sm text-gray-700 ${className}`}>{text}</p>;
};

export default BodyText;
