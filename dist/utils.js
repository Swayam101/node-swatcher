"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayIcon = exports.displayTitle = exports.colorLog = void 0;
const fs_1 = __importDefault(require("fs"));
const constants_js_1 = require("./constants.js");
const path_1 = __importDefault(require("path"));
const colorLog = (color, input) => {
    if (!color)
        throw new Error("color is required for color log");
    console.log(constants_js_1.COLORS.Reset, constants_js_1.COLORS[color], input, constants_js_1.COLORS.Reset);
};
exports.colorLog = colorLog;
const displayTitle = () => {
    const data = fs_1.default
        .readFileSync(path_1.default.join(__dirname, "..", "assets", "title.txt"))
        .toString();
    console.log(constants_js_1.COLORS.FgBlue, data, constants_js_1.COLORS.Reset);
};
exports.displayTitle = displayTitle;
const displayIcon = () => {
    console.log("logging dirname  : ", __dirname);
    const data = fs_1.default
        .readFileSync(path_1.default.join(__dirname, "..", "assets", "eye.txt"))
        .toString();
    console.log(constants_js_1.COLORS.FgGreen, data, constants_js_1.COLORS.Reset);
};
exports.displayIcon = displayIcon;
