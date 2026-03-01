/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#4CAF50",
				secondary: "#666666",
				danger: "#F44336",
				gray: {
					100: "#F5F5F5",
					200: "#EEEEEE",
					300: "#E0E0E0",
					400: "#BDBDBD",
					500: "#9E9E9E",
					600: "#757575",
					700: "#616161",
					800: "#424242",
					900: "#212121",
				},
			},
			boxShadow: {
				card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				"card-hover":
					"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
			},
		},
	},
	plugins: [],
};
