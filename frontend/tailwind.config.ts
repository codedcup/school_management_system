import type { Config } from "tailwindcss";
import mtConfig from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],

  plugins: [mtConfig],
};

export default config;
