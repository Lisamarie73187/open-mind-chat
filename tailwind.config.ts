import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				customLimeHover: '#bdd87d',
				customLime: '#c9ea7a',
			},
			padding: {
				'20': '5.5rem',
				'200': '200px',
			},
		},
	},
	plugins: [],
};
export default config;
