import React from 'react';

type VerticalContainerProps = {
	children: React.ReactNode;
	className?: string;
	align?: 'start' | 'center' | 'end'; // horizontal alignment
	gap?: string; // e.g. 'gap-4'
};

const VerticalContainer: React.FC<VerticalContainerProps> = ({
	children,
	className = '',
	align = 'center',
	gap = 'gap-1',
}) => {
	const alignmentMap = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
	};

	return (
		<div className={`flex flex-col ${alignmentMap[align]} ${gap} ${className}`}>
			{children}
		</div>
	);
};

export default VerticalContainer;
