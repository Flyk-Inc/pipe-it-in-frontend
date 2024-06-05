/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				'light-bg': 'var(--light-bg)',
				'dark-bg': 'var(--dark-bg)',
				'light-card-bg': 'var(--light-card-bg)',
				'dark-card-bg': 'var(--dark-card-bg)',
				'grey-bg': 'var(--grey-bg)',
				'grey-bg-dark': 'var(--grey-bg-dark)',
				'grey-1': 'var(--grey-1)',
				'grey-2': 'var(--grey-2)',
				'grey-3': 'var(--grey-3)',
				'text-main-color': 'var(--text-main-color)',
				'text-main-dark-color': 'var(--text-main-dark-color)',
			},
		},
	},
	plugins: [],
};
