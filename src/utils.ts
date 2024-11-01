import fs from "fs";
import { COLORS } from "./constants.js";
import path from "path";

export const colorLog = (color: keyof typeof COLORS, input: string) => {
  if (!color) throw new Error("color is required for color log");
  console.log(COLORS.Reset, COLORS[color], input, COLORS.Reset);
};

export const displayTitle = () => {
  const data = fs
    .readFileSync(path.join(__dirname, "..", "assets", "title.txt"))
    .toString();
  console.log(COLORS.FgBlue, data, COLORS.Reset);
};
export const displayIcon = () => {
  console.log("logging dirname  : ", __dirname);

  const data = fs
    .readFileSync(path.join(__dirname, "..", "assets", "eye.txt"))
    .toString();
  console.log(COLORS.FgGreen, data, COLORS.Reset);
};
