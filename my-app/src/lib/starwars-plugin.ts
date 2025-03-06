import plugin from "tailwindcss/plugin";

export const starWarsPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        // Core theme colors that switch in dark mode
        "--theme-primary": "195 100% 50%", // Jedi blue in light
        "--theme-accent": "37 39% 70%", // Tatooine sand

        // Fixed colors that don't change
        "--lightSaber-blue": "195 100% 50%",
        "--lightSaber-red": "0 100% 50%",
        "--rebel-alliance": "199 100% 39%",
        "--galactic-empire": "0 0% 20%",
        "--force-energy": "222 100% 70%",
        "--desert-sand": "43 77% 76%",
      },
      ".dark": {
        "--theme-primary": "0 100% 50%", // Sith red in dark
        "--theme-accent": "37 39% 40%", // Darker sand
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          "theme-primary": "hsl(var(--theme-primary))",
          "theme-accent": "hsl(var(--theme-accent))",
          lightSaber: {
            blue: "hsl(var(--lightSaber-blue))",
            red: "hsl(var(--lightSaber-red))",
          },
          alliance: "hsl(var(--rebel-alliance))",
          empire: "hsl(var(--galactic-empire))",
          force: "hsl(var(--force-energy))",
          sand: "hsl(var(--desert-sand))",
        },
      },
    },
  }
);
