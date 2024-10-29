import fs from "fs";
import { COLORS } from "./constants.js";

export const colorLog = (color, input) => {
  if (!color) throw new Error("color is required for color log");
  console.log(COLORS.Reset, color, input, COLORS.Reset);
};

export const displayTitle = () => {
  const data = fs.readFileSync("./assets/title.txt").toString();
  console.log(COLORS.FgBlue, data, COLORS.Reset);
};
export const displayIcon = () => {
  const data = fs.readFileSync("./assets/eye.txt").toString();
  console.log(COLORS.FgGreen, data, COLORS.Reset);
};
