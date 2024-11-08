/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				netflix: ["Netflix Sans'", 'sans-serif'],
			},
			colors: {
				'hover-bg': 'rgba(20, 20, 20, 0.7)',
			},
			screens: {
				375: '320px',
				400: '400px',
			},
		},
	},
	plugins: [],
};
