import React from 'react';

type HorizontalContainerProps = {
	children: React.ReactNode;
	className?: string;
	align?: 'start' | 'center' | 'end'; // optional alignment
	gap?: string; // tailwind gap utility, like 'gap-4'
};

const HorizontalContainer: React.FC<HorizontalContainerProps> = ({
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
		<div className={`flex flex-row ${alignmentMap[align]} ${gap} ${className}`}>
			{children}
		</div>
	);
};

export default HorizontalContainer;
