const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        navy: "#121c42",
        "muted-navy": "#2f3136",
        violet: "736efe",
        "violet-700": "#5c58cb",
        "violet-600": "#736efe",
        "violet-500": "#817dfe",
        "violet-400": "#8f8bfe",
        "violet-300": "#a7a4fe",
        "violet-muted": "#7388d9",
        cyan: "#1ccebb",
        "cyan-700": "#16a596",
        "cyan-600": "#1ccebb",
        "cyan-500": "#33d3c2",
        "cyan-400": "#60ddcf",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    } /* 
    fontSize: {"text-icon": "2px"}, */,
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
