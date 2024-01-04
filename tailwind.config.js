const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'src/**/*.{ts,tsx}',
		'app/**/*.{ts,tsx}',
		'components/**/*.{ts,tsx}',
		'pages/**/*.{ts,tsx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans]
			}
		}
	},

	plugins: [require('daisyui', '@tailwindcss/typography')],
};
