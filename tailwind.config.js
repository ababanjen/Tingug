/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        geobg: "/bg.png",
      },
      colors: {
        coffee: "#A49393",
        main: "#900020",
        "footer-dark": "#444444",
        light: "#F3F2F2",
        ["faded-gray"]: "#D9D9D9",
        ["faded-gray-500"]: "#E4E5E8",
      },
    },
  },
  plugins: [],
};
